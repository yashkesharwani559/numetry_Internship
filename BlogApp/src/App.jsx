import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CreatePost from "./components/blogList/BlogList";
import BlogList from "./components/createPost/CreatePost";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
        <nav className="mb-4 space-x-4">
          <Link to="/blogs" className="text-blue-500 font-semibold">Create Post</Link>
          <Link to="/" className="text-blue-500 font-semibold">View Blogs</Link>
        </nav>
        <Routes>
          <Route path="/" element={<CreatePost />} />
          <Route path="/blogs" element={<BlogList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
