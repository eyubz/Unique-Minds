import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const courses = [
  { id: 1, title: "Introduction to AI", progress: 75 },
  { id: 2, title: "Web Development Bootcamp", progress: 50 },
  { id: 3, title: "Data Science Fundamentals", progress: 20 },
];

const ProgressBarChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={courses}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="title" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="progress" fill="rgb(20, 74, 102)" />
      </BarChart>
    </ResponsiveContainer>
  );
};

const ProgressSection = () => {
  return (
    <div className="w-full p-6">
      <h2 className="text-2xl font-bold mb-6">Course Progress</h2>
      <ProgressBarChart />
    </div>
  );
};

export default ProgressSection;
