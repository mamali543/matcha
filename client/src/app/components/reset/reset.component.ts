import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


interface NewPassword {
  token: string | null,
  password: string
}

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchPasswordsValidator(controlName: string, matchingControlName: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const password = formGroup.get(controlName)?.value;
    const confirmPassword = formGroup.get(matchingControlName)?.value;

    if (password !== confirmPassword) {
      return { passwordsMismatch: true };
    } else {
      return null;
    }
  };
}


@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {


  token: string | null = null;
  newPasswordForm: FormGroup;

  constructor(private authService: AuthService ,private route: ActivatedRoute, private fb: FormBuilder) {
    this.newPasswordForm = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },{ validators: matchPasswordsValidator('password', 'confirmPassword') })
   }

  ngOnInit(): void {
    // Using snapshot if the token is only needed once upon initialization
    this.token = this.route.snapshot.queryParamMap.get('token');
    console.log("this.token: ",this.token);


    // Or subscribe to the queryParams if it may change while the component is active
    // this.route.queryParams.subscribe(params => {
    //   this.token = params['token'];
    // });
  }

  onNewPassword() {
    if (this.newPasswordForm.valid)
    {
      let obj: NewPassword = {
        token: this.token,
        password: this.newPasswordForm.get('password')?.value
      }
      this.authService.reset_token(obj).subscribe(
        (Response) => {
          console.log("response: ", Response)
        }, (error) => {
          console.log("error: ", error)
        }
      )
    }

  }
}
