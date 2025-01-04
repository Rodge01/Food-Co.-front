import { createContext, useContext, useEffect, useState} from "react";
import { auth } from "../../firebase/firebase.config";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

const AuthContext  = createContext();
export const useAuth = () =>{
    return useContext(AuthContext)
}

//provider
const googleProvider = new GoogleAuthProvider();

export const AuthProvide = ({children})=>{
   const [currentUser, setCurrentUser] = useState(null);
   const [loading, setLoading] = useState(true);

    const registerUser = async (email,password) =>{
        return await createUserWithEmailAndPassword(auth, email, password)
    }

    //login 
    const loginUser = async (email,password) =>{
        return await signInWithEmailAndPassword(auth, email, password)
    }
    //sign in using google
    const SingInWithGoogle = async () => {
        return await signInWithPopup(auth, googleProvider)
    }
    //logout
    const logout = () =>{
        return signOut(auth)
    }

    //manage user
    useEffect(() =>{
        const unsubcribe = onAuthStateChanged(auth, (user)=>{
            setCurrentUser(user);
            setLoading(false);
            if(user){
                const{email, displayname, photoURL} = user;
                const userData = {
                    email, username: displayname, photo: photoURL
                }
            }
        })
        return() => unsubcribe();
    }, [])
    const value= {
        currentUser,
        loading,
        registerUser,
        loginUser,
        SingInWithGoogle,
        logout
 }
    
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}