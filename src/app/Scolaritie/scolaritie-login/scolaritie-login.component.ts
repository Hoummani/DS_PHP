import { Component, OnInit } from '@angular/core';
import {Scolarite} from '../../models/Scolarite';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ScolariteService} from '../../services/scolarite/scolarite.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-scolaritie-login',
  templateUrl: './scolaritie-login.component.html',
  styleUrls: ['./scolaritie-login.component.css']
})
export class ScolaritieLoginComponent implements OnInit {



  ngOnInit() {
  }

  scolaritie: Scolarite = new Scolarite();
  error?: any;
  returnUrl: string;
  loginForm:FormGroup;

  constructor(
    private scolaritieService: ScolariteService,
    private router: Router,
    private route: ActivatedRoute,
    private fb:FormBuilder
  ) {
    this.createForm();
  }


  createForm(){
    this.loginForm= this.fb.group({
      email: [this.scolaritie.email,
        Validators.compose([Validators.required, Validators.email ])],
      password: [this.scolaritie.password,
        Validators.compose([Validators.required, Validators.minLength(6)])],
    });
  }


  onSubmit(): void {
    this.scolaritieService.scolariteOnLogIn(this.loginForm.value).subscribe(
      (response) => {
        this.router.navigate(['scolaritie/home']);
      },
      (error) => {
        this.error = "Invalid credentials !";
      }
    );
    // Clear form fields
    this.loginForm.reset();


  }


}
