import { Injectable } from '@angular/core';
import { ApiResponse, IDetalleCompra, ICompra, IModelo } from '../../shared/models/DetalleCompra';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DetallecomprasService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<ApiResponse<IDetalleCompra[]>>{
    return this.http.get<ApiResponse<IDetalleCompra[]>>(`${environment.UrlDetallecompra}`)
  }

  getAllCompras(): Observable<ApiResponse<ICompra[]>>{
    return this.http.get<ApiResponse<ICompra[]>>(`${environment.UrlCompras}`)
  }

  getAllModelos(): Observable<ApiResponse<IModelo[]>>{
    return this.http.get<ApiResponse<IModelo[]>>(`${environment.UrlModelo}`)
  }

  get(id: string): Observable<ApiResponse<IDetalleCompra>>{
    return this.http.get<ApiResponse<IDetalleCompra>>(`${environment.UrlDetallecompra}/${id}`)
  }

  create(detalleCompra: IDetalleCompra): Observable<ApiResponse<IDetalleCompra>>{
    return this.http.post<ApiResponse<IDetalleCompra>>(`${environment.UrlDetallecompra}`, detalleCompra)
  }

  update(id: string, detalleCompra: IDetalleCompra){
    return this.http.put<ApiResponse<IDetalleCompra>>(`${environment.UrlDetallecompra}/${id}`, detalleCompra)
  }

  delete(id: string): Observable<ApiResponse<IDetalleCompra>>{
    return this.http.delete<ApiResponse<IDetalleCompra>>(`${environment.UrlDetallecompra}/${id}`)
  }
}
