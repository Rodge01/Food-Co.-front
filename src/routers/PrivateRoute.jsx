import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const  PrivateRoute = ({children}) => {
    const {currentUser, loading} = useAuth();0
    if(loading){
        return <div>Loading...</div>
    }
    if(currentUser){
        return children;
    }
   return <Navigate to="/login" replace/> 
}

export default PrivateRoute;