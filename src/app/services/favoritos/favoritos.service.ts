import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, IFavorito, IModelo, IUser } from '../../shared/models/Favorito';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<ApiResponse<IFavorito[]>>{
    return this.http.get<ApiResponse<IFavorito[]>>(`${environment.Urlfavorito}`)
  }

  getModelos(): Observable<ApiResponse<IModelo[]>>{
    return this.http.get<ApiResponse<IModelo[]>>(`${environment.UrlModelo}`)
  }

  getUsers(): Observable<ApiResponse<IUser[]>>{
    return this.http.get<ApiResponse<IUser[]>>(`${environment.UrlUser}`)
  }

  get(id: string): Observable<ApiResponse<IFavorito>>{
    return this.http.get<ApiResponse<IFavorito>>(`${environment.Urlfavorito}/${id}`)
  }

  create(datos: IFavorito): Observable<ApiResponse<IFavorito>>{
    return this.http.post<ApiResponse<IFavorito>>(`${environment.Urlfavorito}`, datos)
  }

  update(id: string, datos: IFavorito){
    return this.http.put<ApiResponse<IFavorito>>(`${environment.Urlfavorito}/${id}`, datos)
  }

  delete(id: string): Observable<ApiResponse<IFavorito>>{
    return this.http.delete<ApiResponse<IFavorito>>(`${environment.Urlfavorito}/${id}`)
  }
}
