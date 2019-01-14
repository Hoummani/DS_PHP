import { Injectable } from '@angular/core';

import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {Observable, pipe, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {Etudiant} from '../../models/Etudiant';
import {Router} from '@angular/router';
import {Prof} from '../../models/Prof';
import {User} from '../../models/User';




const httpOptions= {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProfsService {
  private readonly apiUrl="http://127.0.0.1:8000/api";
  private profsUrl=this.apiUrl+"/profs";
  private profLoginURL=this.apiUrl+"/prof/login";
  private profLogoutURL=this.apiUrl+"/prof/logout";

  public currentProf:Prof;

  constructor(private http:HttpClient,
              private router:Router
              ) { }


  getAllProfs(): Observable <any> {
    return this.http.get(this.profsUrl)
    .pipe(
        catchError(error => this.handleError(error))
    );
  }



  profOnLogIn(prof:Prof):Observable<Prof>{

    const request=JSON.stringify({
      email:prof.email,password:prof.password
    });
    return this.http.post(this.profLoginURL, request,httpOptions)
      .pipe(
        map((response: Prof) => {
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



  addProf (prof: Prof): Observable<Prof> {
    return this.http.post<Prof>(this.profsUrl, prof)
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
  profOnLogout(): Observable<any> {
    return this.http.post(this.profLogoutURL,httpOptions).pipe(
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


  getUser(): Observable<Prof> {
    return this.http.get(this.apiUrl + '/me').pipe(
      tap(
        (prof: Prof) => {
          this.currentProf = prof;
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
