import { Component, OnInit } from '@angular/core';
import { ModelComponent } from '../../shared/ui/model/model.component';
import { CommonModule } from '@angular/common';
import { IDetalleCompra } from '../../shared/models/DetalleCompra';
import { DetallecomprasService } from '../../services/detallecompras/detallecompras.service';
import { ToastrService } from 'ngx-toastr';
import { DetallecompraFormComponent } from './detallecompras-form/detallecompra-form/detallecompra-form.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-detallecompras',
  standalone: true,
  imports: [ModelComponent, DetallecompraFormComponent, CommonModule],
  templateUrl: './detallecompras.component.html',
  styleUrl: './detallecompras.component.css'
})
export class DetallecomprasComponent implements OnInit{
  isModelOpen = false;
  detalleCompras: IDetalleCompra[]=[];
  detalleCompra:IDetalleCompra | null = null;
  roleId: any;

  constructor(private DetallecomprasService: DetallecomprasService, private toastService: ToastrService, private http: HttpClient){}

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

  ngOnInit(): void {
    this.roleId = 3;
    this.rolUser();
    this.getAll();
  }

  getAll(){
    this.DetallecomprasService.getAll().subscribe({
      next:(response)=>{
        this.detalleCompras = response.data;
      }
    })
  }

  deleteUser(id: string) {
    console.log("Deleting user with ID:", id);
    if (confirm("¿Estás seguro de eliminar este usuario?")) {
      this.DetallecomprasService.delete(id).subscribe({
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

  loadUser(data: IDetalleCompra){
    this.detalleCompra = data;
    this.openModel();
  }

  openModel(){
    this.isModelOpen = true;
  }
  
  closeModel(){
    this.detalleCompra = null
    this.isModelOpen = false;
    this.getAll();
  }
}
