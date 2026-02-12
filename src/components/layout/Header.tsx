const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo / Marca */}
        <div className="flex items-center gap-2 font-">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
            <span className="text-lg font-bold">F</span>
          </div>
          <span className="text-lg font-bold tracking-tight text-gray-900">
            Finance<span className="text-blue-600">App</span>
          </span>
        </div>

        {/* Menú / Usuario (Simulado por ahora) */}
        <div className="flex items-center gap-4">
          <div className="h-8 w-8 rounded-full bg-gray-200 border border-gray-300 overflow-hidden">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
              alt="User" 
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;