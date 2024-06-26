import { Component, OnInit } from '@angular/core';
import { ICatalogo } from '../../shared/models/Catalogo';
import { ToastrService } from 'ngx-toastr';
import { ModelComponent } from '../../shared/ui/model/model.component';
import { CatalogoFormComponent } from './catalogos-form/catalogo-form/catalogo-form.component';
import { CommonModule } from '@angular/common';
import { CatalogosService } from '../../services/catalogos/catalogos.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-catalogos',
  standalone: true,
  imports: [ModelComponent, CatalogoFormComponent, CommonModule],
  templateUrl: './catalogos.component.html',
  styleUrl: './catalogos.component.css'
})
export class CatalogosComponent implements OnInit{
  isModelOpen = false;
  catalogos: ICatalogo[]=[];
  catalogo:ICatalogo | null = null;
  roleId: any;
  showAlert: boolean = false;

  constructor(private CatalogoService: CatalogosService, private toastService: ToastrService, private http: HttpClient, private router: Router){

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

  ngOnInit(): void {
    this.roleId = 3;
    this.rolUser();
    this.connectToSSE();
    this.getAllCatalogo();
  }

  getAllCatalogo(){
    this.CatalogoService.getAllCatalogo().subscribe({
      next: (response) => {
        this.catalogos = response.data;
      },
      error: (error) => {
        if (error.status === 403) {
          this.router.navigate(['/login']);
        }
      }
    });
  }

  connectToSSE(): void {
    const eventSource = new EventSource('http://127.0.0.1:8000/api/sse');

    eventSource.onmessage = (event) => {
      console.log(event.data);

      if (event.data === "true") {
        console.log('Se ha actualizado la tabla');
        this.toastService.success('Se ha actualizado la tabla');
        this.getAllCatalogo();
      }
    };
  }

  deleteUser(id: string) {
    console.log("Deleting user with ID:", id);
    if (confirm("¿Estás seguro de eliminar este usuario?")) {
      this.CatalogoService.deleteCatalogo(id).subscribe({
        next: (response) => {
          this.getAllCatalogo();
        },
        error: (error) => {
          this.toastService.error(error.message);
        },
      });
    }
  }

  loadUser(data: ICatalogo){
    this.catalogo = data;
    this.openModel();
  }

  openModel(){
    this.isModelOpen = true;
  }
  
  closeModel(){

    this.catalogo = null
    this.isModelOpen = false;
    this.getAllCatalogo();
  }
}
