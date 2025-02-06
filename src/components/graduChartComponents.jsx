import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import graduatedstudent from "../assets/images/graduatedstudent.png";

Chart.register(ArcElement, Tooltip, Legend);

const GraduChartComponenets = ({ earned, total }) => {
  const remaining = total - earned;

  const data = {
    labels: ["취득 학점", "남은 학점"],
    datasets: [
      {
        data: [earned, remaining],
        backgroundColor: ["#3D5286", "#E0E0E0"],
        hoverBackgroundColor: ["#3D5286", "#BDBDBD"],

        rotation: 225, 
        circumference: 270, 
        borderRadius: [50, 50, 0, 0],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "78%", 
    plugins: {
      legend: {
        display: false,
      },
    tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div style={{ width: "260px", height: "260px", position: "relative" }}>
      <Doughnut data={data} options={options} />
      <img src={graduatedstudent} alt="학생" 
       style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: "15px",
        fontWeight: "bold",
        textAlign: "center",
        }}/>
      <div
        style={{
          position: "absolute",
          top: "95%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "15px",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
          <span style={{ color: "#3D5286", fontSize: "19px" }}>{earned}</span>
          <span style={{ fontSize: "19px" }}> / {total} 학점</span>
      </div>
    </div>
  );
};

export default GraduChartComponenets;
