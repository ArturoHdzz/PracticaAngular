import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, ICompra } from '../../shared/models/Campra';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  todos = "http://127.0.0.1:8000/api/auth/compra";

  constructor(private http: HttpClient) { }

  getAllUser(): Observable<ApiResponse<ICompra[]>>{
    return this.http.get<ApiResponse<ICompra[]>>(`${this.todos}`)
  }

  getUser(id: string): Observable<ApiResponse<ICompra>>{
    return this.http.get<ApiResponse<ICompra>>(`${this.todos}/${id}`)
  }

  createUser(compra: ICompra): Observable<ApiResponse<ICompra>>{
    return this.http.post<ApiResponse<ICompra>>(`${this.todos}`, compra)
  }

  updateUser(id: string, compra: ICompra){
    return this.http.put<ApiResponse<ICompra>>(`${this.todos}/${id}`, compra)
  }

  deleteUser(id: string): Observable<ApiResponse<ICompra>>{
    return this.http.delete<ApiResponse<ICompra>>(`${this.todos}/${id}`)
  }
}
