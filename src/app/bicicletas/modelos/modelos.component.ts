import { Component, OnInit } from '@angular/core';
import { ModelComponent } from '../../shared/ui/model/model.component';
import { CommonModule } from '@angular/common';
import { ModeloFormComponent } from './modelos-form/modelo-form/modelo-form.component';
import { IModelo } from '../../shared/models/Modelo';
import { ModelosService } from '../../services/modelos/modelos.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modelos',
  standalone: true,
  imports: [ModelComponent, ModeloFormComponent, CommonModule],
  templateUrl: './modelos.component.html',
  styleUrl: './modelos.component.css'
})
export class ModelosComponent implements OnInit {
  isModelOpen = false;
  datos: IModelo[]=[];
  dato!:IModelo;
  constructor(private Service: ModelosService, private toastService: ToastrService){}

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

  loadUser(data: IModelo){
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
