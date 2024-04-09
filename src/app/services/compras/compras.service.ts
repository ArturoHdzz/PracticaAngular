import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, ICompra, IUser, IMetodoPago } from '../../shared/models/Campra';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  constructor(private http: HttpClient) { }

  getAllCompra(): Observable<ApiResponse<ICompra[]>>{
    return this.http.get<ApiResponse<ICompra[]>>(`${environment.UrlCompras}`)
  }

  getAllMetodoPago(): Observable<ApiResponse<IMetodoPago[]>>{
    return this.http.get<ApiResponse<IMetodoPago[]>>(`${environment.UrlMetodopago}`)
  }

  getAllUser(): Observable<ApiResponse<IUser[]>>{
    return this.http.get<ApiResponse<IUser[]>>(`${environment.UrlUser}`)
  }

  getCompra(id: string): Observable<ApiResponse<ICompra>>{
    return this.http.get<ApiResponse<ICompra>>(`${environment.UrlCompras}/${id}`)
  }

  createCompra(compra: ICompra): Observable<ApiResponse<ICompra>>{
    return this.http.post<ApiResponse<ICompra>>(`${environment.UrlCompras}`, compra)
  }

  updateCompra(id: string, compra: ICompra){
    return this.http.put<ApiResponse<ICompra>>(`${environment.UrlCompras}/${id}`, compra)
  }

  deleteCompra(id: string): Observable<ApiResponse<ICompra>>{
    return this.http.delete<ApiResponse<ICompra>>(`${environment.UrlCompras}/${id}`)
  }
}
