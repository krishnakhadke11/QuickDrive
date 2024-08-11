import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserProfile } from '../../../../core/models/UserProfile';




@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatFormFieldModule,MatButtonModule,MatInputModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  userProfile: UserProfile;

  constructor(){
    this.userProfile = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '+1234567890',
      address: '1234 Elm Street, Springfield',
      role: 'Customer'
    };
  }
}
