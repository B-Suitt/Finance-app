import { useState, useMemo } from 'react'
import { useFinance } from '../../context/useFinance'
import type { TransactionType } from '../../types/finance'

type FilterType = 'all' | TransactionType

const TransactionList = () => {
  const { transactions, removeTransaction } = useFinance()
  const [filter, setFilter] = useState<FilterType>('all')

  const filteredTransactions = useMemo(() => {
    if (filter === 'all') return transactions
    return transactions.filter(t => t.type === filter)
  }, [transactions, filter])

  if (transactions.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        No hay transacciones aún
      </p>
    )
  }

  return (
    <div className="rounded-xl bg-white p-4 shadow">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Transacciones</h2>

        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`rounded-md px-3 py-1 text-sm ${
              filter === 'all'
                ? 'bg-black text-white'
                : 'bg-gray-100'
            }`}
          >
            Todas
          </button>

          <button
            onClick={() => setFilter('income')}
            className={`rounded-md px-3 py-1 text-sm ${
              filter === 'income'
                ? 'bg-black text-white'
                : 'bg-gray-100'
            }`}
          >
            Ingresos
          </button>

          <button
            onClick={() => setFilter('expense')}
            className={`rounded-md px-3 py-1 text-sm ${
              filter === 'expense'
                ? 'bg-black text-white'
                : 'bg-gray-100'
            }`}
          >
            Gastos
          </button>
        </div>
      </div>

      <ul className="space-y-3">
        {filteredTransactions.map(transaction => (
          <li
            key={transaction.id}
            className="flex items-center justify-between rounded-lg border p-3"
          >
            <div className="space-y-1">
              <p className="font-medium">
                {transaction.description}
              </p>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>
                  {new Date(transaction.date).toLocaleDateString()}
                </span>

                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    transaction.type === 'income'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {transaction.type === 'income'
                    ? 'Ingreso'
                    : 'Gasto'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span
                className={`font-semibold ${
                  transaction.type === 'income'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                ${transaction.amount.toLocaleString()}
              </span>

              <button
                onClick={() => removeTransaction(transaction.id)}
                className="text-sm text-gray-400 hover:text-red-500"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TransactionList
