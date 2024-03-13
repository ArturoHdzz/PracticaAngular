import { Component, OnInit } from '@angular/core';
import { MetodopagoFormComponent } from './metodopagos-form/metodopago-form/metodopago-form.component';
import { ModelComponent } from '../../shared/ui/model/model.component';
import { CommonModule } from '@angular/common';
import { IMetodoPago } from '../../shared/models/MetodoPago';
import { MetodopagosService } from '../../services/metodopagos/metodopagos.service';
import { ToastrService } from 'ngx-toastr';

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
  dato!:IMetodoPago;
  constructor(private Service: MetodopagosService, private toastService: ToastrService){}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.Service.getAll().subscribe({
      next:(response)=>{
        this.datos = response.data;
      }
    })
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
    this.isModelOpen = false;
    this.getAll();
  }
}
