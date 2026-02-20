import {useCallback, useMemo, useState} from 'react';
import type {User} from '../models/User';
import {fetchUsers} from '../services/UserService';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function useUsersViewModel() {
  const [status, setStatus] = useState<Status>('idle');
  const [users, setUsers] = useState<User[]>([]);
  const [query, setQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const load = useCallback(async () => {
    setStatus('loading');
    setErrorMessage('');
    try {
      const data = await fetchUsers();
      setUsers(data);
      setStatus('success');
    } catch (e: any) {
      setStatus('error');
      setErrorMessage(e?.message ?? 'Something went wrong');
    }
  }, []);

  const filteredUsers = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter(u =>
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q)
    );
  }, [query, users]);

  return {
  // state
  status,
  isLoading: status === 'loading',
  isError: status === 'error',
  errorMessage,

  users,          // ✅ raw
  filteredUsers,  // ✅ filtered

  query,

  // actions
  setQuery,
  load,
  refresh: load,
};
}