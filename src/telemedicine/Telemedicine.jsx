// import React, { useEffect, useState } from "react";

// // TelemedicineDashboard.jsx — SymptoScan AI Telemedicine Component
// // Displays: Doctor Appointments, Upcoming Meetings, and Patient Messages
// // Designed with TailwindCSS and ready for API integration

// export default function TelemedicineDashboard({ doctorId = "doctor_001", apiBase = "/api" }) {
//   const [appointments, setAppointments] = useState([]);
//   const [meetings, setMeetings] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [selectedMessage, setSelectedMessage] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let cancel = false;

//     async function fetchData() {
//       setLoading(true);
//       try {
//         const [a, m, msg] = await Promise.all([
//           fetch(`${apiBase}/doctors/${doctorId}/appointments`).then(r => r.ok ? r.json() : MOCK_APPOINTMENTS),
//           fetch(`${apiBase}/doctors/${doctorId}/meetings`).then(r => r.ok ? r.json() : MOCK_MEETINGS),
//           fetch(`${apiBase}/doctors/${doctorId}/messages`).then(r => r.ok ? r.json() : MOCK_MESSAGES),
//         ]);
//         if (!cancel) {
//           setAppointments(a);
//           setMeetings(m);
//           setMessages(msg);
//         }
//       } catch (e) {
//         if (!cancel) {
//           setAppointments(MOCK_APPOINTMENTS);
//           setMeetings(MOCK_MEETINGS);
//           setMessages(MOCK_MESSAGES);
//         }
//       } finally {
//         if (!cancel) setLoading(false);
//       }
//     }

//     fetchData();
//     return () => (cancel = true);
//   }, [doctorId, apiBase]);

//   const acceptAppointment = id => {
//     setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'accepted' } : a));
//   };

//   const declineAppointment = id => {
//     setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'declined' } : a));
//   };

//   const markRead = id => {
//     setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
//     setSelectedMessage(messages.find(m => m.id === id));
//   };

//   return (
//     <div className="grid lg:grid-cols-3 gap-4 p-4">
//       {/* Appointments */}
//       <div className="bg-white rounded-2xl shadow p-4">
//         <h2 className="text-lg font-semibold mb-3">Appointments</h2>
//         {loading ? <p>Loading...</p> : appointments.map(a => (
//           <div key={a.id} className="border rounded-xl p-3 mb-2">
//             <div className="flex justify-between items-start">
//               <div>
//                 <div className="font-medium">{a.patientName}</div>
//                 <div className="text-sm text-gray-500">{new Date(a.start).toLocaleString()}</div>
//               </div>
//               <div className={`text-sm ${a.status === 'accepted' ? 'text-green-600' : a.status === 'declined' ? 'text-red-600' : 'text-yellow-600'}`}>{a.status}</div>
//             </div>
//             <div className="mt-2 flex gap-2">
//               {a.status !== 'accepted' && <button onClick={() => acceptAppointment(a.id)} className="border rounded-md px-2 py-1 text-sm">Accept</button>}
//               {a.status !== 'declined' && <button onClick={() => declineAppointment(a.id)} className="border rounded-md px-2 py-1 text-sm">Decline</button>}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Meetings */}
//       <div className="bg-white rounded-2xl shadow p-4">
//         <h2 className="text-lg font-semibold mb-3">Upcoming Meetings</h2>
//         {loading ? <p>Loading...</p> : meetings.map(m => (
//           <div key={m.id} className="border rounded-xl p-3 mb-2">
//             <div className="flex justify-between items-center">
//               <div>
//                 <div className="font-medium">{m.title}</div>
//                 <div className="text-sm text-gray-500">{new Date(m.start).toLocaleString()} ({m.duration} min)</div>
//               </div>
//               <button onClick={() => alert('Join ' + m.id)} className="border rounded-md px-2 py-1 text-sm">Join</button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Messages */}
//       <div className="bg-white rounded-2xl shadow p-4">
//         <h2 className="text-lg font-semibold mb-3">Messages</h2>
//         <div className="grid grid-cols-3 gap-3">
//           <div className="col-span-1 border rounded-lg p-2 overflow-y-auto max-h-96">
//             {messages.map(m => (
//               <div key={m.id} onClick={() => markRead(m.id)} className={`cursor-pointer p-2 rounded-md mb-2 ${selectedMessage?.id === m.id ? 'bg-gray-100' : ''}`}>
//                 <div className="font-medium text-sm">{m.from}</div>
//                 <div className="text-xs text-gray-500">{new Date(m.received).toLocaleTimeString()}</div>
//                 <div className="text-xs truncate">{m.preview}</div>
//                 {!m.read && <div className="text-xs text-red-600">New</div>}
//               </div>
//             ))}
//           </div>
//           <div className="col-span-2 border rounded-lg p-3">
//             {selectedMessage ? (
//               <div>
//                 <div className="font-semibold mb-2">{selectedMessage.from}</div>
//                 <div className="text-sm text-gray-700 mb-3">{selectedMessage.body}</div>
//                 <button onClick={() => alert('Reply')} className="border rounded-md px-3 py-1 text-sm">Reply</button>
//               </div>
//             ) : <p className="text-sm text-gray-500">Select a message to view</p>}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// const MOCK_APPOINTMENTS = [
//   { id: 'a1', patientName: 'Ali Khan', start: new Date().toISOString(), status: 'pending' },
//   { id: 'a2', patientName: 'Sara Malik', start: new Date(Date.now() + 86400000).toISOString(), status: 'accepted' }
// ];

