import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

export default function PieActiveArc({ data }) {
  return (
    <PieChart
      series={[
        {
          data,
          highlightScope: { faded: "global", highlighted: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
          color: data.map((item) => item.color), // Apply custom colors to each slice
          label: {
            position: "outside", // Set label position to outside the pie chart
            offset: 10, // Reduce the gap between the pie chart and the labels
            sx: {
              color: "#ffffff", // Set label text color to white using fill
              fontWeight: 600, // Font weight semibold
            },
          },
        },
      ]}
      height={200}
    />
  );
}
