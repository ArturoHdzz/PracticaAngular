export interface ApiResponse<T>{
    message?: string;
    data: T;
  }

export interface IUser{
  id?: string;
  name: string;
  email: string;
  is_active: string;
  role_id: string;
  created_at: string;
  updated_at: string;
}

export interface Ilogs{
    id?: string;
    route: string;
    method: string;
    values: string;
    user_id: string;
    updated_at: string;
    created_at: string;
    user: IUser;
  }