import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { IDataForChart } from "../../mock/dataTransformer";

interface ILineChartProps {
  active: string;
  data: {
    b2b: IDataForChart[];
    b2c: IDataForChart[];
    total: IDataForChart[];
  };
}

const LineChart = ({ data, active }: ILineChartProps) => {
  return (
    <ResponsiveLine
      data={
        active === "Итоги" ? data.total : active === "B2B" ? data.b2b : data.b2c
      }
      margin={{ top: 20, right: 60, bottom: 80, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="natural"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
      }}
      axisLeft={null}
      enableGridX={true}
      enableGridY={false}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      enableCrosshair={false}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-left",
          direction: "row",
          justify: false,

          translateY: 60,
          itemsSpacing: 22,
          itemDirection: "left-to-right",
          itemWidth: 169,
          itemHeight: 20,
          itemOpacity: 1,
          symbolSize: 32,
          symbolShape: "circle",
        },
      ]}
    />
  );
};

export default LineChart;
