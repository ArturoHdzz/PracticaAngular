import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, IUser } from '../bicicletas/users/users.component';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiurl = "";

  constructor(private http: HttpClient) { }

  getAllUser(): Observable<ApiResponse<IUser[]>>{
    return this.http.get<ApiResponse<IUser[]>>(`${this.apiurl}`)
  }

  getUser(id: string): Observable<ApiResponse<IUser>>{
    return this.http.get<ApiResponse<IUser>>(`${this.apiurl}/${id}`)
  }

  createUser(user: IUser): Observable<ApiResponse<IUser>>{
    return this.http.post<ApiResponse<IUser>>(`${this.apiurl}`, user)
  }

  updateUser(id: string, user: IUser){
    return this.http.put<ApiResponse<IUser>>(`${this.apiurl}/${id}`, user)
  }

  deleteUser(id: string): Observable<any>{
    return this.http.delete(`${this.apiurl}/${id}`)
  }
}
