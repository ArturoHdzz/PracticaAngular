import { Component, OnInit } from '@angular/core';
import { ModelComponent } from '../../shared/ui/model/model.component';
import { CommonModule } from '@angular/common';
import { ResenaFormComponent } from './resenas-form/resena-form/resena-form.component';
import { IResena } from '../../shared/models/resenas';
import { ResenasService } from '../../services/resenas/resenas.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
  roleId: any;

  constructor(private Service: ResenasService, private toastService: ToastrService, private http: HttpClient, private router: Router){}

  ngOnInit(): void {
    this.roleId = 3;
    this.rolUser();
    this.getAll();
  }

  rolUser(){
    
    this.http.get('http://127.0.0.1:8000/api/auth/roluser', ).subscribe(
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
