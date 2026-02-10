import Dashboard from '../components/dashboard/Dashboard'
import TransactionForm from '../components/transactions/TransactionForm'
import TransactionList from '../components/transactions/TransactionList'

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <Dashboard />
      <TransactionForm />
      <TransactionList />
    </div>
  )
}

export default DashboardPage