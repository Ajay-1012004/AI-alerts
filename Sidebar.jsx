export default function Sidebar() {
  return (
    <aside className="w-full md:w-64 bg-sky-800 text-white p-6 md:block hidden">
      <h2 className="text-xl font-bold mb-4">Menu</h2>
      <ul className="space-y-3">
        <li><a href="#" className="hover:underline">Dashboard</a></li>
        <li><a href="#" className="hover:underline">History</a></li>
        <li><a href="#" className="hover:underline">Settings</a></li>
        <li><a href="#" className="hover:underline">Help</a></li>
      </ul>
    </aside>
  );
}