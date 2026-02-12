import Layout from "./components/layout/Layout"
import { FinanceProvider } from './context/FinanceContext'
import Dashboard from './pages/DashboardPage';




function App() {

  return (
    <FinanceProvider>
      <Layout>
        <Dashboard />
      </Layout>
    </FinanceProvider>
  )
}

export default App
