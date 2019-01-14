import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {User} from '../../models/User';
import {AuthService} from '../../services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User();
  error: any;
  registerForm: FormGroup;


  constructor(
    private authService:AuthService,
    private router:Router,
    private fb:FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
  }


  createForm() {
    this.registerForm = this.fb.group({
      name: [this.user.name,
        Validators.compose([Validators.required])],
      email: [this.user.email,
        Validators.compose([Validators.required, Validators.email ])],
      password: [this.user.password,
        Validators.compose([Validators.required, Validators.minLength(6)])],
    });
  }


  onSubmit(): void {
    this.authService.onRegister(this.registerForm.value).subscribe(
      (response) => {
        this.router.navigate(['admin/home']);
      },
      (response) => {
        if (response.status === 422) {
          Object.keys(response.error).map((err) => {
            this.error = `${response.error[err]}`;
          });
        } else {
          this.error = response.error;
        }
      }
    );
  }



}
