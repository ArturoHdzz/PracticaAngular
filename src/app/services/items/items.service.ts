import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, IItem, ICatalogo } from '../../shared/models/Item';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<ApiResponse<IItem[]>>{
    return this.http.get<ApiResponse<IItem[]>>(`${environment.UrlItem}`)
  }

  getAllCatalogos(): Observable<ApiResponse<ICatalogo[]>>{
    return this.http.get<ApiResponse<ICatalogo[]>>(`${environment.UrlCatalogo}`)
  }


  get(id: string): Observable<ApiResponse<IItem>>{
    return this.http.get<ApiResponse<IItem>>(`${environment.UrlItem}/${id}`)
  }

  create(datos: IItem): Observable<ApiResponse<IItem>>{
    return this.http.post<ApiResponse<IItem>>(`${environment.UrlItem}`, datos)
  }

  update(id: string, datos: IItem){
    return this.http.put<ApiResponse<IItem>>(`${environment.UrlItem}/${id}`, datos)
  }

  delete(id: string): Observable<ApiResponse<IItem>>{
    return this.http.delete<ApiResponse<IItem>>(`${environment.UrlItem}/${id}`)
  }
}
