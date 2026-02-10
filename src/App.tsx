import Layout from "./components/layout/Layout"
import FinanceProvider from "./context/FinanceProvider";
import Dashboard from './pages/Dashboard';




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
