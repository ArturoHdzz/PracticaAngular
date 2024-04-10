import { Component, OnInit } from '@angular/core';
import { MetodopagoFormComponent } from './metodopagos-form/metodopago-form/metodopago-form.component';
import { ModelComponent } from '../../shared/ui/model/model.component';
import { CommonModule } from '@angular/common';
import { IMetodoPago } from '../../shared/models/MetodoPago';
import { MetodopagosService } from '../../services/metodopagos/metodopagos.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-metodopagos',
  standalone: true,
  imports: [ModelComponent, MetodopagoFormComponent, CommonModule],
  templateUrl: './metodopagos.component.html',
  styleUrl: './metodopagos.component.css'
})
export class MetodopagosComponent implements OnInit {
  isModelOpen = false;
  datos: IMetodoPago[]=[];
  dato:IMetodoPago | null = null;
  roleId: any;

  constructor(private Service: MetodopagosService, private toastService: ToastrService, private http: HttpClient, private router: Router){}

  ngOnInit(): void {
    this.roleId = 3;
    this.rolUser();
    this.getAll();
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

  getAll(){
    this.Service.getAll().subscribe({
      next:(response)=>{
        this.datos = response.data;
      },
      error: (error) => {
        if (error.status === 403) {
          this.router.navigate(['/login']);
        }
      }
      });
  }



  deleteUser(id: string) {
    console.log("Deleting user with ID:", id);
    if (confirm("¿Estás seguro de eliminar este usuario?")) {
      this.Service.delete(id).subscribe({
        next: (response) => {
          this.toastService.success(response.message);
          this.getAll();
        },
        error: (error) => {
          this.toastService.error(error.message);
        },
      });
    }
  }

  loadUser(data: IMetodoPago){
    this.dato = data;
    this.openModel();
  }

  openModel(){
    this.isModelOpen = true;
  }
  
  closeModel(){
    this.dato = null
    this.isModelOpen = false;
    this.getAll();
  }
}
