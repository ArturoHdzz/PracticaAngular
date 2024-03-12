import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, IUser } from '../../shared/models/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  todos = "http://127.0.0.1:8000/api/auth/user";
  uno = "http://127.0.0.1:8000/api/auth/user";
  crear = "http://127.0.0.1:8000/api/auth/user";
  actualizar = "http://127.0.0.1:8000/api/auth/user";
  eliminar = "http://127.0.0.1:8000/api/auth/user";

  constructor(private http: HttpClient) { }

  getAllUser(): Observable<ApiResponse<IUser[]>>{
    return this.http.get<ApiResponse<IUser[]>>(`${this.todos}`)
  }

  getUser(id: string): Observable<ApiResponse<IUser>>{
    return this.http.get<ApiResponse<IUser>>(`${this.uno}/${id}`)
  }

  createUser(user: IUser): Observable<ApiResponse<IUser>>{
    return this.http.post<ApiResponse<IUser>>(`${this.crear}`, user)
  }

  updateUser(id: string, user: IUser){
    return this.http.put<ApiResponse<IUser>>(`${this.actualizar}/${id}`, user)
  }

  deleteUser(id: string): Observable<ApiResponse<IUser>>{
    return this.http.delete<ApiResponse<IUser>>(`${this.eliminar}/${id}`)
  }
}
