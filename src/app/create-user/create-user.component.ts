import { Component } from '@angular/core';
import { ApiService } from '../api.service'; // Adjust the path as needed

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
    if (this.password !== this.repeatPassword) {
        alert("Passwords do not match!");
        return;
    }

    const userData = {
        name: this.name,
        email: this.email,
        address: this.address,
        password: this.password
    };

    console.log('Sending user data:', userData); // Debugging line

    this.api.createUser(userData).subscribe(
        response => {
            console.log('Server response:', response);
            alert('User created successfully!');
            // Reset the form or navigate as needed
        },
        error => {
            console.error('Error from server:', error);
            alert('Error creating user: ' + (error.error?.message || 'Unknown error'));
        }
    );
}

}
