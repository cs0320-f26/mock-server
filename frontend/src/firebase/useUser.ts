import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { app } from "./firebaseConfig";

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => onAuthStateChanged(getAuth(app), setUser), []);
  return { isSignedIn: !!user, user };
}
