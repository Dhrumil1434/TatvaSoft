import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'https://localhost:7027/api/Login';
  private registerUrl = 'https://localhost:7027/api/Register';
  private editUserUrl = 'https://localhost:7027/api/Register/edit';
  private getUsersUrl = 'https://localhost:7027/api/Users';
  private deleteUserUrl = 'https://localhost:7027/api/DeleteUser';
  private getUserByIdUrl = 'https://localhost:7027/api/User'; // Add URL for getting user by ID

  constructor(private http: HttpClient) {}

  register(userData: any) {
    return this.http.post<any>(this.registerUrl, userData)
      .pipe(catchError(this.handleError));
  }

  login(userData: any) {
    return this.http.post<any>(this.loginUrl, userData)
      .pipe(catchError(this.handleError));
  }

  editUser(userId: number, userData: any) {
    return this.http.put<any>(`${this.editUserUrl}/${userId}`, userData)
      .pipe(catchError(this.handleError));
  }

  getUsers() {
    return this.http.get<any[]>(this.getUsersUrl)
      .pipe(catchError(this.handleError));
  }

  deleteUser(userId: number) {
    return this.http.delete<any>(`${this.deleteUserUrl}/${userId}`)
      .pipe(catchError(this.handleError));
  }

  getUserById(userId: number) {
    return this.http.get<any>(`${this.getUserByIdUrl}/${userId}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
