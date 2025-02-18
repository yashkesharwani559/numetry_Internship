import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [editNote, setEditNote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch Notes
  useEffect(() => {
    axios.get("http://localhost:5000/notes", { headers: { Authorization: token } })
      .then(res => setNotes(res.data))
      .catch(err => console.log(err));
  }, []);

  // Handle Add & Update Notes
  const handleSubmit = async () => {
    if (!newNote.title || !newNote.content) return alert("All fields are required!");

    if (editNote) {
      // Update Note
      await axios.put(`http://localhost:5000/notes/${editNote._id}`, newNote, { headers: { Authorization: token } });
      setNotes(notes.map(n => (n._id === editNote._id ? newNote : n)));
    } else {
      // Add New Note
      const res = await axios.post("http://localhost:5000/notes", newNote, { headers: { Authorization: token } });
      setNotes([...notes, res.data]);
    }

    setNewNote({ title: "", content: "" });
    setEditNote(null);
    setIsModalOpen(false);
  };

  // Handle Delete Note
  const handleDeleteNote = async (id) => {
    await axios.delete(`http://localhost:5000/notes/${id}`, { headers: { Authorization: token } });
    setNotes(notes.filter(n => n._id !== id));
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Welcome, {user.fullName}!</h1>
        <button 
          onClick={handleLogout} 
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
        >
          Logout
        </button>
      </div>

      {/* Add Note Button */}
      <button 
        onClick={() => {
          setNewNote({ title: "", content: "" });
          setEditNote(null);
          setIsModalOpen(true);
        }} 
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
      >
        + Add Note
      </button>

      {/* Notes List */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map(note => (
          <div key={note._id} className="p-4 border rounded-lg shadow-md bg-white">
            <h3 className="text-lg font-semibold">{note.title}</h3>
            <p className="text-gray-700">{note.content}</p>
            <div className="mt-3 flex justify-between">
              <button 
                onClick={() => {
                  setNewNote(note);
                  setEditNote(note);
                  setIsModalOpen(true);
                }} 
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDeleteNote(note._id)} 
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold">{editNote ? "Edit Note" : "Add Note"}</h2>
            <input 
              type="text" 
              placeholder="Note Title" 
              value={newNote.title} 
              onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              className="w-full p-2 mt-3 border rounded"
            />
            <textarea 
              placeholder="Note Content" 
              value={newNote.content} 
              onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              className="w-full p-2 mt-3 border rounded"
            />
            <div className="flex justify-end mt-4">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 mr-2">Cancel</button>
              <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                {editNote ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;



// import { useEffect, useState } from "react";
// import axios from "axios";

// const Dashboard = () => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const token = localStorage.getItem("token");
//   const [notes, setNotes] = useState([]);
//   const [newNote, setNewNote] = useState({ title: "", content: "" });
//   const [editNote, setEditNote] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Fetch Notes
//   useEffect(() => {
//     axios.get("http://localhost:5000/notes", { headers: { Authorization: token } })
//       .then(res => setNotes(res.data))
//       .catch(err => console.log(err));
//   }, []);

//   // Handle Add & Update Notes
//   const handleSubmit = async () => {
//     if (!newNote.title || !newNote.content) return alert("All fields are required!");

//     if (editNote) {
//       // Update Note
//       await axios.put(`http://localhost:5000/notes/${editNote._id}`, newNote, { headers: { Authorization: token } });
//       setNotes(notes.map(n => (n._id === editNote._id ? newNote : n)));
//     } else {
//       // Add New Note
//       const res = await axios.post("http://localhost:5000/notes", newNote, { headers: { Authorization: token } });
//       setNotes([...notes, res.data]);
//     }

//     setNewNote({ title: "", content: "" });
//     setEditNote(null);
//     setIsModalOpen(false);
//   };

//   // Handle Delete Note
//   const handleDeleteNote = async (id) => {
//     await axios.delete(`http://localhost:5000/notes/${id}`, { headers: { Authorization: token } });
//     setNotes(notes.filter(n => n._id !== id));
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold text-gray-800">Welcome, {user.fullName}!</h1>

//       {/* Add Note Button */}
//       <button 
//         onClick={() => {
//           setNewNote({ title: "", content: "" });
//           setEditNote(null);
//           setIsModalOpen(true);
//         }} 
//         className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
//       >
//         + Add Note
//       </button>

//       {/* Notes List */}
//       <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {notes.map(note => (
//           <div key={note._id} className="p-4 border rounded-lg shadow-md bg-white">
//             <h3 className="text-lg font-semibold">{note.title}</h3>
//             <p className="text-gray-700">{note.content}</p>
//             <div className="mt-3 flex justify-between">
//               <button 
//                 onClick={() => {
//                   setNewNote(note);
//                   setEditNote(note);
//                   setIsModalOpen(true);
//                 }} 
//                 className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
//               >
//                 Edit
//               </button>
//               <button 
//                 onClick={() => handleDeleteNote(note._id)} 
//                 className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Modal Popup */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//             <h2 className="text-xl font-bold">{editNote ? "Edit Note" : "Add Note"}</h2>
//             <input 
//               type="text" 
//               placeholder="Note Title" 
//               value={newNote.title} 
//               onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
//               className="w-full p-2 mt-3 border rounded"
//             />
//             <textarea 
//               placeholder="Note Content" 
//               value={newNote.content} 
//               onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
//               className="w-full p-2 mt-3 border rounded"
//             />
//             <div className="flex justify-end mt-4">
//               <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 mr-2">Cancel</button>
//               <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
//                 {editNote ? "Update" : "Add"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// };

// export default Dashboard;
