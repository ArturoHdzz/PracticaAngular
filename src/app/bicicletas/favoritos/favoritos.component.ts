import { Component, OnInit } from '@angular/core';
import { FavoritoFormComponent } from './favoritos-form/favorito-form/favorito-form.component';
import { ModelComponent } from '../../shared/ui/model/model.component';
import { CommonModule } from '@angular/common';
import { IFavorito } from '../../shared/models/Favorito';
import { FavoritosService } from '../../services/favoritos/favoritos.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [ModelComponent, FavoritoFormComponent, CommonModule],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.css'
})
export class FavoritosComponent implements OnInit {
  isModelOpen = false;
  datos: IFavorito[]=[];
  dato!:IFavorito;
  constructor(private Service: FavoritosService, private toastService: ToastrService){}

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

  loadUser(data: IFavorito){
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
