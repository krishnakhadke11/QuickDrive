import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Customer } from '../../../core/models/Customer';
import { UserService } from '../../../core/services/user.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../../core/services/notification.service';
import { CommonModule } from '@angular/common';
import { Driver } from '../../../core/models/Driver';

@Component({
  selector: 'app-profile-update',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,MatButtonModule,MatDividerModule,ReactiveFormsModule,CommonModule],
  templateUrl: './profile-update.component.html',
  styleUrl: './profile-update.component.css'
})
export class ProfileUpdateComponent implements OnInit {
  profileUpdate : FormGroup;

  @Input() userCustomer : Customer | null = null;
  @Input() userDriver : Driver | null = null;

  constructor(private userService : UserService,private router : Router,private notif : NotificationService){
    this.profileUpdate = new FormGroup({
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      phoneNumber: new FormControl("", [Validators.required, Validators.minLength(10)]),
      address: new FormControl("", [Validators.required, Validators.minLength(15)]),
      driversLicense: new FormControl("", [Validators.required]),
    })
  }

  ngOnInit() : void {
    this.checkProfile()
  }

  checkProfile(){
    if (this.userCustomer && this.userDriver === null) {
      console.log(this.userCustomer)
      this.profileUpdate.patchValue({
        firstName: this.userCustomer.user.firstName,
        lastName: this.userCustomer.user.lastName,
        email: this.userCustomer.user.email,
        phoneNumber: this.userCustomer.user.phoneNumber,
        address: this.userCustomer.user.address,
      });
      this.profileUpdate.get('driversLicense')?.clearValidators();
    }

    if(this.userDriver && this.userCustomer ===null){
      this.profileUpdate.patchValue({
        firstName: this.userDriver.user.firstName,
        lastName: this.userDriver.user.lastName,
        email: this.userDriver.user.email,
        phoneNumber: this.userDriver.user.phoneNumber,
        address: this.userDriver.user.address,
        driversLicense : this.userDriver.driversLicense
      });
    }


  }

  onUpdate(){
    if(this.userCustomer){  
        console.log(this.profileUpdate.value)
        const updateCustomer : Customer = {
          id : this.userCustomer.id,
          user : {
            id: this.userCustomer.user.id,
            firstName: this.profileUpdate.value.firstName,
            lastName: this.profileUpdate.value.lastName,
            email: this.profileUpdate.value.email,
            phoneNumber: this.profileUpdate.value.phoneNumber,
            address: this.profileUpdate.value.address,
            role: this.userCustomer.user.role,
          }
        }
      console.log("updateCustomer : ",updateCustomer)
      this.userService.updateCustomer(updateCustomer).subscribe((res) =>{
        if(res){
          this.notif.showSuccess("User Details are updated successfully")
          this.router.navigate(['/customer'])
        }
      });
    }else if(this.userDriver){
      const updateDriver : Driver = {
        id : this.userDriver.id,
        driversLicense : this.profileUpdate.value.driversLicense,
        user : {
          id: this.userDriver.user.id,
          firstName: this.profileUpdate.value.firstName,
          lastName: this.profileUpdate.value.lastName,
          email: this.profileUpdate.value.email,
          phoneNumber: this.profileUpdate.value.phoneNumber,
          address: this.profileUpdate.value.address,
          role: this.userDriver.user.role,
        }
      }

      console.log("updateCustomer : ",updateDriver)
      this.userService.updateDriver(updateDriver).subscribe((res) =>{
        if(res){
          this.notif.showSuccess("User Details are updated successfully")
          this.router.navigate(['/customer'])
        }
      });
    }
  }
}
