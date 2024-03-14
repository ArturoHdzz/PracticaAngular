import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IResena , IModelo, IUser} from '../../../../shared/models/resenas';
import { ResenasService } from '../../../../services/resenas/resenas.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-resena-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './resena-form.component.html',
  styleUrl: './resena-form.component.css'
})
export class ResenaFormComponent implements OnChanges{
  @Input() data: IResena | null = null;
  @Output() onCloseModel = new EventEmitter();
  Form: FormGroup;
  users: IUser[] = [];
  modelos: IModelo[] = [];

  public userError: String | null = null;
  public modeloError: String | null = null;
  public comentarioError: String | null = null;
  public calificacionError: String | null = null;
  public fechaError: String | null = null;

  private initialFormState: any;

  constructor(private fb: FormBuilder, private Service: ResenasService, private toastService: ToastrService){
    this.Form = this.fb.group({
      user_id: new FormControl('', [Validators.required]),
      modelo_id: new FormControl('', [Validators.required]),
      comentario: new FormControl('', [Validators.required]),
      calificacion: new FormControl('', [Validators.required]),
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
        comentario: this.data?.comentario,
        calificacion: this.data?.calificacion,
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
      let request;
      if(this.data){
        request = this.Service.update(this.data.id as string, this.Form.value);
      }else{
        request = this.Service.create(this.Form.value);
      }

      request.subscribe({
        next:(response)=> {
          this.toastService.success(response.message)
          this.userError = null;
          this.modeloError = null;
          this.comentarioError = null;
          this.calificacionError = null;
          this.fechaError = null;
          this.onClose();
        },
        error: (err) => {
          if(err.error){
            console.log(err.error);
            this.userError = err.error.user_id;
            this.modeloError = err.error.modelo_id;
            this.comentarioError = err.error.comentario;
            this.calificacionError = err.error.calificacion;
            this.fechaError = err.error.fecha;
          }
        }
      }); 
    }else{
      this.Form.markAllAsTouched();
    }
  }
}
