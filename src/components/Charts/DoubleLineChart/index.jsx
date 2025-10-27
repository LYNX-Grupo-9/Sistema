import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function DoubleLineChart() {
  // Dados de exemplo
  const data = [
    { mes: "Jan", Recebido: 3000, Pendente: 500 },
    { mes: "Fev", Recebido: 4000, Pendente: 200 },
    { mes: "Mar", Recebido: 5000, Pendente: 1000 },
    { mes: "Abr", Recebido: 2000, Pendente: 4000 },
    { mes: "Mai", Recebido: 4000, Pendente: 4200 },
    { mes: "Jun", Recebido: 5000, Pendente: 2800 },
  ];

  return (
    <div className=" px-5 py-7  w-full">
      <ResponsiveContainer width="100%" height={300}>

        <LineChart data={data}>
        <Legend />

          <XAxis dataKey="mes" stroke="#6b7280" axisLine={false}
            tickLine={false}/>
          <YAxis stroke="#6b7280" axisLine={false}
            tickLine={false}/> {/* eixo Y */}
          <Tooltip />

          
          <defs>
            <linearGradient id="gradient2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#009E0D" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#009E0D" stopOpacity={0.3} />
            </linearGradient>
            <linearGradient id="gradient3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#A60003" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#A60003" stopOpacity={0.3} />
            </linearGradient>

          </defs>

          <Line
            type="monotone"
            dataKey="Recebido"
            stroke="url(#gradient2)" // azul
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />

          <Line
            type="monotone"
            dataKey="Pendente"
            stroke="url(#gradient3)"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
