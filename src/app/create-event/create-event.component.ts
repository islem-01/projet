import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EventService } from '../services/event.service';
@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent  {
  //forcage ==> boite de dialogue
  form!: FormGroup;

  constructor(public dialogRef: MatDialogRef<CreateEventComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private ES:EventService) {
    //kan data fargha lazm ntestiiw ila kan fih data wla laa
  if (data) {

  
    this.ES.GetEventById(data).subscribe((E: any) => {

      this.form = new FormGroup({
        title: new FormControl(E.title, Validators.required),
        datedebut: new FormControl(E.datedebut, Validators.required),
        datefin: new FormControl(E.datefin, Validators.required),
        lieu: new FormControl(E.lieu, Validators.required),
      });

    });

  } else {


    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      datedebut: new FormControl('', Validators.required),
      datefin: new FormControl('', Validators.required),
      lieu: new FormControl('', Validators.required),
    });

  }

   }

 save() {
        this.dialogRef.close(this.form.value);//hooni anddi les donnees li 3malt bihom le formulaire
    }

    close() {
        this.dialogRef.close();
    }}