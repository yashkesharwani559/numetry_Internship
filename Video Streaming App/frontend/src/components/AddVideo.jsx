import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const VideoUploadForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate(); // Hook for navigation

  // Allowed video formats
  const videoTypes = ["video/mp4", "video/avi", "video/mov", "video/mkv"];

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && videoTypes.includes(file.type)) {
      setVideo(file);
      setError("");
    } else {
      setVideo(null);
      setError("Only video files (MP4, AVI, MOV, MKV) are allowed.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title || !description || !video) {
      setError("Please fill all fields and select a video.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("video", video); // Appending the video file

    try {
      const response = await axios.post("http://localhost:3000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Upload Success:", response.data);
      setSuccess("Video uploaded successfully!");
      setError("");

      // Reset form after submission
      setTitle("");
      setDescription("");
      setVideo(null);
    } catch (err) {
      console.error("Upload Error:", err);
      setError("Failed to upload video. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Upload Video</h2>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter video title"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter video description"
            required
          ></textarea>
        </div>

        <div>
          <label className="block font-semibold">Upload Video:</label>
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="w-full px-2 py-1 border rounded-md"
            required
          />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          Upload
        </button>
      </form>

      {video && (
        <div className="mt-4">
          <h3 className="font-semibold">Preview:</h3>
          <video controls width="100%" className="rounded-md mt-2">
            <source src={URL.createObjectURL(video)} type={video.type} />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      <div className="flex justify-center my-6">
        <button
          onClick={() => navigate("/")}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg transition shadow-md text-lg"
        >
          Fetch Video
        </button>
      </div>

    </div>
  );
};

export default VideoUploadForm;
