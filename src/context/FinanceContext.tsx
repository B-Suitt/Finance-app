import { createContext, useContext, useEffect, useState, useMemo, type ReactNode } from "react";
import type { Transaction, NewTransaction } from "../types/finance";

// 1. Definimos datos y funciones
interface FinanceContextValue {
  transactions: Transaction[];
  addTransaction: (transaction: NewTransaction) => void;
  removeTransaction: (id: string) => void;
}

// 2. Creamos el Contexto (inicia como null)
const FinanceContext = createContext<FinanceContextValue | null>(null);

// Helper para leer localStorage de forma segura
const getInitialTransactions = (): Transaction[] => {
  try {
    const stored = localStorage.getItem("transactions");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error al leer transacciones:", error);
    return [];
  }
};

// 3. El componente PROVIDER
export const FinanceProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(getInitialTransactions);

  // Guardar en localStorage cada vez que cambien las transacciones
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction: NewTransaction) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: crypto.randomUUID(), // Genera un ID único
    };
    setTransactions((prev) => [...prev, newTransaction]);
  };

  const removeTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  // Evita re-renderizados innecesarios
  const value = useMemo(() => ({
    transactions,
    addTransaction,
    removeTransaction
  }), [transactions]);

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
};

// 4. El HOOK personalizado (Para usar los datos en cualquier componente)
export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error("useFinance debe usarse dentro de un FinanceProvider");
  }
  return context;
};