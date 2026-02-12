import { useState, useMemo } from "react";
import { useFinance } from "../../context/FinanceContext";
import type { TransactionType } from "../../types/finance";

type FilterType = "all" | TransactionType;

const TransactionList = () => {
  const { transactions, removeTransaction } = useFinance();
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredTransactions = useMemo(() => {
    if (filter === "all") return transactions;
    return transactions.filter((t) => t.type === filter);
  }, [transactions, filter]);

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-gray-200 rounded-2xl">
        <div className="bg-gray-100 p-4 rounded-full mb-4">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-sm font-semibold text-gray-900">
          No hay transacciones
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Comienza agregando tu primer ingreso o gasto a la derecha.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white p-4 ">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Transacciones</h2>

        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`rounded-md px-3 py-1 text-sm ${
              filter === "all" ? "bg-black text-white" : "bg-gray-100"
            }`}
          >
            Todas
          </button>

          <button
            onClick={() => setFilter("income")}
            className={`rounded-md px-3 py-1 text-sm ${
              filter === "income" ? "bg-black text-white" : "bg-gray-100"
            }`}
          >
            Ingresos
          </button>

          <button
            onClick={() => setFilter("expense")}
            className={`rounded-md px-3 py-1 text-sm ${
              filter === "expense" ? "bg-black text-white" : "bg-gray-100"
            }`}
          >
            Gastos
          </button>
        </div>
      </div>

      <ul className="space-y-3">
        {filteredTransactions.map((transaction) => (
          <li
            key={transaction.id}
            className="flex items-center justify-between rounded-lg border border-gray-300 p-3 shadow hover:bg-gray-100 transition-colors"
          >
            <div className="space-y-1">
              <p className="font-medium">{transaction.description}</p>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>{new Date(transaction.date).toLocaleDateString()}</span>

                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    transaction.type === "income"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {transaction.type === "income" ? "Ingreso" : "Gasto"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span
                className={`font-semibold ${
                  transaction.type === "income"
                    ? "text-green-600"
                    : "text-red-600"
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
  );
};

export default TransactionList;
