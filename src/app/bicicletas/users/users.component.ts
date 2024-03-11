import { Component, OnInit } from '@angular/core';
import { ModelComponent } from '../../shared/ui/model/model.component';
import { UserFormComponent } from './users-form/user-form/user-form.component';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../shared/models/User';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [ModelComponent, UserFormComponent, CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{
  isModelOpen = false;
  users: IUser[]=[];
  user!:IUser;
  constructor(private userService: UsersService, private toastService: ToastrService){}

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser(){
    this.userService.getAllUser().subscribe({
      next:(response)=>{
        this.users = response.data;
      }
    })
  }

  deleteUser(id: string){
    this.userService.deleteUser(id).subscribe({
      next:(response)=>{
        this.toastService.success(response.message);
        this.getAllUser(); 
      }
    })
  }

  loadUser(data: IUser){
    this.user = data;
    this.openModel();
  }

  openModel(){
    this.isModelOpen = true;
  }
  
  closeModel(){
    this.isModelOpen = false;
    this.getAllUser();
  }
}
