import { Component, OnDestroy, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../../features/authentication/services/authentication.service';
import { User } from '../../../core/models/User';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule,MatButtonModule,MatIconModule,RouterLink,CommonModule,MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit,OnDestroy{
  isLoggedIn : boolean = false;
  private userSubject : Subscription | undefined;
  constructor(private authService : AuthenticationService){

  }
  
  ngOnInit(): void {
    this.userSubject = this.authService.user.subscribe((user: User | null) => {
      // console.log(user)
      this.isLoggedIn = user ? true : false;
    });
  }

  logout(){
    this.authService.logout()
  }

  ngOnDestroy(): void {
    this.userSubject?.unsubscribe()
  }
}
