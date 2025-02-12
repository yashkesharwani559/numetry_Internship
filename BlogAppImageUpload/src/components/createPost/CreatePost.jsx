import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FileImage, UploadCloud } from "lucide-react"; // Importing Icons

function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null); // Preview Image URL

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Create preview URL
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.post("http://localhost:5000/api/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Post Created Successfully!");
      setTitle("");
      setDescription("");
      setImage(null);
      setPreview(null);
    } catch (error) {
      alert("Error Creating Post");
    }
  };

  return (
    <motion.div 
      className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 p-6"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="w-full max-w-lg bg-white/10 backdrop-blur-lg p-6 rounded-lg shadow-xl border border-gray-300"
        initial={{ y: -30, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-3xl font-extrabold text-center text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
          Create Blog Post
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div className="relative">
            <input 
              type="text"
              className="peer w-full p-3 border-b-2 border-gray-400 bg-transparent text-xl text-white placeholder-transparent focus:border-blue-500 outline-none transition-all"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <label className="absolute left-2 top-2 text-gray-300 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-xl peer-placeholder-shown:text-gray-500 peer-focus:top-14 peer-focus:text-lg peer-focus:text-blue-400">
              Title
            </label>
          </div>

          {/* Description Input */}
          <div className="relative">
            <textarea
              className="peer w-full p-3 border-b-2 border-gray-400 bg-transparent text-white placeholder-transparent text-lg focus:border-blue-500 outline-none transition-all resize-none"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows="4"
            />
            <label className="absolute left-2 top-2 text-gray-300 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-xl peer-placeholder-shown:text-gray-500 peer-focus:top-33 peer-focus:text-lg peer-focus:text-blue-400">
              Description
            </label>
          </div>

          {/* File Upload Section */}
          <div className="flex flex-col items-center">
            <input 
              type="file" 
              accept="image/*" 
              id="fileInput"
              className="hidden"
              onChange={handleImageChange}
            />
            
            {/* Upload Button with Icon */}
            <label htmlFor="fileInput" className="cursor-pointer">
              <motion.div 
                className="flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 shadow-lg transition-all hover:scale-110"
                whileHover={{ scale: 1.1 }}
              >
                <FileImage size={48} color="white" />
              </motion.div>
            </label>

            {/* Preview Image */}
            {preview && (
              <div className="mt-4">
                <img src={preview} alt="Preview" className="w-32 h-32 rounded-lg shadow-lg" />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgb(59, 130, 246)" }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all hover:from-blue-600 hover:to-purple-600"
          >
            Submit
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default CreatePost;
