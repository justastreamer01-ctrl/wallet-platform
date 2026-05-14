export default function DashboardPage() {
  return (
    <div className="p-10">
      <h1 className="text-3xl">Wallet Dashboard</h1>

      <div className="mt-6 border p-4">
        <p>Balance: ₦0</p>
      </div>

      <button className="bg-black text-white px-4 py-2 mt-4">
        Fund Wallet
      </button>
    </div>
  )
}