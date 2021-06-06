import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TipRacuna } from './../../../models/tipRacuna';
import { TipRacunaService } from 'src/app/services/tip-racuna.service';

@Component({
  selector: 'app-tip-racuna-dialog',
  templateUrl: './tip-racuna-dialog.component.html',
  styleUrls: ['./tip-racuna-dialog.component.css']
})
export class TipRacunaDialogComponent implements OnInit {
  public flag: number;

  constructor(public snackBar : MatSnackBar,
              public dialogRef : MatDialogRef<TipRacunaDialogComponent>,
              @Inject (MAT_DIALOG_DATA) public data : TipRacuna,
              public tipRacunaService : TipRacunaService) { }

  ngOnInit(): void {
  }

  public add() : void {
    this.tipRacunaService.addBillType(this.data)
    .subscribe(data =>{
      this.snackBar.open('Uspešno ste dodali podatke o novom tipu računa ' + this.data.naziv, 'U redu', {
        duration: 2500
      });
    }, (error : Error) => {
      this.snackBar.open('Dogodila se greška. Pokušajte ponovo.', 'Zatvori', {
        duration: 2500
      });
    });
  }

  public update() : void {
    this.tipRacunaService.updateBillType(this.data)
    .subscribe(data =>{
      this.snackBar.open('Uspešno ste modifikovali podatke o tipu računa ' + this.data.naziv, 'U redu', {
        duration: 2500
      });
    }, (error : Error) => {
      this.snackBar.open('Dogodila se greška. Pokušajte ponovo.', 'Zatvori', {
        duration: 2500
      });
    });
  }

  public delete() : void{
    this.tipRacunaService.deleteBillType(this.data.id)
      .subscribe(() => {
        this.snackBar.open('Uspešno ste obrisali podatke o tipu računa', 'U redu', {
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
