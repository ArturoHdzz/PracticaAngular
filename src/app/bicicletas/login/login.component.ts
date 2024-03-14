import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgIf} from "@angular/common";
import { UsersService } from '../../services/users/users.service';


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
  isRequestInProgress = false;



  constructor(private http: HttpClient, private router: Router, private userService: UsersService){
    this.loginObj = new Login();
  }

  loginAsGuest(): void {
    this.userService.createGuestUser().subscribe(
      (res:any)=>{
        alert("Entrando como invitado")
        localStorage.setItem('TOKEN', res.token)
        this.router. navigateByUrl('/layout/home')
        this.Error = null;
    },
    (error)=>{
      this.Error = "No puede entrar como invitado, porfavor, intente de nuevo."
      alert(this.Error)
    }
    );
  }

  onLogin(){
    this.isRequestInProgress = true;
    this.http.post('http://127.0.0.1:8000/api/auth/login', this.loginObj).subscribe(
      (res: any) => {
        alert("Inicio de sesión Exitosamente")
        this.router.navigateByUrl('/codigo')
        this.Error = null;
      },
      (error) => {
        this.shakeFields();
        this.Error = "El correo o la contraseña son invalidos, porfavor, reviselas bien."
      }
    ).add(() => {
      this.isRequestInProgress = false;
    });
  }

  shakeFields() {
    const emailField = document.getElementById('email');
    const passwordField = document.getElementById('password');
    if (emailField && passwordField) {
      emailField.classList.add('shake-error');
      passwordField.classList.add('shake-error');
      emailField.style.borderColor = 'red';
      passwordField.style.borderColor = 'red';
      setTimeout(() => {
        emailField.classList.remove('shake-error');
        passwordField.classList.remove('shake-error');
        emailField.style.borderColor = '';
        passwordField.style.borderColor = '';
      }, 1000);
    }
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