import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: any[] = [];
  errorMessage: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.authService.getUsers().subscribe({
      next: (data: any[]) => {
        this.users = data; // Assign received data to users
      },
      error: (err: any) => {
        this.errorMessage = 'Error loading users';
      }
    });
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.authService.deleteUser(id).subscribe({
        next: () => {
          this.loadUsers(); // Reload users after deletion
        },
        error: (err: any) => {
          this.errorMessage = 'Error deleting user';
        }
      });
    }
  }
}
