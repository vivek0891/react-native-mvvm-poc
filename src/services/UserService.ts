import type { User } from "../models/User";
import { getJson } from "./httpClient";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

type UserDto = {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  username?: string;

  address?: {
    street?: string;
    suite?: string;
    city?: string;
    zipcode?: string;
  };

  company?: {
    name?: string;
    catchPhrase?: string;
    bs?: string;
  };
};
export async function fetchUsers(): Promise<User[]> {
  const dto = await getJson<UserDto[]>(USERS_URL);

  // mapping DTO -> domain model
  return dto.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    phone: u.phone,
    website: u.website,
  }));
}

//  fetch detail
export async function fetchUserById(userId: number): Promise<User> {
  const dto = await getJson<UserDto>(`${USERS_URL}/${userId}`);

  // mapping DTO -> domain model
  return {
    id: dto.id,
    name: dto.name,
    email: dto.email,
    phone: dto.phone,
    website: dto.website,
    username: dto.username,
    address: dto.address,
    company: dto.company,
  };
}