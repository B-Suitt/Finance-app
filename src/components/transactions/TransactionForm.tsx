import { useState } from 'react'
import { useFinance } from '../../context/useFinance'
import type { TransactionType } from '../../types/finance'

const TransactionForm = () => {
  const { addTransaction } = useFinance()

  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState<number>(0)
  const [type, setType] = useState<TransactionType>('income')

  const [errors, setErrors] = useState<{
  description?: string
  amount?: string
  type?: string
  }>({})

  const validate = () => {
  const newErrors: typeof errors = {}

  if (!description.trim()) {
    newErrors.description = "La descripción es obligatoria"
  }

  if (!amount || amount <= 0) {
    newErrors.amount = "El monto debe ser mayor a 0"
  }

  setErrors(newErrors)

  return Object.keys(newErrors).length === 0
}

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return 

    addTransaction({
      description,
      amount,
      type,
      date:new Date().toISOString()
    })

    setDescription('')
    setAmount(0)
    setType('income')
    setErrors({})
  }

  return (
     <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl bg-white p-4 shadow"
    >
      <h2 className="text-lg font-semibold">Nueva transacción</h2>

      <input
        type="text"
        placeholder="Descripción"
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="w-full rounded-md border px-3 py-2"
      />

      {errors.description && (
        <p className="text-sm text-red-500">{errors.description}</p>
      )}

      <input
        type="number"
        placeholder="Monto"
        value={amount}
        onChange={e => setAmount(Number(e.target.value))}
        className="w-full rounded-md border px-3 py-2"
      />

      {errors.amount && (
        <p className="text-sm text-red-500">{errors.amount}</p>
      )}

      <select
        value={type}
        onChange={e => setType(e.target.value as TransactionType)}
        className="w-full rounded-md border px-3 py-2"
      >
        <option value="income">Ingreso</option>
        <option value="expense">Gasto</option>
      </select>

      <button
        type="submit"
        className="w-full rounded-md bg-black py-2 text-white hover:opacity-90"
      >
        Agregar
      </button>
    </form>
  )
}

export default TransactionForm
