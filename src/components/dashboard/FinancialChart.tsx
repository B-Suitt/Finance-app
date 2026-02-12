import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useFinance } from '../../context/FinanceContext';

const FinancialChart = () => {
  const { transactions } = useFinance();

  // 1. Preparar los datos para el gráfico
  const data = useMemo(() => {
    let income = 0;
    let expense = 0;

    transactions.forEach(t => {
      if (t.type === 'income') income += t.amount;
      else expense += t.amount;
    });

    return [
      { name: 'Ingresos', amount: income, color: '#10b981' }, // emerald-500
      { name: 'Gastos', amount: expense, color: '#ef4444' },  // red-500
    ];
  }, [transactions]);

  // 2. Tooltip Personalizado con Tailwind
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-100">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
            {payload[0].payload.name}
          </p>
          <p className="text-lg font-bold text-gray-900">
            ${payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };
const formatSmartValue = (value: number) => {
    if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(1)}B`; // Ejemplo: $1.2B
  }
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`; // Ejemplo: $1.2M
  }
  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(0)}K`; // Ejemplo: $10K
  }
  return `$${value}`;
};


  if (transactions.length === 0) return null;

  return (
    <div className="h-80 w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 500 }}
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#9ca3af', fontSize: 10 }}
            tickFormatter={formatSmartValue}
            width={70}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f9fafb' }} />
          <Bar dataKey="amount" radius={[6, 6, 0, 0]} barSize={60}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinancialChart;