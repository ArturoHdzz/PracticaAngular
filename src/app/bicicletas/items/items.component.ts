import { Component, OnInit, OnDestroy } from '@angular/core';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { ItemFormComponent } from './items-form/item-form/item-form.component';
import { ModelComponent } from '../../shared/ui/model/model.component';
import { CommonModule } from '@angular/common';
import { IItem } from '../../shared/models/Item';
import { ItemsService } from '../../services/items/items.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [ModelComponent, ItemFormComponent, CommonModule],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})
export class ItemsComponent implements OnInit, OnDestroy {
  isModelOpen = false;
  datos: IItem[] = [];
  dato:IItem | null = null;
  roleId: any;
  echo: any;

  constructor(private Service: ItemsService, private toastService: ToastrService, private http: HttpClient){}

  ngOnInit(): void {
    this.roleId = 3;
    this.rolUser();
    this.getAll();
    this.websocket();
  }

  ngOnDestroy(): void {
    this.closewebsocket();
  }

  closewebsocket(){
    if(this.echo){
      this.echo.disconnect();
    }
  }

  websocket(){
    (window as any).Pusher = Pusher;
    this.echo = new Echo({
      broadcaster: 'pusher',
      key: 'ASD1234FG',
      cluster: 'mt1',
      encrypted: true,
      wsHost: window.location.hostname,
      wsPort: 6001,
      forceTLS: false,
      disableStatus:true
    });

    this.echo.channel('items')
      .listen('.item.created', (e: any) => {
        console.log(e.item);
        this.datos = e.item;
      });
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
        //this.datos = response.data;
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
    this.dato = null;
    this.isModelOpen = false;
    this.getAll();
  }
}