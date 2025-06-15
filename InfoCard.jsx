// 'use client';

// import { useState } from 'react';
// import { Copy, Download } from 'lucide-react';

// export default function InfoCard({ title, content, icon }) {
//   const [showModal, setShowModal] = useState(false);
//   const textContent = Array.isArray(content) ? content.join(', ') : content;

//   const handleCopy = () => {
//     navigator.clipboard.writeText(textContent);
//     alert(`Copied ${title} to clipboard`);
//   };

//   const handleDownload = () => {
//     const blob = new Blob([textContent], { type: 'text/plain' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = `${title.replace(/\s+/g, '_')}.txt`;
//     link.click();
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <>
//       <div
//         className="bg-white hover:bg-sky-50 border-l-4 border-sky-500 p-4 rounded-md shadow cursor-pointer transition"
//         onClick={() => setShowModal(true)}
//         aria-label={`View details for ${title}`}
//       >
//         <div className="flex items-center justify-between">
//           <h2 className="text-lg font-semibold text-sky-700 flex items-center gap-2">
//             <span>{icon || '📌'}</span> {title}
//           </h2>
//           <div className="flex items-center gap-2">
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleCopy();
//               }}
//               className="text-sky-500 hover:text-sky-700"
//               title="Copy"
//               aria-label={`Copy ${title} to clipboard`}
//             >
//               <Copy size={16} />
//             </button>
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleDownload();
//               }}
//               className="text-sky-500 hover:text-sky-700"
//               title="Download"
//               aria-label={`Download ${title} as text`}
//             >
//               <Download size={16} />
//             </button>
//           </div>
//         </div>
//       </div>

//       {showModal && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300"
//           style={{ opacity: showModal ? 1 : 0 }}
//         >
//           <div
//             className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg transition-transform transform duration-300"
//             role="dialog"
//             aria-labelledby={`modal-title-${title}`}
//             aria-hidden={!showModal}
//             style={{
//               transform: showModal ? 'scale(1)' : 'scale(0.9)',
//               opacity: showModal ? 1 : 0,
//             }}
//           >
//             <h3
//               id={`modal-title-${title}`}
//               className="text-xl font-bold mb-2"
//             >
//               {icon} {title}
//             </h3>
//             {Array.isArray(content) ? (
//               <ul className="list-disc pl-4 space-y-1 text-gray-700">
//                 {content.map((item, idx) => (
//                   <li key={idx}>{item}</li>
//                 ))}
//               </ul>
//             ) : (
//               <p className="text-gray-800 whitespace-pre-wrap">{content}</p>
//             )}
//             <div className="mt-4 flex justify-end space-x-2">
//               <button
//                 className="px-4 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
//                 onClick={() => setShowModal(false)}
//                 aria-label="Close modal"
//               >
//                 Close
//               </button>
//               <button
//                 className="px-4 py-1 text-sm bg-sky-600 text-white rounded hover:bg-sky-700"
//                 onClick={() => {
//                   handleCopy();
//                   setShowModal(false);
//                 }}
//                 aria-label={`Copy ${title} and close modal`}
//               >
//                 Copy & Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

'use client';

export default function InfoCard({ title, icon, content }) {
  const renderContent = (value) => {
    if (Array.isArray(value)) {
      if (typeof value[0] === 'object') {
        return value.map((item, idx) => (
          <div key={idx} className="mb-2 text-sm">
            {Object.entries(item).map(([k, v]) => (
              <div key={k}>
                <strong>{k}:</strong> {v}
              </div>
            ))}
          </div>
        ));
      } else {
        return value.map((item, idx) => (
          <div key={idx} className="text-sm">• {item}</div>
        ));
      }
    }
    return <div className="text-sm">{value}</div>;
  };

  return (
    <div className="border rounded-xl shadow-md p-4 bg-white">
      <div className="font-semibold text-base mb-2 flex items-center gap-2">
        <span>{icon}</span> {title}
      </div>
      <div>{renderContent(content)}</div>
    </div>
  );
}