import { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import type { TransactionType } from '../../types/finance';

const TransactionForm = () => {
  const { addTransaction } = useFinance();
  const [amount, setAmount] = useState(''); 
  const [description, setDescription] = useState('');
  const [type, setType] = useState<TransactionType>('income');
  const [errors, setErrors] = useState<{ description?: string; amount?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};
    if (!description.trim()) newErrors.description = "La descripción es obligatoria";
    const numericAmount = parseFloat(amount);
    if (!amount || isNaN(numericAmount) || numericAmount <= 0) newErrors.amount = "El monto debe ser mayor a 0";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    addTransaction({
      description,
      amount: numericAmount,
      type,
      date: new Date().toISOString()
    });

    setDescription('');
    setAmount('');
    setType('income');
    setErrors({});
  };
  
  const labelClass = "text-xs font-bold uppercase tracking-wider text-gray-500 mb-1 block";
  const inputClass = "w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all";
  const errorInputClass = "w-full rounded-lg border border-red-500 bg-white p-2.5 text-sm text-red-900 focus:ring-1 focus:ring-red-500 outline-none transition-all";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">Nueva Transacción</h2>
        <p className="text-sm text-gray-500">Registra tus movimientos financieros.</p>
      </div>
      
      <div className="space-y-1">
        <label className={labelClass}>Descripción</label>
        <input
          type="text"
          placeholder="Ej: Alquiler"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={errors.description ? errorInputClass : inputClass}
        />
        {errors.description && <span className="text-xs font-medium text-red-500">{errors.description}</span>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className={labelClass}>Monto</label>
          <input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={errors.amount ? errorInputClass : inputClass}
          />
          {errors.amount && <span className="text-xs font-medium text-red-500">{errors.amount}</span>}
        </div>

        <div className="space-y-1">
          <label className={labelClass}>Tipo</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as TransactionType)}
            className={inputClass}
          >
            <option value="income">Ingreso 💰</option>
            <option value="expense">Gasto 💸</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-bold text-white shadow-md hover:bg-blue-700 active:scale-[0.98] transition-all"
      >
        Guardar Movimiento
      </button>
    </form>
  );
};

export default TransactionForm;