import { Component, OnInit } from '@angular/core';
import { ItemFormComponent } from './items-form/item-form/item-form.component';
import { ModelComponent } from '../../shared/ui/model/model.component';
import { CommonModule } from '@angular/common';
import { IItem } from '../../shared/models/Item';
import { ItemsService } from '../../services/items/items.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [ModelComponent, ItemFormComponent, CommonModule],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})
export class ItemsComponent implements OnInit {
  isModelOpen = false;
  datos: IItem[]=[];
  dato!:IItem;
  constructor(private Service: ItemsService, private toastService: ToastrService){}

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

  loadUser(data: IItem){
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
