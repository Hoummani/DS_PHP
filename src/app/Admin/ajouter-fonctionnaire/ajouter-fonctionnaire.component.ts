import { Component, OnInit } from '@angular/core';
import {ProfsService} from '../../services/profs/profs.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models/User';
import {Prof} from '../../models/Prof';
import {ScolariteService} from '../../services/scolarite/scolarite.service';

@Component ({
  selector: 'app-ajouter-fonctionnaire',
  templateUrl: './ajouter-fonctionnaire.component.html',
  styleUrls: ['./ajouter-fonctionnaire.component.css']
})
export class AjouterFonctionnaireComponent implements OnInit {

  user: Prof = new Prof();
  error?: any;
  returnUrl: string;
  addFonctionnaireForm:FormGroup;

  constructor(private profService:ProfsService,
              private scolariteService:ScolariteService,
              private router:Router,
              private route: ActivatedRoute,
              private fb:FormBuilder
              ) {
    this.createForm();
  }

  ngOnInit() {
  }


  createForm(){
    this.addFonctionnaireForm= this.fb.group({
      nom: [this.user.nom,
        Validators.compose([Validators.required, Validators.minLength(3)])],
      prenom: [this.user.prenom,
        Validators.compose([Validators.required, Validators.minLength(3)])],

      email: [this.user.email,
        Validators.compose([Validators.required, Validators.email])],


      password: [this.user.password,
        Validators.compose([Validators.required, Validators.minLength(6)])],
      status: [this.user.status,
        Validators.compose([Validators.required, Validators.minLength(3)])],


    });
  }

  onSubmit(): void {
    if (this.addFonctionnaireForm.value['status']=="Professeur") {
      //console.log("Prof");
      this.profService.addProf(this.addFonctionnaireForm.value).subscribe(
      (response) => {
        this.router.navigate(['admin/home']);
      },
      (error) => {
        this.error = "You have some errors !";
      }
    );
    }else if (this.addFonctionnaireForm.value['status']=="Scolarite") {
      //console.log("scolarite");
      this.scolariteService.addScolarite(this.addFonctionnaireForm.value).subscribe(
        (response) => {
          this.router.navigate(['admin/home']);
        },
        (error) => {
          this.error = "You have some errors !";
        }
      );


    }else{
      console.log("no thing !");
    }
    /*this.profService.addProf(this.addFonctionnaireForm.value).subscribe(
      (response) => {
        this.router.navigate(['admin/home']);
      },
      (error) => {
        this.error = "Invalid credentials !";
      }
    );*/
    // Clear form fields
    //this.addFonctionnaireForm.reset();


  }

}
