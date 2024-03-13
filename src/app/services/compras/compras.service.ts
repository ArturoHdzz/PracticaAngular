import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, ICompra, IUser, IMetodoPago } from '../../shared/models/Campra';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  todos = "http://127.0.0.1:8000/api/auth/compra";
  user = "http://127.0.0.1:8000/api/auth/user";
  metodo_pago = "http://127.0.0.1:8000/api/auth/metodopago";

  constructor(private http: HttpClient) { }

  getAllCompra(): Observable<ApiResponse<ICompra[]>>{
    return this.http.get<ApiResponse<ICompra[]>>(`${this.todos}`)
  }

  getAllMetodoPago(): Observable<ApiResponse<IMetodoPago[]>>{
    return this.http.get<ApiResponse<IMetodoPago[]>>(`${this.metodo_pago}`)
  }

  getAllUser(): Observable<ApiResponse<IUser[]>>{
    return this.http.get<ApiResponse<IUser[]>>(`${this.user}`)
  }

  getCompra(id: string): Observable<ApiResponse<ICompra>>{
    return this.http.get<ApiResponse<ICompra>>(`${this.todos}/${id}`)
  }

  createCompra(compra: ICompra): Observable<ApiResponse<ICompra>>{
    return this.http.post<ApiResponse<ICompra>>(`${this.todos}`, compra)
  }

  updateCompra(id: string, compra: ICompra){
    return this.http.put<ApiResponse<ICompra>>(`${this.todos}/${id}`, compra)
  }

  deleteCompra(id: string): Observable<ApiResponse<ICompra>>{
    return this.http.delete<ApiResponse<ICompra>>(`${this.todos}/${id}`)
  }
}
