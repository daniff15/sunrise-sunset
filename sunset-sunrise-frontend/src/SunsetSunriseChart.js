import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const SunsetSunriseChart = ({ data }) => {
  if (!data) return null;

  const labels = data.map((item) => item.date);

  const convertTimeToTimestamp = (time) => {
    const [hour, minute, second] = time.split(" ")[0].split(":").map(Number);
    const amPm = time.split(" ")[1];
    const isPm = amPm === "PM" && hour !== 12;
    const isMidnight = amPm === "AM" && hour === 12;
    const adjustedHour = isMidnight ? 0 : isPm ? hour + 12 : hour;

    return adjustedHour * 3600 + minute * 60 + second;
  };

  const sunriseTimestamps = data.map((item) =>
    convertTimeToTimestamp(item.sunrise)
  );

  const sunsetTimestamps = data.map((item) =>
    convertTimeToTimestamp(item.sunset)
  );

  return (
    <Line
      data={{
        labels,
        datasets: [
          {
            label: "Sunrise Time",
            data: sunriseTimestamps,
            borderColor: "orange",
            borderWidth: 2,
            pointRadius: 5,
          },
          {
            label: "Sunset Time",
            data: sunsetTimestamps,
            borderColor: "blue",
            borderWidth: 2,
            pointRadius: 5,
          },
        ],
      }}
      options={{
        scales: {
          x: {
            type: "category",
          },
          y: {
            type: "linear",
            min: 0,
            max: 86400,
            ticks: {
              stepSize: 3600, 
              callback: (value) => {
                const hours = Math.floor(value / 3600);
                const minutes = Math.floor((value % 3600) / 60);
                const amPm = hours >= 12 ? "PM" : "AM";
                const displayHour = hours % 12 || 12;
                return `${displayHour}:${
                  minutes < 10 ? "0" : ""
                }${minutes} ${amPm}`;
              },
            },
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              title: function (tooltipItems) {
                return tooltipItems[0].label; 
              },
              label: function (tooltipItem) {
                const timestamp = tooltipItem.raw;
                const hours = Math.floor(timestamp / 3600);
                const minutes = Math.floor((timestamp % 3600) / 60);
                const amPm = hours >= 12 ? "PM" : "AM";
                const displayHour = hours % 12 || 12;
                return `${tooltipItem.dataset.label}: ${displayHour}:${
                  minutes < 10 ? "0" : ""
                }${minutes} ${amPm}`;
              },
            },
          },
        },
      }}
    />
  );
};

export default SunsetSunriseChart;
