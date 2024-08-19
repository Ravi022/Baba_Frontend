import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { styled } from "@mui/system";

// Define a styled component for custom label styling
const StyledPieChart = styled(PieChart)({
  ".MuiPieChart-label": {
    fill: "#ffffff", // Set label text color to white using fill
    fontWeight: 600, // Font weight semibold
  },
});

// const data = [
//   { id: 0, value: 120, label: "/sitemap.xml", color: "#4e79a7" }, // Soft Blue
//   { id: 1, value: 85, label: "/", color: "#f28e2b" }, // Soft Orange
//   { id: 2, value: 74, label: "/login", color: "#e15759" }, // Soft Red
//   { id: 3, value: 35, label: "/signUp", color: "#76b7b2" }, // Soft Teal
//   { id: 4, value: 40, label: "/importantTasks", color: "#59a14f" }, // Soft Green
//   { id: 5, value: 70, label: "/completedTasks", color: "#edc949" }, // Soft Yellow
//   { id: 6, value: 60, label: "/incompleteTasks", color: "#af7aa1" }, // Soft Purple
// ];

export default function PieActiveArc({ data }) {
  return (
    <StyledPieChart
      series={[
        {
          data,
          highlightScope: { faded: "global", highlighted: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
          color: data.map((item) => item.color), // Apply custom colors to each slice
          label: {
            position: "outside", // Set label position to outside the pie chart
            offset: 10, // Reduce the gap between the pie chart and the labels
          },
        },
      ]}
      height={200}
    />
  );
}
