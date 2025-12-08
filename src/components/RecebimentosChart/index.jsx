import React, { useEffect, useState } from "react";
import api from "../../services/api";
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
  const [data, setData] = useState([]);

  function getLast6Months() {
    const months = [];
    const date = new Date();

    for (let i = 0; i < 6; i++) {
      const month = date.toLocaleString("pt-BR", { month: "short" });
      months.push(month);
      date.setMonth(date.getMonth() - 1);
    }
    return months.reverse();
  }

  useEffect(() => {
    api.getInvoicedLast6MonthsChart().then((response) => {
      console.log("Dados do gráfico de recebimentos:", response.data);

      const months = getLast6Months();

      const keys = [
        "totalFaturado30",
        "totalFaturado60",
        "totalFaturado90",
        "totalFaturado120",
        "totalFaturado150",
        "totalFaturado180",
      ];

      const formatted = keys.map((key, index) => ({
        mes: months[index],
        valor1: response.data[key] ?? 0,
      }));
      setData(formatted);
    });
  }, []);

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
