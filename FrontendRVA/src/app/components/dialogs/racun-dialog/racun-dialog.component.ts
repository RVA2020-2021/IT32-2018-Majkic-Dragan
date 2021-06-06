import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Racun } from 'src/app/models/racun';
import { TipRacuna } from 'src/app/models/tipRacuna';
import { RacunService } from 'src/app/services/racun.service';
import { TipRacunaService } from 'src/app/services/tip-racuna.service';

@Component({
  selector: 'app-racun-dialog',
  templateUrl: './racun-dialog.component.html',
  styleUrls: ['./racun-dialog.component.css']
})
export class RacunDialogComponent implements OnInit, OnDestroy {

  public flag: number;
  tipoviRacuna: TipRacuna[];
  tipoviRacunaSubscription: Subscription;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<RacunDialogComponent>,
              @Inject (MAT_DIALOG_DATA) public data: Racun,
              public racunService: RacunService,
              public tipRacunService: TipRacunaService) { }

  ngOnInit(): void {
    console.log(this.data.tipRacuna)
    this.tipoviRacunaSubscription = this.tipRacunService.getBillTypes()
    .subscribe(data => {
      this.tipoviRacuna = data;
    });
  }

  ngOnDestroy(): void {
    this.tipoviRacunaSubscription.unsubscribe();
  }

  compareTo(a, b){
    return a.id == b.id;
  }

  public add() : void {
    this.racunService.addBill(this.data)
    .subscribe(data =>{
      this.snackBar.open('Uspešno ste dodali podatke o novom računu ' + this.data.naziv, 'U redu', {
        duration: 2500
      });
    }, (error : Error) => {
      this.snackBar.open('Dogodila se greška. Pokušajte ponovo.', 'Zatvori', {
        duration: 2500
      });
    });
  }

  public update() : void {
    this.racunService.updateBill(this.data)
    .subscribe(data =>{
      this.snackBar.open('Uspešno ste modifikovali podatke o računu ' + this.data.naziv, 'U redu', {
        duration: 2500
      });
    }, (error : Error) => {
      this.snackBar.open('Dogodila se greška. Pokušajte ponovo.', 'Zatvori', {
        duration: 2500
      });
    });
  }

  public delete() : void{
    this.racunService.deleteBill(this.data.id)
      .subscribe(() => {
        this.snackBar.open('Uspešno ste obrisali podatke o računu', 'U redu', {
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
