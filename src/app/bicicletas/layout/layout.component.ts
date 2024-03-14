import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgIf],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  roleId: any;
  Error: string | null;

  constructor(private http: HttpClient, private router: Router){
     this.Error = null;
     this.roleId = null;
     this.rolUser();
  }

  rolUser(){
    
    this.http.get('http://127.0.0.1:8000/api/auth/roluser', ).subscribe(
      (res: any) => {
        this.roleId = res.role_id;
        console.log(this.roleId)
        this.Error = null;
      },
      (error) => {
        console.log(error)
        this.Error = "El correo o la contraseña son invalidos, porfavor, reviselas bien."
      }
    );
  }

}
