import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private http: HttpClient) { }

  verifyToken(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(environment.UrlverifyToken, { headers });
  }

  logout(): void {
    localStorage.removeItem('TOKEN'); 
  }

  verifyIfIsActive(/*token: string*/): Observable<any> {
    /*const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });*/
    return this.http.get<any>('http://127.0.0.1:8000/api/auth/isactive'/*, { headers }*/);
  }

}
