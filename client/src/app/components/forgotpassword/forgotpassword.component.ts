import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent {


  forgotForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService){
    this.forgotForm = this.fb.group({
      email: ['', Validators.required]
    })
  }

  onEmailEntred() {
    this.authService.reset(this.forgotForm.value).subscribe(
      (response) => {
          console.log("reset response: ",response);
      },(error) => {
        console.log("reset error: ",error);

      }
      )
    console.log("this.forgotForm.value: ", this.forgotForm.value);
  }
}
