import { useCallback, useMemo, useState } from "react";
import type { User } from "../models/User";
import { fetchUsers } from "../services/UserService";

type Status = "idle" | "loading" | "success" | "error";

const PAGE_SIZE = 5;

export function useUsersViewModel() {
  const [status, setStatus] = useState<Status>("idle");
  const [users, setUsers] = useState<User[]>([]);
  const [query, setQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const load = useCallback(async () => {
    setStatus("loading");
    setErrorMessage("");

    try {
      const data = await fetchUsers();
      setUsers(data);
      setVisibleCount(PAGE_SIZE);
      setStatus("success");
    } catch (e: any) {
      setStatus("error");
      setErrorMessage(e?.message ?? "Something went wrong");
    }
  }, []);

  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    setErrorMessage("");

    try {
      const data = await fetchUsers();
      setUsers(data);
      setVisibleCount(PAGE_SIZE);
      setStatus("success");
    } catch (e: any) {
      setStatus("error");
      setErrorMessage(e?.message ?? "Something went wrong");
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  const onChangeQuery = useCallback((text: string) => {
    setQuery(text);
    setVisibleCount(PAGE_SIZE);
  }, []);

  const filteredUsers = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) return users;

    return users.filter((u) => {
      return (
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
      );
    });
  }, [query, users]);

  const displayedUsers = useMemo(() => {
    return filteredUsers.slice(0, visibleCount);
  }, [filteredUsers, visibleCount]);

  const hasMore = displayedUsers.length < filteredUsers.length;

  const loadMore = useCallback(() => {
    if (isLoadingMore || !hasMore || status === "loading") {
      return;
    }

    setIsLoadingMore(true);

    setTimeout(() => {
      setVisibleCount((prev) => prev + PAGE_SIZE);
      setIsLoadingMore(false);
    }, 300);
  }, [hasMore, isLoadingMore, status]);

  return {
    status,
    isLoading: status === "loading",
    isError: status === "error",
    errorMessage,

    users,
    filteredUsers,
    displayedUsers,

    query,

    isRefreshing,
    isLoadingMore,
    hasMore,

    setQuery: onChangeQuery,
    load,
    refresh,
    loadMore,
  };
}