import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, ICatalogo } from '../../shared/models/Catalogo';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {

  constructor(private http: HttpClient) { }

  getAllCatalogo(): Observable<ApiResponse<ICatalogo[]>>{
    return this.http.get<ApiResponse<ICatalogo[]>>(`${environment.UrlCatalogo}`)
  }

  getCatalogo(id: string): Observable<ApiResponse<ICatalogo>>{
    return this.http.get<ApiResponse<ICatalogo>>(`${environment.UrlCatalogo}/${id}`)
  }

  createCatalogo(catalogo: ICatalogo): Observable<ApiResponse<ICatalogo>>{
    return this.http.post<ApiResponse<ICatalogo>>(`${environment.UrlCatalogo}`, catalogo)
  }

  updateCatalogo(id: string, catalogo: ICatalogo){
    return this.http.put<ApiResponse<ICatalogo>>(`${environment.UrlCatalogo}/${id}`, catalogo)
  }

  deleteCatalogo(id: string): Observable<ApiResponse<ICatalogo>>{
    return this.http.delete<ApiResponse<ICatalogo>>(`${environment.UrlCatalogo}/${id}`)
  }
}
