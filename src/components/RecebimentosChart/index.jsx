import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function RecebimentosChart() {
  const data = [
    { mes: "Jan", valor1: 300, valor2: 500 },
    { mes: "Fev", valor1: 3800, valor2: 4200 },
    { mes: "Mar", valor1: 4000, valor2: 3800 },
    { mes: "Abr", valor1: 5200, valor2: 4600 },
    { mes: "Mai", valor1: 4600, valor2: 4000 },
    { mes: "Jun", valor1: 4300, valor2: 4100 },
  ];

  return (
    <div className="w-full h-full p-6 bg-transparent">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 20, right: 40, left: 20, bottom: 0 }}>
            
          <defs>
            <linearGradient id="gradient1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366F1" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#6366F1" stopOpacity={0} />
            </linearGradient>

          </defs>

          {/* Linhas */}
          <Line
            type="monotone"
            dataKey="valor1"
            stroke="url(#gradient1)"
            strokeWidth={3}
            dot={{ r: 5, fill: "#fff", stroke: "#6366F1", strokeWidth: 2 }}
            activeDot={{ r: 6, fill: "#6366F1", stroke: "#fff", strokeWidth: 3 }}
          />
        

          <XAxis
            dataKey="mes"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9CA3AF", fontSize: 12 }}
            padding={{ left: 10, right: 10 }} 
          />

          {/* Eixo Y */}
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9CA3AF", fontSize: 12 }}
          />

          {/* Tooltip */}
          <Tooltip
            cursor={{ strokeDasharray: "3 3", stroke: "#9CA3AF", strokeWidth: 1 }}
            contentStyle={{
              background: "transparent",
              border: "none",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              borderRadius: "0.5rem",
              padding: "6px 10px",
            }}
            labelStyle={{ display: "none" }}
            formatter={(value) => [`R$ ${value.toLocaleString("pt-BR")}`]}
          />

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
