import Dashboard from '../components/dashboard/Dashboard';
import FinancialChart from '../components/dashboard/FinancialChart';
import TransactionForm from '../components/transactions/TransactionForm';
import TransactionList from '../components/transactions/TransactionList';

const DashboardPage = () => {
  return (
    /* Usamos space-y-8 para separar las secciones principales verticalmente */
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* 1. Encabezado: Título y subtítulo */}
      <div className="px-1">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Panel de Control
        </h1>
        <p className="text-gray-500 mt-1 text-sm sm:text-base">
          Gestiona tus ingresos y gastos de forma centralizada.
        </p>
      </div>

      {/* 2. Tarjetas de Resumen: Ya tienen su propio grid interno en Dashboard.tsx */}
      <section>
        <Dashboard />
      </section>

      {/* 3. Cuerpo Principal: Grid Responsivo */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* COLUMNA IZQUIERDA (Principal): Gráfico y Lista */}
        <div className="lg:col-span-2 space-y-8 order-2 lg:order-1">
          
          {/* Contenedor del Gráfico */}
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4 px-1">
              Balance Visual
            </h2>
            <div className="w-full overflow-hidden">
              <FinancialChart />
            </div>
          </div>

          {/* Contenedor de la Lista */}
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100">
            <TransactionList />
          </div>
        </div>

        {/* COLUMNA DERECHA (Lateral): Formulario */}
        {/* En mobile aparece primero para facilitar la entrada de datos (order-1) */}
        <aside className="lg:col-span-1 order-1 lg:order-2 lg:sticky lg:top-24">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <TransactionForm />
          </div>
        </aside>
        
      </div>
    </div>
  );
};

export default DashboardPage;