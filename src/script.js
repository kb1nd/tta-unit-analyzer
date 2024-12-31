let units;

// General functions

function launchPopup(type, data) {
  document.querySelector("body").style.overflow = "hidden";
  document.querySelector("#background-blur").style.zIndex = 9;
  switch (type) {
    case "dps-calculation":
      break;
  }
}

function buffDps(true_cd, buff_cd, buff_dmg) {
  let buff_dps;
  switch (true) {
    case true_cd > buff_cd:
      buff_dps = buff_dmg / true_cd;
      break;
    case true_cd < buff_cd:
      while (i < buff_cd) i += true_cd;
      buff_dps = buff_dmg / i;
      break;
    case true_cd === buff_cd:
      buff_dps = buff_dmg / buff_cd;
      break;
  }
  return buff_dps;
}

// Unit-Specific Functions

function byakurenDps(true_dmg, true_cd, hit_amount, enemy_traits) {}

function yumekoDps(true_dmg, true_cd, hit_amount, enemy_traits) {}

function ranDps() {}

function nitoriDps(true_dmg, true_cd, hit_amount, tank) {
  switch (true) {
    case tank.includes(true):
      {
      }
      break;
    default:
      {
      }
      break;
  }
}

function rinDps() {}

function flandreDps(true_dmg, true_cd, hit_amount, enemy_traits) {
  let tank = null;
  let shield = null;
  let guard = null;
  switch (true) {
    case enemy_traits.find((trait) => trait.type === "tank").value:
      tank = enemy_traits.find((trait) => trait.type === "tank").value;
      break;
    case enemy_traits.find((trait) => trait.type === "shield").value:
      shield = enemy_traits.find((trait) => trait.type === "shield").value;
      break;
    case enemy_traits.find((trait) => trait.type === "guard").value:
      guard = enemy_traits.find((trait) => trait.type === "guard").value;
      break;
  }
}

function shouDps(true_dmg, true_cd, base_dmg, base_cd, attacks) {
  return (
    (attacks * (true_dmg / true_cd) +
      (base_dmg * 1.4 + true_dmg) / true_cd +
      true_dmg / (base_cd * 0.4 + true_cd)) /
    (attacks + 2)
  );
}

// Debuff calculation functions

function shockDps(true_dmg, true_cd) {
  let buff_dmg = true_dmg * 0.1;
  let buff_cd = 6.5;
  return buffDps(true_cd, buff_cd, buff_dmg);
}

function burnDps(true_dmg, true_cd) {
  let buff_dmg = true_dmg * 0.1;
  return buff_dmg / true_cd;
}

function bleedDps(enemy_health, true_cd, buff_type, enemy_type) {
  let buff_dmg;
  let buff_cd = 6;
  switch (buff_type) {
    case "strong":
      buff_dmg = enemy_health * 0.0666;
      break;
    case "buffedStrong":
      buff_dmg = enemy_health * 0.08;
      break;
    case "buffed":
      buff_dmg = enemy_health * 0.04;
      break;
    case "normal":
      buff_dmg = enemy_health * 0.0333;
      break;
  }
  switch (true) {
    case enemy_type === "boss":
      buff_dmg *= 0.5;
      break;
    case (buff_type === "strong" || "buffedStrong") &&
      buff_dmg >= 225 + enemy_health * 0.015:
      buff_dmg = 225 + enemy_health * 0.015;
      break;
    case buff_type === "normal" && buff_dmg >= 225 + enemy_health * 0.0075:
      buff_dmg = 225 + enemy_health * 0.0075;
      break;
  }
  return buffDps(true_cd, buff_cd, buff_dmg);
}

// Page script

window.onpointermove = (event) => {
  const { clientX, clientY } = event;
  document.getElementById("blob").animate(
    {
      left: `calc(${clientX}px - 15%)`,
      top: `calc(${clientY}px - 15%)`,
    },
    { duration: 3000, fill: "forwards" },
  );
};

document
  .querySelector(".dps-calculator")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    switch (true) {
      case (waves.value &&
        health.value &&
        maxhealth.value &&
        basedamage.value &&
        basecooldown.value &&
        hits.value) !== null && basecooldown.value < 100:
        alert("hi");
        break;
    }
    if (new URLSearchParams(window.location.search).get("unit"))
      launchPopup("dps-calculation", {
        unit: new URLSearchParams(window.location.search).get("unit"),
        //"buffs": buffs,
        //"debuffs": debuffs,
        //"enemy_traits": traits,
        element: element.value,
        enemy_type: enemytype.value,
        stage_time: stagetime.value,
        talent: talent.value,
        waves: waves.value,
        health: health.value,
        max_health: maxhealth.value,
        base_dmg: basedamage.value,
        base_cd: basecooldown.value,
        hit_amount: hits.value,
      });
  });

window.onload = () => {
  let unit = new URLSearchParams(window.location.search).get("unit");
  document.querySelector("#unit").value = unit;
  if (unit.includes("null"))
    window.location = window.location.href.replace(
      `?unit=${unit}`,
      "?unit=Flandre",
    );
};

function addBuff() {
  launchPopup(1, 1);
  alert("hi");
}
function addDebuff() {
  alert("hi");
}
