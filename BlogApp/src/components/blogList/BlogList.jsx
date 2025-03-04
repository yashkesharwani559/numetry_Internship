
import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function BlogList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/posts")
      .then((response) => setPosts(response.data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  return (
    <motion.div 
      className="w-screen min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black p-8"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-4xl font-extrabold text-white text-center mb-10 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Latest Blog Posts
      </h2>

      {posts.length === 0 ? (
        <p className="text-white text-lg">No Posts Found</p>
      ) : (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl"
          initial={{ y: 30, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.7 }}
        >
          {posts.map((post) => (
            <motion.div 
              key={post._id}
              className="p-6 bg-white/10 backdrop-blur-lg border border-gray-500 rounded-lg shadow-xl text-white transform transition-all hover:scale-105 hover:shadow-2xl"
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgb(59, 130, 246)" }}
            >
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {post.title}
              </h3>
              <p className="mt-2 text-gray-300">{post.description}</p>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}

export default BlogList;



// import { useState, useEffect } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";

// function BlogList() {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/posts")
//       .then((response) => setPosts(response.data))
//       .catch((error) => console.error("Error fetching posts:", error));
//   }, []);

//   return (
//     <motion.div className="max-w-2xl p-6 bg-white shadow-lg rounded-lg"
//       initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//       <h2 className="text-2xl font-bold mb-4">Blog Posts</h2>
//       {posts.length === 0 ? <p>No Posts Found</p> : (
//         posts.map((post) => (
//           <div key={post._id} className="mb-4 p-4 border rounded">
//             <h3 className="text-xl font-semibold">{post.title}</h3>
//             <p className="text-gray-600">{post.description}</p>
//           </div>
//         ))
//       )}
//     </motion.div>
//   );
// }

// export default BlogList;
