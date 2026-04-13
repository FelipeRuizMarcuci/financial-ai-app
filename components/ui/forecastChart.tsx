/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function ForecastChart({ data }: any) {
  if (!data) return null;

  const chartData = [
    { name: "Hoje", value: 0 },
    { name: "Previsão", value: data.forecast },
  ];

  return (
    <div className="h-60 bg-white p-4 rounded-xl shadow">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
