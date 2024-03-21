import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, IResena, IModelo, IUser } from '../../shared/models/resenas';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ResenasService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<ApiResponse<IResena[]>>{
    return this.http.get<ApiResponse<IResena[]>>(`${environment.UrlResena}`)
  }

  getModelos(): Observable<ApiResponse<IModelo[]>>{
    return this.http.get<ApiResponse<IModelo[]>>(`${environment.UrlModelo}`)
  }

  getUsers(): Observable<ApiResponse<IUser[]>>{
    return this.http.get<ApiResponse<IUser[]>>(`${environment.UrlUser}`)
  }

  get(id: string): Observable<ApiResponse<IResena>>{
    return this.http.get<ApiResponse<IResena>>(`${environment.UrlResena}/${id}`)
  }

  create(datos: IResena): Observable<ApiResponse<IResena>>{
    return this.http.post<ApiResponse<IResena>>(`${environment.UrlResena}`, datos)
  }

  update(id: string, datos: IResena){
    return this.http.put<ApiResponse<IResena>>(`${environment.UrlResena}/${id}`, datos)
  }

  delete(id: string): Observable<ApiResponse<IResena>>{
    return this.http.delete<ApiResponse<IResena>>(`${environment.UrlResena}/${id}`)
  }
}
