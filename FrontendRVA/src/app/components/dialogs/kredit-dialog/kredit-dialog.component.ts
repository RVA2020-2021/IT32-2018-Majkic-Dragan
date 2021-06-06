import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Kredit } from './../../../models/kredit';
import { KreditService } from 'src/app/services/kredit.service';

@Component({
  selector: 'app-kredit-dialog',
  templateUrl: './kredit-dialog.component.html',
  styleUrls: ['./kredit-dialog.component.css']
})
export class KreditDialogComponent implements OnInit {
  public flag: number;

  constructor(public snackBar : MatSnackBar,
              public dialogRef : MatDialogRef<KreditDialogComponent>,
              @Inject (MAT_DIALOG_DATA) public data : Kredit,
              public kreditService : KreditService) { }

  ngOnInit(): void {
  }

  public add() : void {
    this.kreditService.addCredit(this.data)
    .subscribe(data =>{
      this.snackBar.open('Uspešno ste dodali podatke o novom kreditu ' + this.data.naziv, 'U redu', {
        duration: 2500
      });
    }, (error : Error) => {
      this.snackBar.open('Dogodila se greška. Pokušajte ponovo.', 'Zatvori', {
        duration: 2500
      });
    });
  }

  public update() : void {
    this.kreditService.updateCredit(this.data)
    .subscribe(data =>{
      this.snackBar.open('Uspešno ste modifikovali podatke o kreditu ' + this.data.naziv, 'U redu', {
        duration: 2500
      });
    }, (error : Error) => {
      this.snackBar.open('Dogodila se greška. Pokušajte ponovo.', 'Zatvori', {
        duration: 2500
      });
    });
  }

  public delete() : void{
    this.kreditService.deleteCredit(this.data.id)
      .subscribe(() => {
        this.snackBar.open('Uspešno ste obrisali podatke o kreditu', 'U redu', {
          duration: 2500
        });
      }, (error : Error) => {
        this.snackBar.open('Dogodila se greška. Pokušajte ponovo.', 'Zatvori', {
          duration: 2500
        });
      });
  }

  public cancel() : void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste od izmena', 'U redu', {
      duration: 1500
    });
  }

}
