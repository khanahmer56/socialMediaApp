import {
  collection,
  deleteDoc,
  doc,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { db } from "../lib/firebase";
import { uuidv4 } from "@firebase/util";
import { toast } from "react-toastify";
import { useCollectionData } from "react-firebase-hooks/firestore";
export function useAddComment({ postID, uid }) {
  const [isLoading, setLoading] = useState(false);

  async function addComment(text) {
    setLoading(true);
    const id = uuidv4();
    const date = Date.now();
    const docRef = doc(db, "comments", id);
    await setDoc(docRef, { text, id, postID, date, uid });

    toast("Comment added successfully", { type: "success" });

    setLoading(false);
  }

  return { addComment, isLoading };
}
export function useComments(postID) {
  console.log(postID, "postid");
  const q = query(
    collection(db, "comments"),
    postID && where("postID", "==", postID),
    orderBy("date", "desc")
  );
  const [comments, isLoading, error] = useCollectionData(q);
  if (error) throw error;

  return { comments, isLoading };
}

export function useDeleteComment(id) {
  const [isLoading, setLoading] = useState(false);

  async function deleteComment() {
    const res = window.confirm("Are you sure you want to delete this comment?");

    if (res) {
      setLoading(true);
      const docRef = doc(db, "comments", id);
      await deleteDoc(docRef);
      toast("Comment deleted successfully", { type: "success" });
      setLoading(false);
    }
  }

  return { deleteComment, isLoading };
}
