import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIf} from "@angular/common";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule, HttpClientModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent{
  registerObj: Register;
  public nombreError:String|null = null;
  public correoError:String|null = null;
  public passwordError:String|null = null;





  constructor(private http: HttpClient, private router: Router){
    this.registerObj = new Register();


  }


  onRegister(){
    this.http.post('http://127.0.0.1:8000/api/auth/register', this.registerObj).subscribe((res:any)=>{
      if(res.result){
        alert("Registro Exitosamente")
        this.router. navigateByUrl('/login')
        this.correoError = null;
        this.nombreError = null;
        this.passwordError = null;
      }else{
        alert("Datos invalidos")
      }
    },
    (error) => {
      console.log(error.error.data.name)
      this.nombreError = error.error.data.name;
      this.correoError = error.error.data.email;
      this.passwordError = error.error.data.password;
    })
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
