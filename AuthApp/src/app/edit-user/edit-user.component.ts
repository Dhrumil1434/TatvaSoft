import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  userId!: number;
  userData: any = {};
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userId = +id;
      this.loadUser();
    } else {
      this.errorMessage = 'Invalid user ID';
    }
  }

  loadUser(): void {
    this.authService.getUserById(this.userId).subscribe({
      next: (data) => this.userData = data,
      error: (err) => this.errorMessage = 'Error loading user data'
    });
  }

  updateUser(): void {
    this.authService.editUser(this.userId, this.userData).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => this.errorMessage = 'Error updating user'
    });
  }
}
