import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { AuthenticationService } from '../../services/authentication.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatFormFieldModule,MatIconModule,MatInputModule,MatDividerModule,MatButtonModule,ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit , OnDestroy{
signupSubscription : Subscription | undefined;
isProfile : boolean = false;

  constructor(private authService : AuthenticationService,private router : Router){

  }
  ngOnInit(): void {
    
  }
  
  signupForm : FormGroup = new FormGroup({
    firstName : new FormControl("",[Validators.required]),
    lastName : new FormControl("",[Validators.required]),
    email : new FormControl("",[Validators.required,Validators.email]),
    password : new FormControl("",[Validators.required,Validators.min(8)]),
    phoneNumber : new FormControl("",[Validators.required,Validators.min(10)]),
    address : new FormControl("",[Validators.required,Validators.min(15)]),
  })

  onSubmit(){
    // Interceptors to add bearer tokens

    const data = {
      user : this.signupForm.value
    }
    this.signupSubscription = this.authService.customerSignup(data).subscribe((res)=>{
      console.log(res);
      this.router.navigate(['/login'])
    });
    // console.log(this.signupForm.value)
  }

  ngOnDestroy(): void {
    this.signupSubscription?.unsubscribe()
  }
}
