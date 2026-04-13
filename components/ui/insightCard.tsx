/* eslint-disable @typescript-eslint/no-explicit-any */
export function InsightCard({ insight }: any) {
  const colors: any = {
    pattern: "bg-blue-100 text-blue-800",
    anomaly: "bg-red-100 text-red-800",
    trend: "bg-yellow-100 text-yellow-800",
    info: "bg-gray-100 text-gray-800",
  };

  return (
    <div className={`p-4 rounded-xl shadow ${colors[insight.type]}`}>
      <p className="text-sm font-medium">{insight.message}</p>
    </div>
  );
}
