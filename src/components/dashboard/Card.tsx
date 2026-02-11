type Props = {
  title: string
  value: number
}

const Card = ({ title, value }: Props) => {
  return (
    <div className="rounded-xl bg-gray-900 p-4 shadow">
      <p className="text-sm text-white font-semibold">{title}</p>
      <p className="mt-2 text-2xl font-semibold text-white">
        ${value.toLocaleString()}
      </p>
    </div>
  )
}

export default Card
