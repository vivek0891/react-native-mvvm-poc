import type {User} from '../models/User';
import {getJson} from './httpClient';

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

type UsersDto = Array<{
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
}>;

export async function fetchUsers(): Promise<User[]> {
  const dto = await getJson<UsersDto>(USERS_URL);

  // mapping DTO -> domain model
  return dto.map(u => ({
    id: u.id,
    name: u.name,
    email: u.email,
    phone: u.phone,
    website: u.website,
  }));
}