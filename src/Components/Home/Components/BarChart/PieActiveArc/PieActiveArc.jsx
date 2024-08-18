import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { styled } from "@mui/system";

// Define a styled component for custom label styling
const StyledPieChart = styled(PieChart)({
  ".MuiPieChart-label": {
    color: "#ffffff", // Label color
    fontWeight: 600, // Font weight semibold
  },
});

const data = [
  { id: 0, value: 10, label: "series A", color: "#083344" }, // Dark Blue
  { id: 1, value: 15, label: "series B", color: "#1e1b4b" }, // Dark Orange
  { id: 2, value: 20, label: "series C", color: "#2ca02c" }, // Dark Green
];

export default function PieActiveArc() {
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
      sx={{ color: "#ffffff" }} // Set chart text color to white
    />
  );
}
