export default function Toast({ type = 'info', message }) {
  const colors = {
    success: 'bg-green-100 text-green-700',
    error: 'bg-red-100 text-red-700',
    info: 'bg-sky-100 text-sky-700',
  };

  return (
    <div className={`fixed bottom-5 right-5 px-4 py-2 rounded shadow-md ${colors[type]}`}>
      {message}
    </div>
  );
}