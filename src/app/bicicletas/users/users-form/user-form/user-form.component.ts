import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../../../services/users/users.service';
import { IUser, IRole } from '../../../../shared/models/User';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnChanges {
  @Input() data: IUser | null = null;
  @Output() onCloseModel = new EventEmitter();
  userForm: FormGroup;
  roles: IRole[] = [];

  public nombreError: String | null = null;
  public correoError: String | null = null;
  public passwordError: String | null = null;
  public roleIdError: String | null = null;

  private initialFormState: any;

  constructor(private fb: FormBuilder, private userService: UsersService, private toastService: ToastrService){
    this.userForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      role_id: new FormControl('', [Validators.required]),
    });
    this.initialFormState = this.userForm.value;
  }

  ngOnInit() {
    this.getRoles(); 
  }

  getRoles(){
    this.userService.getAllRoles().subscribe({
      next:(response)=>{
        this.roles = response.data;
      }
    });
  }

  ngOnChanges(): void {
    if(this.data){
      this.userForm.patchValue({
        name: this.data?.name,
        email: this.data?.email,
        password: this.data?.password,
        role_id: this.data?.role.id,
      });
    }
  }

  onClose(){
    this.userForm.setValue(this.initialFormState);
    this.onCloseModel.emit(false);
  }

  onSubmit(){
    if(this.userForm.valid){
      let request;
      if(this.data){
        request = this.userService.updateUser(this.data.id as string, this.userForm.value);
      }else{
        request = this.userService.createUser(this.userForm.value);
      }

      request.subscribe({
        next:(response)=>{
          this.toastService.success(response.message)
          this.nombreError = null;
          this.correoError = null;
          this.passwordError = null;
          this.roleIdError = null;
          this.onClose();
        },
        error: (err) => {
          if(err.error){
            console.log(err.error);
            this.nombreError = err.error.name 
            this.correoError = err.error.email 
            this.passwordError = err.error.password 
            this.roleIdError = err.error.role_id 
          }
        }
      }); 
    }else{
      this.userForm.markAllAsTouched();
    }
  }
}