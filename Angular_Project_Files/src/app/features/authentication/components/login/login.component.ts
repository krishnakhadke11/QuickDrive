import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { AuthenticationService } from '../../services/authentication.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Role } from '../../../../core/models/Role';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule,MatIconModule,MatInputModule,MatDividerModule,MatButtonModule,ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy{
  loginSubscription : Subscription | undefined;
  isCustomer : boolean = true;
  constructor(private authService : AuthenticationService,private router : Router){

  }
 

  loginForm : FormGroup = new FormGroup({
    email : new FormControl("",[Validators.required,Validators.email]),
    password : new FormControl("",[Validators.required]),
  })

  onSubmit(){
    const data = this.loginForm.value;
    const role : Role= this.isCustomer ? 'CUSTOMER' : 'DRIVER'
    this.loginSubscription =  this.authService.login(data,role).subscribe((res) =>{
      if(res.role === 'CUSTOMER'){
        this.router.navigate(['/customer'])
      }
      if(res.role === 'DRIVER'){
        this.router.navigate(['/driver'])
      }
    })
  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe()
  }

  toggleProfile(){
    this.isCustomer = !this.isCustomer;
  }
}
