import { Component, OnInit } from '@angular/core';
import { ModelComponent } from '../../shared/ui/model/model.component';
import { CommonModule } from '@angular/common';
import { ResenaFormComponent } from './resenas-form/resena-form/resena-form.component';
import { IResena } from '../../shared/models/resenas';
import { ResenasService } from '../../services/resenas/resenas.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-resenas',
  standalone: true,
  imports: [ModelComponent, ResenaFormComponent, CommonModule],
  templateUrl: './resenas.component.html',
  styleUrl: './resenas.component.css'
})
export class ResenasComponent implements OnInit{
  isModelOpen = false;
  datos: IResena[]=[];
  dato:IResena | null = null;
  constructor(private Service: ResenasService, private toastService: ToastrService){}

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

  loadUser(data: IResena){
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
