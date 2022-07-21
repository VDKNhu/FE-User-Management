import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  getUsers(): Observable<user[]> {
    return this.http.get<user[]>(this.apiUrl);
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
}
