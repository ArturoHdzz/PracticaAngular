import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIf} from "@angular/common";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule, HttpClientModule, NgIf, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent{
  registerObj: Register;
  public nombreError:String|null = null;
  public correoError:String|null = null;
  public passwordError:String|null = null;
  userForm: FormGroup;
  isRequestInProgress = false;
  private initialFormState: any;




  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder){
    this.registerObj = new Register();

    this.userForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(10)]),
    });
    this.initialFormState = this.userForm.value;
  }
  


  onRegister() {
    this.isRequestInProgress = true;

    this.http.post('http://127.0.0.1:8000/api/auth/register', this.registerObj).subscribe(
      (res: any) => {
        if (res.result) {
          alert("Registro Exitosamente");
          this.router.navigateByUrl('/login');
          this.correoError = null;
          this.nombreError = null;
          this.passwordError = null;
        } else {
          alert("Datos inválidos");
        }
      },
      (error) => {
        console.log(this.userForm.errors);
        this.nombreError = error.error.data.name;
        this.correoError = error.error.data.email;
        this.passwordError = error.error.data.password;
      }
    ).add(() => {
      this.isRequestInProgress = false;
    });
  }

  

}
export class Register{
  name: string;
  email: string;
  password: string;
  constructor(){
    this.name='';
    this.email='';
    this.password='';
  }
}
