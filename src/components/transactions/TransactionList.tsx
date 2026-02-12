import { useState, useMemo } from 'react';
import { useFinance } from '../../context/FinanceContext';
import type { TransactionType } from '../../types/finance';

type FilterType = 'all' | TransactionType;

// Formateador de dinero reutilizable
const moneyFormatter = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  minimumFractionDigits: 0,
});

const TransactionList = () => {
  const { transactions, removeTransaction } = useFinance(); //
  const [filter, setFilter] = useState<FilterType>('all');

  // Ordenar: lo más reciente arriba para mejor UX
  const filteredTransactions = useMemo(() => {
    const base = filter === 'all' 
      ? transactions 
      : transactions.filter(t => t.type === filter);
    
    return [...base].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions, filter]);

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-gray-200 rounded-2xl">
        <div className="bg-gray-100 p-4 rounded-full mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-sm font-semibold text-gray-900">No hay transacciones</h3>
        <p className="text-sm text-gray-500 mt-1">Comienza agregando tu primer ingreso o gasto.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header de la Lista: Responsive (Stack en móvil, Row en Desktop) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="text-xl font-bold text-gray-900 tracking-tight">Movimientos</h3>
        
        {/* Filtros Estilizados */}
        <div className="flex p-1 bg-gray-100 rounded-xl self-start sm:self-auto">
          {(['all', 'income', 'expense'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                filter === f 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {f === 'all' ? 'Todos' : f === 'income' ? 'Ingresos' : 'Gastos'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-3">
        {filteredTransactions.map((transaction) => (
          <div 
            key={transaction.id}
            className="group flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:border-blue-100 hover:bg-blue-50/30 transition-all shadow-sm"
          >
            {/* Izquierda: Info principal */}
            <div className="flex items-center gap-4">
              {/* Icono Dinámico según tipo */}
              <div className={`hidden sm:flex h-10 w-10 items-center justify-center rounded-full ${
                transaction.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              }`}>
                {transaction.type === 'income' ? '↓' : '↑'}
              </div>

              <div className="flex flex-col">
                <span className="font-bold text-gray-900 leading-tight">
                  {transaction.description}
                </span>
                <span className="text-xs font-medium text-gray-400 mt-0.5">
                  {new Date(transaction.date).toLocaleDateString('es-CL', { day: 'numeric', month: 'short' })}
                </span>
              </div>
            </div>

            {/* Derecha: Monto y Acción */}
            <div className="flex items-center gap-4">
              <span className={`text-base sm:text-lg font-bold font-mono ${
                transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
              }`}>
                {transaction.type === 'expense' ? '-' : '+'} {moneyFormatter.format(transaction.amount)}
              </span>
              
              {/* Botón Eliminar Estilizado */}
              <button 
                onClick={() => removeTransaction(transaction.id)} //
                className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Eliminar"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;