// const MOCK_MEETINGS = [
//   { id: 'm1', title: 'Consultation with Ali Khan', start: new Date().toISOString(), duration: 30 },
//   { id: 'm2', title: 'Follow-up with Sara Malik', start: new Date(Date.now() + 7200000).toISOString(), duration: 45 }
// ];

// const MOCK_MESSAGES = [
//   { id: 'msg1', from: 'Ali Khan', received: new Date().toISOString(), preview: 'Doctor, I am feeling...', body: 'Doctor, I am feeling dizzy after medication.', read: false },
//   { id: 'msg2', from: 'Sara Malik', received: new Date().toISOString(), preview: 'Can we reschedule?', body: 'Can we move our session to tomorrow?', read: true }
// ];






import React, { useEffect, useState } from "react";

export default function TelemedicineDashboard({ doctorId = "doctor_001", apiBase = "/api" }) {
  const [appointments, setAppointments] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancel = false;
    async function fetchData() {
      setLoading(true);
      try {
        const [a, m, msg] = await Promise.all([
          fetch(`${apiBase}/doctors/${doctorId}/appointments`).then(r => r.ok ? r.json() : MOCK_APPOINTMENTS),
          fetch(`${apiBase}/doctors/${doctorId}/meetings`).then(r => r.ok ? r.json() : MOCK_MEETINGS),
          fetch(`${apiBase}/doctors/${doctorId}/messages`).then(r => r.ok ? r.json() : MOCK_MESSAGES),
        ]);
        if (!cancel) {
          setAppointments(a);
          setMeetings(m);
          setMessages(msg);
        }
      } catch (e) {
        if (!cancel) {
          setAppointments(MOCK_APPOINTMENTS);
          setMeetings(MOCK_MEETINGS);
          setMessages(MOCK_MESSAGES);
        }
      } finally {
        if (!cancel) setLoading(false);
      }
    }
    fetchData();
    return () => (cancel = true);
  }, [doctorId, apiBase]);

  const acceptAppointment = id =>
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'accepted' } : a));
  const declineAppointment = id =>
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'declined' } : a));
  const markRead = id => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
    setSelectedMessage(messages.find(m => m.id === id));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">
      {/* Appointments */}
      <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col">
        <h2 className="text-lg font-semibold mb-4 text-indigo-700">Appointments</h2>
        <div className="flex-1 space-y-3 overflow-y-auto max-h-[calc(100vh-150px)]">
          {loading ? <p className="text-gray-400">Loading...</p> :
            appointments.map(a => (
              <div key={a.id} className="border rounded-xl p-3 hover:shadow-md transition">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium text-gray-800">{a.patientName}</div>
                    <div className="text-sm text-gray-500">{new Date(a.start).toLocaleString()}</div>
                  </div>
                  <span className={`text-sm font-semibold ${
                    a.status === 'accepted' ? 'text-green-600' :
                    a.status === 'declined' ? 'text-red-600' : 'text-yellow-600'}`}>
                    {a.status}
                  </span>
                </div>
                <div className="mt-2 flex gap-2">
                  {a.status !== 'accepted' &&
                    <button onClick={() => acceptAppointment(a.id)}
                      className="flex-1 py-1 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition">
                      Accept
                    </button>}
                  {a.status !== 'declined' &&
                    <button onClick={() => declineAppointment(a.id)}
                      className="flex-1 py-1 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition">
                      Decline
                    </button>}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Meetings */}
      <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col">
        <h2 className="text-lg font-semibold mb-4 text-indigo-700">Upcoming Meetings</h2>
        <div className="flex-1 space-y-3 overflow-y-auto max-h-[calc(100vh-150px)]">
          {loading ? <p className="text-gray-400">Loading...</p> :
            meetings.map(m => (
              <div key={m.id} className="border rounded-xl p-3 hover:shadow-md transition flex justify-between items-center">
                <div>
                  <div className="font-medium text-gray-800">{m.title}</div>
                  <div className="text-sm text-gray-500">{new Date(m.start).toLocaleString()} ({m.duration} min)</div>
                </div>
                <button onClick={() => alert('Join ' + m.id)}
                  className="px-3 py-1 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition">
                  Join
                </button>
              </div>
            ))}
        </div>
      </div>

      {/* Messages */}
      <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col">
        <h2 className="text-lg font-semibold mb-4 text-indigo-700">Messages</h2>
        <div className="flex flex-col md:flex-row gap-3 flex-1 overflow-hidden">
          <div className="flex-1 border rounded-lg p-2 overflow-y-auto max-h-[calc(100vh-150px)]">
            {messages.map(m => (
              <div key={m.id}
                onClick={() => markRead(m.id)}
                className={`cursor-pointer p-2 mb-2 rounded-md hover:bg-gray-100 transition ${
                  selectedMessage?.id === m.id ? 'bg-gray-100' : ''
                }`}>
                <div className="font-medium text-sm text-gray-800">{m.from}</div>
                <div className="text-xs text-gray-500">{new Date(m.received).toLocaleTimeString()}</div>
                <div className="text-xs truncate text-gray-600">{m.preview}</div>
                {!m.read && <span className="text-xs text-red-600 font-semibold">New</span>}
              </div>
            ))}
          </div>
          <div className="flex-1 border rounded-lg p-3 overflow-y-auto max-h-[calc(100vh-150px)]">
            {selectedMessage ? (
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="font-semibold mb-2 text-gray-800">{selectedMessage.from}</div>
                  <div className="text-sm text-gray-700 mb-3">{selectedMessage.body}</div>
                </div>
                <button onClick={() => alert('Reply')}
                  className="self-start px-3 py-1 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition">
                  Reply
                </button>
              </div>
            ) : (
              <p className="text-sm text-gray-500">Select a message to view</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const MOCK_APPOINTMENTS = [
  { id: 'a1', patientName: 'Ali Khan', start: new Date().toISOString(), status: 'pending' },
  { id: 'a2', patientName: 'Sara Malik', start: new Date(Date.now() + 86400000).toISOString(), status: 'accepted' }
];

const MOCK_MEETINGS = [
  { id: 'm1', title: 'Consultation with Ali Khan', start: new Date().toISOString(), duration: 30 },
  { id: 'm2', title: 'Follow-up with Sara Malik', start: new Date(Date.now() + 7200000).toISOString(), duration: 45 }
];

const MOCK_MESSAGES = [
  { id: 'msg1', from: 'Ali Khan', received: new Date().toISOString(), preview: 'Doctor, I am feeling...', body: 'Doctor, I am feeling dizzy after medication.', read: false },
  { id: 'msg2', from: 'Sara Malik', received: new Date().toISOString(), preview: 'Can we reschedule?', body: 'Can we move our session to tomorrow?', read: true }
];
