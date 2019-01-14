import { Component, OnInit } from '@angular/core';
import {Etudiant} from '../../models/Etudiant';
import {EtudiantService} from '../../services/etudiants/etudiant.service';
import {any} from 'codelyzer/util/function';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {ProfsService} from '../../services/profs/profs.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  //private etudiants:Etudiant[];
  profs:any;


  error:any;

  constructor(private profService:ProfsService,
              private adminService:AuthService,
              private router:Router
              ) { }

  ngOnInit() {


  }


  loadProfs(){
    this.profService.getAllProfs().subscribe(
      data=>{
        this.profs=data.data;
        //console.log(data.data);
      },
      error1 => {
        console.log(error1);
      }
      );
  }

  logOut(){
    this.adminService.onLogout().subscribe(
      data=>{
        this.router.navigate(['admin/login']);
      },
      error1 => {
        console.log(error1);
      }
    );
  }

}
