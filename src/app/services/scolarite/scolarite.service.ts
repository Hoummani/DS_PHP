import { Injectable } from '@angular/core';

import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {Observable, pipe, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {Etudiant} from '../../models/Etudiant';
import {Router} from '@angular/router';
import {Prof} from '../../models/Prof';
import {User} from '../../models/User';
import {Scolarite} from '../../models/Scolarite';




const httpOptions= {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class ScolariteService {


  private readonly apiUrl="http://127.0.0.1:8000/api";
  private scolariteUrl=this.apiUrl+"/scolarities";
  private scolariteLoginURL=this.apiUrl+"/scolarite/login";
  private scolariteLogoutURL=this.apiUrl+"/scolarite/logout";

  public currentScolarite:Scolarite;

  constructor(
    private http:HttpClient,
    private router:Router
  ) { }

  getAllScolarites(): Observable <any> {
    return this.http.get(this.scolariteUrl)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }



  scolariteOnLogIn(scolarite:Scolarite):Observable<Scolarite>{

    const request=JSON.stringify({
      email:scolarite.email,password:scolarite.password
    });
    return this.http.post(this.scolariteLoginURL, request,httpOptions)
      .pipe(
        map((response: Scolarite) => {
            // Receive jwt token in the response
            const token:string=response['access_token'];
            // If we have a token, proceed
            if (token){
              this.setToken(token);
              this.getUser().subscribe();
            }
            return response;

          }
        ),
        catchError(error => this.handleError(error))

      );

  }



  addScolarite (scolarite: Scolarite): Observable<Scolarite> {
    return this.http.post<Scolarite>(this.scolariteUrl, scolarite)
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




  //----------Log out
  scolariteOnLogout(): Observable<any> {
    return this.http.post(this.scolariteLogoutURL,httpOptions).pipe(
      tap(
        () => {
          localStorage.removeItem('token');
          this.router.navigate(['/']);
        }
      )
    );
  }









  setToken(token: string): void {
    return localStorage.setItem('token', token );
  }
  getToken(): string {
    return localStorage.getItem('token');
  }


  getUser(): Observable<Scolarite> {
    return this.http.get(this.apiUrl + '/me').pipe(
      tap(
        (scolarite: Scolarite) => {
          this.currentScolarite = scolarite;
        }
      )
    );
  }


  isAuthenticated(): boolean {
    // get the token
    const token: string = this.getToken();
    if (token) {
      return true;
    }
    return false;
  }



}
