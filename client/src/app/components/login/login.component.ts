import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router'; // Import Router


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router)
  {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {

  }

  onLogin() {
    console.log("form value", this.loginForm.value);
    if (this.loginForm.valid)
    {
      this.authService.login(this.loginForm.value).subscribe(
        (response) => {
          localStorage.setItem('token', response.access_token)
          console.log("ha7na tle3na response t login");
          console.log("response.access_token: ", response.access_token);
          /* attaching token to subsequent requests using angular http interceptors*/
          this.router.navigate(['/layout']); // Adjust '/layout' as necessary

        }  
      )
    }
  }

}

