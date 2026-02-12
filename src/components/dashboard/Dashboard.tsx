import { useMemo } from 'react';
import { useFinance } from '../../context/FinanceContext';
import StatCard from './Card';

// Formateador de dinero (Chile/Pesos)
const formatter = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
});

const Dashboard = () => {
  const { transactions } = useFinance();

  // Cálculos 
  const { totalIncome, totalExpense, balance } = useMemo(() => {
    let income = 0;
    let expense = 0;

    transactions.forEach((t) => {
      if (t.type === 'income') income += t.amount;
      else expense += t.amount;
    });

    return {
      totalIncome: income,
      totalExpense: expense,
      balance: income - expense,
    };
  }, [transactions]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Resumen Financiero</h2>
      
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 1. BALANCE  */}
        <StatCard
          title="Balance Total"
          value={formatter.format(balance)}
          color="blue"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          }
        />

        {/* 2. INGRESOS */}
        <StatCard
          title="Ingresos"
          value={`+ ${formatter.format(totalIncome)}`}
          color="green"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          }
        />

        {/* 3. GASTOS */}
        <StatCard
          title="Gastos"
          value={`- ${formatter.format(totalExpense)}`}
          color="red"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
            </svg>
          }
        />
      </div>
    </div>
  );
};

export default Dashboard;