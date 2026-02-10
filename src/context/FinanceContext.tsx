import { createContext } from 'react'
import type { Transaction } from '../types/finance'

export type NewTransaction = Omit<Transaction, 'id'>

export type FinanceContextValue = {
  transactions: Transaction[]
  addTransaction: (transaction: NewTransaction) => void
  removeTransaction: (id: string) => void
}

export const FinanceContext =
  createContext<FinanceContextValue | null>(null)