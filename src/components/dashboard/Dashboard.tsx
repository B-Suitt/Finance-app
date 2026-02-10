import { useMemo } from 'react'
import { useFinance } from '../../context/useFinance' 
import Card from './Card'

const Dashboard = () => {
 
    const { transactions } = useFinance()

    const summary = useMemo(() => {
        const income = transactions
            .filter(t => t.type === 'income')
            .reduce((acc, t) => acc + t.amount, 0)

        const expense = transactions
            .filter(t => t.type === 'expense')
            .reduce((acc, t) => acc + t.amount, 0)
        return {
            income,
            expense,
            total: income - expense
        }
    }, [transactions])

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <Card title="Ingresos" value={summary.income} />
      <Card title="Gastos" value={summary.expense} />
      <Card title="Balance" value={summary.total} />
    </section>
  )
}

export default Dashboard
