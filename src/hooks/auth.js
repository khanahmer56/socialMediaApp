import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth, db } from "../lib/firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import isUsernameExists from "../utils/isusernameexist";

export function useAuth() {
  const [authUser, authLoading, error] = useAuthState(auth);
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const ref = doc(db, "users", authUser.uid);
      const docSnap = await getDoc(ref);
      console.log(docSnap.data());
      setUser(docSnap.data());
      setLoading(false);
    }

    if (!authLoading) {
      if (authUser) fetchData();
      else setLoading(false); // Not signed in
    }
  }, [authLoading]);

  return { user, isLoading, error };
}

export function useLogin() {
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function login({ email, password }) {
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login Success");
      navigate("/protected/dashboard");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  return { login, isLoading };
}
export function useLogout() {
  const [signOut, isLoading, error] = useSignOut(auth);
  const navigate = useNavigate();
  async function logout() {
    if (await signOut()) {
      toast.success("Logout Success");
      navigate("/login");
    }
  }
  return { logout };
}
export function useRegister() {
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function registers({ username, email, password }) {
    setLoading(true);

    const usernameExists = await isUsernameExists(username);

    if (usernameExists) {
      toast({
        title: "Username already taken",
        description: "Please try another username",
        status: "error",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
      setLoading(false);
    } else {
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);

        await setDoc(doc(db, "users", res.user.uid), {
          id: res.user.uid,
          username: username.toLowerCase(),
          avatar: "",
          date: Date.now(),
        });

        toast("Account Created");

        navigate("/login");
      } catch (error) {
        toast({
          title: "Signing Up failed",
          description: error.message,
          status: "error",
          isClosable: true,
          position: "top",
          duration: 5000,
        });
      } finally {
        setLoading(false);
      }
    }
  }

  return { registers, isLoading };
}
