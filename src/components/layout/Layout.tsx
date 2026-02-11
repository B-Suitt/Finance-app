import Header from "./Header";

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props ) => {
  return (
    <div className="min-h-screen flex bg-gray-600 text-gray-900 ">

      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
