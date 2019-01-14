import { Component, OnInit } from '@angular/core';
import {User} from '../../models/User';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component ({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  user: User = new User();
  error?: any;
  returnUrl: string;
  loginForm:FormGroup;


  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private fb:FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }
  createForm(){
    this.loginForm= this.fb.group({
      email: [this.user.email,
        Validators.compose([Validators.required, Validators.email ])],
      password: [this.user.password,
        Validators.compose([Validators.required, Validators.minLength(6)])],
    });
  }


  onSubmit(): void {
    this.authService.onLogin(this.loginForm.value).subscribe(
      (response) => {
        this.router.navigate(['admin/home']);
      },
      (error) => {
        this.error = "Invalid credentials !";
      }
    );
    // Clear form fields
    this.loginForm.reset();


  }
}
