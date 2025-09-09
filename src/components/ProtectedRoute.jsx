import { Navigate } from "react-router-dom";
import { useAuth } from "../context/FirebaseContext";
// your custom auth hook

export default function ProtectedRoute({ children }) {
  const { userDetail } = useAuth(); // e.g. Firebase gives you a user object
  console.log(userDetail);
  if (!userDetail.email) {
    // not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }

  return children; // logged in → show the page
}
