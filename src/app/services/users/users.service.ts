import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, IUser, IRole } from '../../shared/models/User';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getAllUser(): Observable<ApiResponse<IUser[]>>{
    return this.http.get<ApiResponse<IUser[]>>(`${environment.UrlUser}`)
  }

  getUser(id: string): Observable<ApiResponse<IUser>>{
    return this.http.get<ApiResponse<IUser>>(`${environment.UrlUser}/${id}`)
  }

  getAllRoles(): Observable<ApiResponse<IRole[]>>{
    return this.http.get<ApiResponse<IRole[]>>(`${environment.UrlRoles}`)
  }

  createUser(user: IUser): Observable<ApiResponse<IUser>>{
    return this.http.post<ApiResponse<IUser>>(`${environment.UrlUser}`, user)
  }

  updateUser(id: string, user: IUser){
    return this.http.put<ApiResponse<IUser>>(`${environment.UrlUser}/${id}`, user)
  }

  deleteUser(id: string): Observable<ApiResponse<IUser>>{
    return this.http.delete<ApiResponse<IUser>>(`${environment.UrlUser}/${id}`)
  }

  enableUser(id: string): Observable<ApiResponse<IUser>>{
    return this.http.put<ApiResponse<IUser>>(`${environment.UrlUser}/enable/${id}`, id)
  }

  createGuestUser(): Observable<ApiResponse<IUser>> {
    return this.http.post<ApiResponse<IUser>>(`${environment.UrlInvitado}`, {});
  }
}
