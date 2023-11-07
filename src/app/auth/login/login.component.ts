import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public loginForm: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router
  ){
    this.createForm();
  }

  createForm(){
    this.loginForm= this.fb.group({
      user:['', Validators.required],
      password:['', Validators.required]
    });
  }

  login(){
    this.authService.login(this.loginForm.controls['user'].value,this.loginForm.controls['password'].value).subscribe(
      {
        next:(value: any) => {
          if(value){
            sessionStorage.setItem('user', JSON.stringify(value));
            this.router.navigate(['/tasks'])
          }
        },
      }
    );
  }

}
