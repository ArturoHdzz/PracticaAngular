import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, Ilogs } from '../../shared/models/log';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<ApiResponse<Ilogs[]>>{
    return this.http.get<ApiResponse<Ilogs[]>>(`${environment.UrlLog}`)
  }
}
