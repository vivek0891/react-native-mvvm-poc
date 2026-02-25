import { useCallback, useState } from "react";
import type { User } from "../models/User";
import { fetchUserById } from "../services/UserService";

type Status = "idle" | "loading" | "success" | "error";

export function useUserDetailViewModel() {
  const [status, setStatus] = useState<Status>("idle");
  const [user, setUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const load = useCallback(async (userId: number) => {
    setStatus("loading");
    setErrorMessage("");

    try {
      const data = await fetchUserById(userId);
      setUser(data);
      setStatus("success");
    } catch (e: any) {
      setStatus("error");
      setErrorMessage(e?.message ?? "Something went wrong");
    }
  }, []);

  return {
    status,
    user,
    errorMessage,
    load,
    isLoading: status === "loading",
    isError: status === "error",
  };
}