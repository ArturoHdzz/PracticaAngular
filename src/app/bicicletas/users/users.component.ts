import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  @Output() onCloseModel = new EventEmitter();

  constructor(private fb: FormBuilder){}

  onClose(){
    this.onCloseModel.emit(false);
  }
}
export interface ApiResponse<T>{
  message?: string;
  data: T;
}
export interface IUser{
  _id?: string;
  name: string;
  email: string;

}
