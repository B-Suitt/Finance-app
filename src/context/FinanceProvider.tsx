import { useEffect, useState } from 'react'
import { FinanceContext } from './FinanceContext'
import type { Transaction } from '../types/finance'

const getInitialTransactions = (): Transaction[] => {
  const stored = localStorage.getItem('transactions')
  return stored ? JSON.parse(stored) : []
}

const FinanceProvider = ({ children }: { children: React.ReactNode }) => {
  const [transactions, setTransactions] =
    useState<Transaction[]>(getInitialTransactions)

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
  }, [transactions])

  const addTransaction = (transaction: Transaction) => {
    setTransactions(prev => [...prev, transaction])
  }

  const removeTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id))
  }

  return (
    <FinanceContext.Provider
      value={{ transactions, addTransaction, removeTransaction }}
    >
      {children}
    </FinanceContext.Provider>
  )
}

export default FinanceProvider
