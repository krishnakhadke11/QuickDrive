import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthenticationService } from '../../services/authentication.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnDestroy {
  signupSubscription: Subscription | undefined;
  isCustomer: boolean = true;
  driverSignupForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.min(8)]),
    phoneNumber: new FormControl('', [Validators.required, Validators.min(10)]),
    address: new FormControl('', [Validators.required, Validators.min(15)]),
    driversLicense: new FormControl('', [Validators.required]),
  });
  customerSignupForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.min(8)]),
    phoneNumber: new FormControl('', [Validators.required, Validators.min(10)]),
    address: new FormControl('', [Validators.required, Validators.min(15)]),
  });

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    // this.updateForm()
  }


  customerSignup() {
    const data = {
      user: {
        firstName: this.customerSignupForm.value.firstName,
        lastName: this.customerSignupForm.value.lastName,
        email: this.customerSignupForm.value.email,
        password: this.customerSignupForm.value.password,
        phoneNumber: this.customerSignupForm.value.phoneNumber,
        address: this.customerSignupForm.value.address,
      },
    };
    this.signupSubscription = this.authService
      .customerSignup(data)
      .subscribe((res) => {
        console.log(res);
        this.router.navigate(['/login']);
      });
  }

  driverSignup() {
    const data = {
      driversLicense: this.driverSignupForm.value.driversLicense,
      user: {
        firstName: this.driverSignupForm.value.firstName,
        lastName: this.driverSignupForm.value.lastName,
        email: this.driverSignupForm.value.email,
        password: this.driverSignupForm.value.password,
        phoneNumber: this.driverSignupForm.value.phoneNumber,
        address: this.driverSignupForm.value.address,
      },
    };
    console.log(data);
    this.signupSubscription = this.authService.driverSignup(data).subscribe((res)=>{
      console.log(res);
      this.router.navigate(['/login'])
    });
  }

  toggleProfile() {
    this.isCustomer = !this.isCustomer;
    if  (this.isCustomer){
      this.customerSignupForm.reset()
    }else{
      this.driverSignupForm.reset()
    }
  }

  ngOnDestroy(): void {
    this.signupSubscription?.unsubscribe();
  }
}
