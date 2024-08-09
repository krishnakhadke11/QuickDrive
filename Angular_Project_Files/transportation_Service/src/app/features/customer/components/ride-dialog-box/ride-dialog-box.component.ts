import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-ride-dialog-box',
  standalone: true,
  imports: [MatDialogModule,MatIconModule],
  templateUrl: './ride-dialog-box.component.html',
  styleUrl: './ride-dialog-box.component.css'
})
export class RideDialogBoxComponent {

}
