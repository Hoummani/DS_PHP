import { Injectable } from '@angular/core';

import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {Observable, pipe, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Etudiant} from '../../models/Etudiant';



@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  private readonly apiUrl="http://127.0.0.1:8000/api";
  private etudiantsUrl=this.apiUrl+"/etudiants";



  constructor(private http:HttpClient) { }


  getAllEtudiants(): Observable <any> {
    return this.http.get(this.etudiantsUrl);
      //.pipe(
        //catchError(error => this.handleError(error))
      //);
  }


  getEtudiant(id:number):Observable<any>{

    return this.http.get<Etudiant>(this.etudiantsUrl + '/${id}')
      .pipe(
        catchError(error => this.handleError(error))
      );

  }



  addEtudiant (etudiant: Etudiant): Observable<Etudiant> {
    return this.http.post<Etudiant>(this.etudiantsUrl, etudiant)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }


  updateEtudiant (etudiant: Etudiant, id: number): Observable<Etudiant> {
    return this.http.put<Etudiant>(this.etudiantsUrl + '/${id}', etudiant)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }


  deleteEtudiant (id: number): Observable<{}|Etudiant[]> {
    return this.http.delete<Etudiant[]>(this.etudiantsUrl + '/${id}')
      .pipe(
        catchError(error => this.handleError(error))
      );
  }



  /** Error handler */
  private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side error.
          console.error('An error occurred:',
            error.error.message);
        } else {
        // The backend error.
          return throwError(error);
        }
        // return a custom error message
        return throwError('Something bad happened; please try again later.');
  }



}
