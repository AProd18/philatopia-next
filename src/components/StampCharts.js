"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function StampCharts({ byYear, byCountry }) {
  return (
    <div className="w-full sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[50%] flex flex-col gap-6 mb-5">
      {/* Chart by Year */}
      <div className="bg-card text-text shadow-md p-4 rounded-md">
        <h2 className="text-lg font-semibold mb-2 text-left">Stamps by Year</h2>
        <ResponsiveContainer width="100%" height={230}>
          <BarChart data={byYear}>
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Chart by Country */}
      {/* <div className="bg-card text-text shadow-md p-4 rounded-md">
        <h2 className="text-lg font-semibold mb-2 text-center">
          Stamps by Country
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={byCountry}>
            <XAxis dataKey="country" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div> */}
    </div>
  );
}
