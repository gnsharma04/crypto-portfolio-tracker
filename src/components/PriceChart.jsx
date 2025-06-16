import React from "react";
import Chart from "react-apexcharts";

const PriceChart = ({ chartData }) => {
  if (!chartData)
    return <div className="plugin-card chart-card">⚠️ No chart data</div>;

  return (
    <div className="plugin-card chart-card">
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={300}
      />
    </div>
  );
};

export default PriceChart;
