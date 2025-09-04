import { useNavigate } from "react-router";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-6 bg-base-100">

      {/* Title */}
      <h1 className="text-9xl font-bold text-error mb-4 italic">404</h1>
      <h2 className="text-4xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-2xl text-gray-500 mb-6">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>

      {/* Buttons */}
      <div className="flex gap-4">
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Go Home
        </button>
        <button className="btn btn-outline" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    </div>
  );
}
