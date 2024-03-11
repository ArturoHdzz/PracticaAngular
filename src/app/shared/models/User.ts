export interface ApiResponse<T>{
    message?: string;
    data: T;
  }
  export interface IUser{
    _id?: string;
    name: string;
    email: string;
    password: string;
    role_id: string;
  }