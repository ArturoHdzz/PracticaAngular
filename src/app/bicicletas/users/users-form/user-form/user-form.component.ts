import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../../../services/users.service';
import { IUser } from '../../../../shared/models/User';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnChanges {
  @Input() data: IUser | null = null;
  @Output() onCloseModel = new EventEmitter();
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UsersService, private toastService: ToastrService){
    this.userForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      role_id: new FormControl('', [Validators.required]),
    });
  }

  ngOnChanges(): void {
    if(this.data){
      this.userForm.patchValue({
        name: this.data?.name,
        email: this.data?.email,
        role_id: this.data?.role_id,
      });
    }
  }

  onClose(){
    this.onCloseModel.emit(false);
  }

  onSubmit(){
    if(this.userForm.valid){
      if(this.data){
        this.userService.updateUser(this.data._id as string, this.userForm.value).subscribe({
          next:(response)=>{
            this.toastService.success(response.message)
            this.onClose();
          }
        }); 
      }else{
        this.userService.createUser(this.userForm.value).subscribe({
          next:(response)=>{
            this.toastService.success(response.message)
            this.onClose();
          }
        }); 
      }
    }else{
      this.userForm.markAllAsTouched();
    }

  }
}