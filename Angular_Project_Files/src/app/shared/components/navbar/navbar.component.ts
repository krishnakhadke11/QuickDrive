import { Component, OnDestroy, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../../features/authentication/services/authentication.service';
import { User } from '../../../core/models/User';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule,MatButtonModule,MatIconModule,RouterLink,CommonModule,MatIconModule,MatExpansionModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit,OnDestroy{
  isLoggedIn : boolean = false;
  isCustomer : boolean = false;

  menuOpened : boolean = false;
  animationDone = false;

  private userSubject : Subscription | undefined;
  constructor(private authService : AuthenticationService){

  }
  
  ngOnInit(): void {
    this.userSubject = this.authService.user.subscribe((user: User | null) => {
      // console.log(user)
      this.isLoggedIn = user ? true : false;
      if(user?.role === 'CUSTOMER'){
        this.isCustomer = true
      }else{
        this.isCustomer = false;
      }
    });
  }

  toggleMenu() {
    this.menuOpened = !this.menuOpened;
    this.animationDone = true;
    setTimeout(() => {
      this.animationDone = false; // Reset after animation is done
    }, 300); // Time should match animation duration
  }

  logout(){
    this.authService.logout()
  }

  ngOnDestroy(): void {
    this.userSubject?.unsubscribe()
  }
}
