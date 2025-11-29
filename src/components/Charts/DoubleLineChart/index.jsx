import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import api from "../../../services/api";

export default function DoubleLineChart() {
  const [data, setData] = useState([]);

  // Gera últimos 6 meses abreviados → ["Jun", "Jul", "Ago", "Set", "Out", "Nov"]
  const getLast6Months = () => {
    const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
                   "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

    const current = new Date().getMonth(); // 0–11
    const arr = [];

    for (let i = 5; i >= 0; i--) {
      const index = (current - i + 12) % 12;
      arr.push(meses[index]);
    }

    return arr;
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const [invoicedRes, pendingRes] = await Promise.all([
          api.getInvoicedLast6MonthsChart(),
          api.getPendingLast6MonthsChart(),
        ]);

        const invoiced = invoicedRes.data;  
        const pending = pendingRes.data;    

        console.log("Faturado:", invoiced);
        console.log("Pendente:", pending);

        const months = getLast6Months();

        // Mapeia os valores dos endpoints seguindo a ordem dos meses
        const keys = [
          "30",
          "60",
          "90",
          "120",
          "150",
          "180",
        ];

        // Pega apenas os últimos 6 valores seguindo a ordem dos meses
        const faturadoValues = keys.map(k => invoiced[`totalFaturado${k}`]);
        const pendenteValues = keys.map(k => pending[`totalPendente${k}`]);

        // Monta o array final para o gráfico
        const chartData = months.map((mes, index) => ({
          mes,
          Recebido: faturadoValues[index] ?? 0,
          Pendente: pendenteValues[index] ?? 0,
        }));

        setData(chartData);

      } catch (error) {
        console.error("Erro ao carregar dados dos gráficos", error);
      }
    };

    loadData();
  }, []);

  return (
    <div className="px-5 py-7 w-full">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <Legend />

          <XAxis dataKey="mes" stroke="#6b7280" axisLine={false} tickLine={false} />
          <YAxis stroke="#6b7280" axisLine={false} tickLine={false} />
          <Tooltip />

          <defs>
            <linearGradient id="gradientRecebido" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#009E0D" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#009E0D" stopOpacity={0.3} />
            </linearGradient>

            <linearGradient id="gradientPendente" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#A60003" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#A60003" stopOpacity={0.3} />
            </linearGradient>
          </defs>

          <Line
            type="monotone"
            dataKey="Recebido"
            stroke="url(#gradientRecebido)"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />

          <Line
            type="monotone"
            dataKey="Pendente"
            stroke="url(#gradientPendente)"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
