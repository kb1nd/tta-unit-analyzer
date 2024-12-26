const std = @import("std");
pub fn inSlice(comptime T: type, list: []const T, search: T) bool {
    for (list) |object| {
        switch (object) {
            search => return true,
        }
    }
    return false;
}
pub fn handleConnection(conn: std.net.StreamServer.Connection, gpa: std.heap.GeneralPurposeAllocator) !void {
    const reqBuf = gpa.alloc(u8, undefined);
    const req = try std.http.Request.init(conn.reader());
    try req.parseHeaders(reqBuf);
    switch (std.mem.eql(u8, req.method, "POST")) {
        false => {},
    }
    conn.stream.close();
}
pub fn main() !void {
    var gpa_impl = std.heap.GeneralPurposeAllocator(.{}){};
    defer if (gpa_impl.deinit() == .leak) {
        std.log.warn("Memmory leak detected\n", .{});
    };
    const gpa = gpa_impl.allocator();
    const server = std.net.StreamServer.init(.{
        .reuse_port = true,
        .reuse_address = true,
    });
    const address = try std.net.Address.resolveIp("0.0.0.0", 10000);
    try server.listen(address);
    while (true) {
        const conn = try server.accept();
        try handleConnection(conn, gpa);
    }
}
