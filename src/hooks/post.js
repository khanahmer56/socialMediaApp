import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { useState } from "react";
import { uuidv4 } from "@firebase/util";
import { toast } from "react-toastify";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";

export function useAddPost() {
  const [isLoading, setIsLoading] = useState(false);
  async function addPost(post) {
    setIsLoading(true);
    const id = uuidv4();
    await setDoc(doc(db, "posts", id), {
      ...post,
      id,
      date: Date.now(),
      likes: [],
    });
    toast("Post added successfully", { type: "success" });
  }
  return { addPost, isLoading };
}

export function useGetPost() {
  const q = query(collection(db, "posts"), orderBy("date", "desc"));
  const [posts, isLoading, error] = useCollectionData(q);
  if (error) throw error;
  return { posts, isLoading };
}

export function useToggleLike({ id, isLiked, uid }) {
  const [isLoading, setLoading] = useState(false);

  async function toggleLike() {
    setLoading(true);
    const docRef = doc(db, "posts", id);
    await updateDoc(docRef, {
      likes: isLiked ? arrayRemove(uid) : arrayUnion(uid),
    });
    setLoading(false);
  }

  return { toggleLike, isLoading };
}
export function useDeletePost(id) {
  const [isLoading, setLoading] = useState(false);

  async function deletePost() {
    const res = window.confirm("Are you sure you want to delete this post?");

    if (res) {
      setLoading(true);

      await deleteDoc(doc(db, "posts", id));

      const q = query(collection(db, "comments"), where("postID", "==", id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => deleteDoc(doc.ref));

      toast("Post deleted successfully", { type: "success" });

      setLoading(false);
    }
  }

  return { deletePost, isLoading };
}

export function usePost(id) {
  console.log(id, "ah");
  const q = doc(db, "posts", id);
  const [post, isLoading] = useDocumentData(q);

  return { post, isLoading };
}

export function usePosts(uid = null) {
  const q = uid
    ? query(
        collection(db, "posts"),
        orderBy("date", "desc"),
        where("uid", "==", uid)
      )
    : query(collection(db, "posts"), orderBy("date", "desc"));
  const [posts, isLoading, error] = useCollectionData(q);
  if (error) throw error;
  return { posts, isLoading };
}
