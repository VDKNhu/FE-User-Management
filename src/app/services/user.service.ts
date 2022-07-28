import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { user } from '../models/user.model';

import { API_LINK } from '../constants/share-link';

const HttpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${API_LINK}/users`;

  constructor(private http: HttpClient) {}

  private handleError<T>(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<T> => {
      console.log(error);
      const message = `Server returned code ${error.status} with body "${error.error}"`;
      throw new Error(`${operation} failed: ${message}`);
    }
  }

  getUsers(): Observable<user[]> { 
    return this.http.get<user[]>(this.apiUrl);
  }

  getUsersWithError(): Observable<any> { // user[]
    return this.http.get<user[]>(this.apiUrl).pipe(
      tap(data => console.log('Data fetched', data)),
      catchError(this.handleError('Failed to fetch data'))
    );
  }

  onCreateUser(user: any): Observable<user> {
    return this.http.post<user>(this.apiUrl, user, HttpOptions);
  }

  onEditUser(user: any): Observable<user> {
    const url=`${this.apiUrl}/${user.id}`;
    return this.http.put<any>(url, user, HttpOptions);  
  }

  onDeleteUser(id: number): Observable<user> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<user>(url);
  }

  getUserByEmail(email: string) {
    return this.http.get<any[]>(`${this.apiUrl}/email/${email}`);
  }

  searchUser(text: string) {
    return this.http.post<any[]>(`${this.apiUrl}/${text}`, null, HttpOptions);
  } 

  // test_foreach(items: any, callback: any) {
  //   for (let index = 0; index < items.length; index++) {
  //     callback(items[index]);
  //   }
  // }
}

