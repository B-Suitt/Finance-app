import { type ReactNode } from 'react';
import Header from './Header'; // Asegúrate de tener este componente o créalo abajo

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* 1. Header Fijo Superior */}
      <Header />

      {/* 2. Contenedor Principal Centrado */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Aquí se renderiza el Dashboard */}
        {children}
      </main>
    </div>
  );
};

export default Layout;