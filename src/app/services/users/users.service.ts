import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, IUser, IRole } from '../../shared/models/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  todos = "http://127.0.0.1:8000/api/auth/user";
  roles = "http://127.0.0.1:8000/api/auth/user/roles";
  uno = "http://127.0.0.1:8000/api/auth/user";
  crear = "http://127.0.0.1:8000/api/auth/user";
  actualizar = "http://127.0.0.1:8000/api/auth/user";
  eliminar = "http://127.0.0.1:8000/api/auth/user";
  invitado = "http://127.0.0.1:8000/api/auth/usergest";

  constructor(private http: HttpClient) { }

  getAllUser(): Observable<ApiResponse<IUser[]>>{
    return this.http.get<ApiResponse<IUser[]>>(`${this.todos}`)
  }

  getUser(id: string): Observable<ApiResponse<IUser>>{
    return this.http.get<ApiResponse<IUser>>(`${this.uno}/${id}`)
  }

  getAllRoles(): Observable<ApiResponse<IRole[]>>{
    return this.http.get<ApiResponse<IRole[]>>(`${this.roles}`)
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

  createGuestUser(): Observable<ApiResponse<IUser>> {
    return this.http.post<ApiResponse<IUser>>(`${this.invitado}`, {});
  }
}
