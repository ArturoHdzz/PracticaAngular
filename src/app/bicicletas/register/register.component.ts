import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerObj: Register;

  constructor(private http: HttpClient, private router: Router){
    this.registerObj = new Register();
  }

  onRegister(){
    debugger;
    this.http.post('http://127.0.0.1:8000/api/auth/register', this.registerObj).subscribe((res:any)=>{
      if(res.result){
        alert("Registro Exitosamente")
        this.router. navigateByUrl('/login')
      }else{
        alert("Datos invalidos")
      }
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
