import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  name: string = '';
  email: string = '';
  address: string = '';
  password: string = '';
  repeatPassword: string = '';

  constructor(private api: ApiService) {}

  createUser() {
    if (this.password === this.repeatPassword) {
      this.api.createUser({ username: this.email, password: this.password }).subscribe(response => {
        console.log(response);
      });
    } else {
      alert("Passwords do not match!");
    }
  }
}
