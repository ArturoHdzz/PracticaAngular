import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgIf} from "@angular/common";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, HttpClientModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginObj: Login;
  public Error:String|null = null;


  constructor(private http: HttpClient, private router: Router){
    this.loginObj = new Login();
  }

  onLogin(){
    debugger;
    
    this.http.post('http://127.0.0.1:8000/api/auth/login', this.loginObj).subscribe(
      (res: any) => {
        alert("Inicio de sesión Exitosamente")
        this.router.navigateByUrl('/codigo')
        this.Error = null;
      },
      (error) => {
        this.Error = "El correo o la contraseña son invalidos, porfavor, reviselas bien."
      }
    );
  }
}
export class Login{
  email: string;
  password: string;
  constructor(){
    this.email='';
    this.password='';
  }
}