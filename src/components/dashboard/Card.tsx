import { type ReactNode } from 'react';

interface CardProps {
  title: string;
  value: string;
  color: 'blue' | 'green' | 'red'; // Limitamos los colores
  icon: ReactNode;
}

const Card = ({ title, value, color, icon }: CardProps) => {
  // Definimos colores
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 border-blue-200",
    green: "bg-green-50 text-green-600 border-green-200",
    red: "bg-red-50 text-red-600 border-red-200",
  };

  const borderClass = {
    blue: "border-l-blue-500",
    green: "border-l-green-500",
    red: "border-l-red-500",
  };

  return (
    <div className={`p-5 bg-white rounded-xl shadow-sm border border-gray-100 border-l-8 ${borderClass[color]} hover:shadow-md transition-shadow`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        </div>
        
        {/* Círculo con el icono */}
        <div className={`p-3 rounded-full ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default Card;