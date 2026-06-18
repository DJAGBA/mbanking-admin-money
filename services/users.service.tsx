import axios from '@/lib/axios';
import type {
  UserData,
  CreateUserRequest,
  UpdateUserRequest,
  ListUsersResponse,
  GetUserResponse,
} from '@/src/types/user';

// GET /users - Paginated list
export const getUsers = async (
  page: number = 1,
  limit: number = 20,
  search?: string,
  active?: boolean
) => {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('limit', Math.min(limit, 100).toString());
  if (search) params.append('search', search);
  if (active !== undefined) params.append('active', active.toString());

  const response = await axios.get<ListUsersResponse>(`/users?${params.toString()}`);
  // Returns the full payload { status, data: { items, pagination } } to match the bank pattern
  return response.data;
};

// GET /users/:id - Details
export const getUserById = async (id: string) => {
  const response = await axios.get<GetUserResponse>(`/users/${id}`);
  return response.data.data;
};

// POST /users - Create
export const createUser = async (data: CreateUserRequest) => {
  const response = await axios.post<GetUserResponse>('/users', data);
  return response.data.data;
};

// PUT /users/:id - Update
export const updateUser = async (
  userId: string,
  data: UpdateUserRequest
): Promise<UserData> => {
  const response = await axios.put(`/users/${userId}`, data);
  return response.data.data!;
};

// PATCH /users/:id/activate - Activate
export const activateUser = async (id: string): Promise<UserData> => {
  const response = await axios.patch(`/users/${id}/activate`);
  return response.data.data!;
};

// PATCH /users/:id/deactivate - Deactivate
export const deactivateUser = async (id: string): Promise<UserData> => {
  const response = await axios.patch(`/users/${id}/deactivate`);
  return response.data.data!;
};

// POST /users/:id/reset-password - Reset password
export const resetPassword = async (id: string) => {
  const response = await axios.post(`/users/${id}/reset-password`);
  return response.data;
};

// POST /users/:id/revoke-token - Revoke token
export const revokeTokens = async (id: string) => {
  const response = await axios.post(`/users/${id}/revoke-token`);
  return response.data;
};

// DELETE /users/:id - Delete
export const deleteUser = async (id: string) => {
  const response = await axios.delete(`/users/${id}`);
  return response.data;
};