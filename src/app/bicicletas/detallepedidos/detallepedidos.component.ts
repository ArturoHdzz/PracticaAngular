import { Component, OnInit } from '@angular/core';
import { ModelComponent } from '../../shared/ui/model/model.component';
import { DetallepedidoFormComponent } from './detallepedidos-form/detallepedido-form/detallepedido-form.component';
import { CommonModule } from '@angular/common';
import { IDetallePedido } from '../../shared/models/DetallePedido';
import { DetallepedidosService } from '../../services/detallepedidos/detallepedidos.service';
import { ToastrService } from 'ngx-toastr';
import { isNull } from 'util';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';


@Component({
  selector: 'app-detallepedidos',
  standalone: true,
  imports: [ModelComponent, DetallepedidoFormComponent, CommonModule],
  templateUrl: './detallepedidos.component.html',
  styleUrl: './detallepedidos.component.css'
})
export class DetallepedidosComponent implements OnInit{
  isModelOpen = false;
  datos: IDetallePedido[]=[];
  dato:IDetallePedido | null = null;
  roleId: any;

  constructor(private Service: DetallepedidosService, private toastService: ToastrService, private http: HttpClient, private router: Router){}

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

  loadUser(data: IDetallePedido){
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
