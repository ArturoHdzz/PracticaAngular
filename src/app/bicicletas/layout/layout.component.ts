import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { TokenService } from '../../services/token.service';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgIf],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  roleId: any;

  constructor(private http: HttpClient, private router: Router, private TokenService: TokenService) {
    this.roleId = 3;
     this.rolUser();
  }

  logout(): void {
    this.TokenService.logout();
  }

  rolUser(){
    
    this.http.get(environment.UrlRolUser, ).subscribe(
      (res: any) => {
        this.roleId = res.role_id;
      },
      (error) => {
        console.log(error)
      }
    );
  }

}
