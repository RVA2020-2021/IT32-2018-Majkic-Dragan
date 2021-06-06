import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Klijent } from './../../../models/klijent';
import { KlijentService } from 'src/app/services/klijent.service';
import { Kredit } from 'src/app/models/kredit';
import { KreditService } from 'src/app/services/kredit.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-klijent-dialog',
  templateUrl: './klijent-dialog.component.html',
  styleUrls: ['./klijent-dialog.component.css']
})
export class KlijentDialogComponent implements OnInit, OnDestroy {

  public flag: number;
  krediti: Kredit[];
  kreditSubscription: Subscription;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<KlijentDialogComponent>,
              @Inject (MAT_DIALOG_DATA) public data: Klijent,
              public klijentService: KlijentService,
              public kreditService: KreditService) { }

  ngOnInit(): void {
    this.kreditSubscription = this.kreditService.getAllCredits()
      .subscribe(data => {
        this.krediti = data;
      });
  }

  ngOnDestroy(): void {
    this.kreditSubscription.unsubscribe();
  }

  compareTo(a, b){
    return a.id == b.id;
  }

  public add() : void {
    this.klijentService.addClient(this.data)
    .subscribe(data =>{
      this.snackBar.open('Uspešno ste dodali novog klijenta ' + this.data.ime, 'U redu', {
        duration: 2500
      });
    }, (error : Error) => {
      this.snackBar.open('Dogodila se greška. Pokušajte ponovo.', 'Zatvori', {
        duration: 2500
      });
    });
  }

  public update() : void {
    this.klijentService.updateClient(this.data)
    .subscribe(data =>{
      this.snackBar.open('Uspešno ste modifikovali podatke o klijentu ' + this.data.ime, 'U redu', {
        duration: 2500
      });
    }, (error : Error) => {
      this.snackBar.open('Dogodila se greška. Pokušajte ponovo.', 'Zatvori', {
        duration: 2500
      });
    });
  }

  public delete() : void{
    this.klijentService.deleteClient(this.data.id)
      .subscribe(() => {
        this.snackBar.open('Uspešno ste obrisali podatke o klijentu', 'U redu', {
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
