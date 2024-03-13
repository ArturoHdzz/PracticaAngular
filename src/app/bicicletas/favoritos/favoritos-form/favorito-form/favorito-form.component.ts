import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IFavorito, IModelo, IUser } from '../../../../shared/models/Favorito';
import { FavoritosService } from '../../../../services/favoritos/favoritos.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-favorito-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './favorito-form.component.html',
  styleUrl: './favorito-form.component.css'
})
export class FavoritoFormComponent implements OnChanges{
  @Input() data: IFavorito | null = null;
  @Output() onCloseModel = new EventEmitter();
  Form: FormGroup;
  users: IUser[] = [];
  modelos: IModelo[] = [];

  private initialFormState: any;

  constructor(private fb: FormBuilder, private Service: FavoritosService, private toastService: ToastrService){
    this.Form = this.fb.group({
      user_id: new FormControl('', [Validators.required]),
      modelo_id: new FormControl('', [Validators.required]),
      fecha: new FormControl('', [Validators.required]),
    });
    this.initialFormState = this.Form.value;
  }

  ngOnInit() {
    this.getUsuarios();
    this.getModelos();
  }

  getUsuarios(){
    this.Service.getUsers().subscribe({
      next:(response)=>{
        this.users = response.data;
      }
    });
  }

  getModelos(){
    this.Service.getModelos().subscribe({
      next:(response)=>{
        this.modelos = response.data;
      }
    });
  }

  ngOnChanges(): void {
    if(this.data){
      this.Form.patchValue({
        user_id: this.data?.user.id,
        modelo_id: this.data?.modelo.id,
        fecha: this.data?.fecha,
      });
    }
  }

  onClose(){
    this.Form.setValue(this.initialFormState);
    this.onCloseModel.emit(false);
  }

  onSubmit(){
    if(this.Form.valid){
      if(this.data){
        this.Service.update(this.data.id as string, this.Form.value).subscribe({
          next:(response)=>{
            this.toastService.success(response.message)
            this.onClose();
          }
        }); 
      }else{
        this.Service.create(this.Form.value).subscribe({
          next:(response)=>{
            this.toastService.success(response.message)
            this.onClose();
          }
        }); 
      }
    }else{
      this.Form.markAllAsTouched();
    }
  }
}
