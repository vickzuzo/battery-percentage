const batteryLiquid = document.querySelector(".battery_liquid");
const batteryStatus = document.querySelector(".battery_status");
const batteryPercentage = document.querySelector(".battery_percent");

console.log("running");

function initBattery() {
  navigator.getBattery().then((battery) => {
    console.log("b", battery);
    updateBattery = () => {
      let level = Math.floor(battery.level * 100);
      batteryPercentage.innerHTML = level + "%";
      batteryLiquid.style.height = `${parseInt(battery.level * 100)}%`;
      if (level == 100) {
        /* We validate if the battery is full */
        batteryStatus.innerHTML = `Full battery <i class="ri-battery-2-fill green-color"></i>`;
        batteryLiquid.style.height = "103%"; /* To hide the ellipse */
      } else if ((level <= 20) & !battery.charging) {
        /* We validate if the battery is low */
        batteryStatus.innerHTML = `Low battery <i class="ri-plug-line animated-red"></i>`;
      } else if (battery.charging) {
        /* We validate if the battery is charging */
        batteryStatus.innerHTML = `Charging... <i class="ri-flashlight-line animated-green"></i>`;
      } else {
        /* If it's not loading, don't show anything. */
        batteryStatus.innerHTML = "";
      }
      if (level <= 20) {
        batteryLiquid.classList.add("gradient-red");
        batteryLiquid.classList.remove(
          "gradient-orange",
          "gradient-yellow",
          "gradient-green"
        );
      } else if (level <= 40) {
        batteryLiquid.classList.add("gradient-orange");
        batteryLiquid.classList.remove(
          "gradient-red",
          "gradient-yellow",
          "gradient-green"
        );
      } else if (level <= 80) {
        batteryLiquid.classList.add("gradient-yellow");
        batteryLiquid.classList.remove(
          "gradient-red",
          "gradient-orange",
          "gradient-green"
        );
      } else {
        batteryLiquid.classList.add("gradient-green");
        batteryLiquid.classList.remove(
          "gradient-red",
          "gradient-orange",
          "gradient-yellow"
        );
      }
    };
    updateBattery();
    battery.addEventListener("chargingchange", () => {
      updateBattery();
    });
    battery.addEventListener("levelchange", () => {
      updateBattery();
    });
  });
}

initBattery();
