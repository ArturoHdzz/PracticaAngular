export interface ApiResponse<T>{
    message?: string;
    data: T;
  }

export interface IRole{
    id?: string;
    name: string;
    created_at?: string;
    updated_at?: string;
  }

  export interface IUser {
    id?: string;
    name: string;
    email: string;
    password: string;
    role: IRole;
  }