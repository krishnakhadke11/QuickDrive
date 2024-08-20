import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-addcab-dialog',
  standalone: true,
  imports: [MatDialogModule,MatButtonModule,MatInputModule,MatFormFieldModule,ReactiveFormsModule,MatSelectModule],
  templateUrl: './addcab-dialog.component.html',
  styleUrl: './addcab-dialog.component.css'
})
export class AddcabDialogComponent {

  addCabForm : FormGroup = new FormGroup({
    registerNo : new FormControl('',[Validators.required,Validators.pattern('^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}')]),
    seatingCapacity : new FormControl(5 | 7,[Validators.required]),
    color : new FormControl('',[Validators.required]),
    model : new FormControl('',[Validators.required]),
  })
}
