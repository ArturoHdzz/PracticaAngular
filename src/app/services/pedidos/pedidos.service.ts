import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, IPedido, IUser, IMetodoPago } from '../../shared/models/Pedido';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<ApiResponse<IPedido[]>>{
    return this.http.get<ApiResponse<IPedido[]>>(`${environment.UrlPedido}`)
  }

  getAllUsers(): Observable<ApiResponse<IUser[]>>{
    return this.http.get<ApiResponse<IUser[]>>(`${environment.UrlUser}`)
  }

  getAllMetodos(): Observable<ApiResponse<IMetodoPago[]>>{
    return this.http.get<ApiResponse<IMetodoPago[]>>(`${environment.UrlMetodopago}`)
  }
  
  get(id: string): Observable<ApiResponse<IPedido>>{
    return this.http.get<ApiResponse<IPedido>>(`${environment.UrlPedido}/${id}`)
  }

  create(datos: IPedido): Observable<ApiResponse<IPedido>>{
    return this.http.post<ApiResponse<IPedido>>(`${environment.UrlPedido}`, datos)
  }

  update(id: string, datos: IPedido){
    return this.http.put<ApiResponse<IPedido>>(`${environment.UrlPedido}/${id}`, datos)
  }

  delete(id: string): Observable<ApiResponse<IPedido>>{
    return this.http.delete<ApiResponse<IPedido>>(`${environment.UrlPedido}/${id}`)
  }
}
