import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, ICatalogo } from '../../shared/models/Catalogo';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {

  todos = "http://127.0.0.1:8000/api/auth/catalogo";

  constructor(private http: HttpClient) { }

  getAllCatalogo(): Observable<ApiResponse<ICatalogo[]>>{
    return this.http.get<ApiResponse<ICatalogo[]>>(`${this.todos}`)
  }

  getCatalogo(id: string): Observable<ApiResponse<ICatalogo>>{
    return this.http.get<ApiResponse<ICatalogo>>(`${this.todos}/${id}`)
  }

  createCatalogo(catalogo: ICatalogo): Observable<ApiResponse<ICatalogo>>{
    return this.http.post<ApiResponse<ICatalogo>>(`${this.todos}`, catalogo)
  }

  updateCatalogo(id: string, catalogo: ICatalogo){
    return this.http.put<ApiResponse<ICatalogo>>(`${this.todos}/${id}`, catalogo)
  }

  deleteCatalogo(id: string): Observable<ApiResponse<ICatalogo>>{
    return this.http.delete<ApiResponse<ICatalogo>>(`${this.todos}/${id}`)
  }
}
