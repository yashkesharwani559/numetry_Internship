import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FetchVideo = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null); // For modal
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch all videos
  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = () => {
    fetch("http://localhost:3000/api/videos")
      .then((res) => res.json())
      .then((data) => setVideos(data))
      .catch((err) => console.error("Error fetching videos:", err));
  };

  // Delete Video
  const handleDelete = (id) => {
    fetch(`http://localhost:3000/api/video/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => fetchVideos()) // Refresh videos after deletion
      .catch((err) => console.error("Error deleting video:", err));
  };

  // Open Modify Modal
  const handleModify = (video) => {
    setSelectedVideo(video);
    setModalOpen(true);
  };

  // Update Video Details
  const handleUpdate = () => {
    fetch(`http://localhost:3000/api/video/${selectedVideo._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: selectedVideo.title,
        description: selectedVideo.description,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setModalOpen(false);
        fetchVideos(); // Refresh videos after update
      })
      .catch((err) => console.error("Error updating video:", err));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Add Video Button */}
      <div className="flex justify-center my-6">
        <button
          onClick={() => navigate("/add-video")}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg transition shadow-md text-lg"
        >
          ➕ Add Video
        </button>
      </div>

      {/* Video List */}
      {videos.length === 0 ? (
        <p className="text-center text-gray-500">No videos available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
          {videos.map((video) => (
            <div key={video._id} className="bg-white rounded-lg shadow-lg p-4 w-full max-w-xs">
              <h2 className="text-xl font-semibold">{video.title}</h2>
              <p className="text-gray-600 text-sm">{video.description}</p>
              <button
                onClick={() => window.open(`http://localhost:3000/api/video/${video.fileId}`, "_blank")}
                className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
              >
                ▶️ Play Video
              </button>
              <div className="flex justify-between mt-3">
                <button
                  onClick={() => handleModify(video)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg transition text-sm"
                >
                  ✏️ Modify
                </button>
                <button
                  onClick={() => handleDelete(video._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg transition text-sm"
                >
                  ❌ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modify Modal */}
      {modalOpen && selectedVideo && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Modify Video</h2>
            <label className="block mb-2">Title:</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              value={selectedVideo.title}
              onChange={(e) => setSelectedVideo({ ...selectedVideo, title: e.target.value })}
            />
            <label className="block mb-2">Description:</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              value={selectedVideo.description}
              onChange={(e) => setSelectedVideo({ ...selectedVideo, description: e.target.value })}
            />
            <div className="flex justify-between">
              <button
                onClick={handleUpdate}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
              >
                ✅ Submit
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition"
              >
                ❌ Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FetchVideo;
