import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = "";
  password: string = "";

  constructor(private AS: AuthService, private router: Router) { }

login() {
  console.log("email", this.email, "password", this.password);

  this.AS.signInWithEmailAndPassword(this.email, this.password)
    .then((res) => {

      // 🔥 IMPORTANT: stocker token
      localStorage.setItem('token', 'logged-in');

      this.router.navigate(['/dashboard']);
    })
    .catch(err => {
      console.log("Login error", err);
      alert("Email ou mot de passe incorrect");
    });
}
}