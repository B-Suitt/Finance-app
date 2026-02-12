import Dashboard from '../components/dashboard/Dashboard';
import TransactionForm from '../components/transactions/TransactionForm';
import TransactionList from '../components/transactions/TransactionList';

const DashboardPage = () => {
  return (
    <div className="space-y-10">

      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Panel de Control</h1>
        <p className="text-gray-500 mt-1">Gestiona tus ingresos y gastos de forma centralizada.</p>
      </div>

      <section>
        <Dashboard />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Columna Formulario) */}
        <aside className="lg:col-span-1 sticky top-24">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <TransactionForm />
          </div>
        </aside>

        {/* Columna Lista de Transacciones */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <TransactionList />
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default DashboardPage;