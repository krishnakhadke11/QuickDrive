import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserProfile } from '../../../core/models/UserProfile';
import { Driver } from '../../../core/models/Driver';
import { Customer } from '../../../core/models/Customer';
import { UserService } from '../../../core/services/user.service';
import { CommonModule } from '@angular/common';
import { SignupComponent } from '../../../features/authentication/components/signup/signup.component';
import { ProfileUpdateComponent } from '../profile-update/profile-update.component';




@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatFormFieldModule,MatButtonModule,MatInputModule,CommonModule,SignupComponent,ProfileUpdateComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  userCustomer: Customer | null = null; 
  userDriver: Driver | null = null;
  isEdit : boolean = false;
  constructor(private userService : UserService){
    
  }

  ngOnInit(): void {
      this.userService.getUserDetails()
      this.userService.userCustomer.subscribe((res : Customer | null) =>{
        this.userCustomer = res;
      })

      this.userService.userDriver.subscribe((res :Driver | null) =>{
        this.userDriver = res;
      })
  }

  onEdit() {
    this.isEdit = !this.isEdit;
  }

  backBtn(isEdit : boolean){
    this.onEdit();
  }
}
