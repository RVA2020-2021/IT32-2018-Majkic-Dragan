import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { TipRacuna } from 'src/app/models/tipRacuna';
import { TipRacunaService } from 'src/app/services/tip-racuna.service';
import { TipRacunaDialogComponent } from '../dialogs/tip-racuna-dialog/tip-racuna-dialog.component';

@Component({
  selector: 'app-tip-racuna',
  templateUrl: './tip-racuna.component.html',
  styleUrls: ['./tip-racuna.component.css']
})
export class TipRacunaComponent implements OnInit, OnDestroy {

  displayedColumns = ['id', 'naziv', 'opis', 'oznaka', 'actions'];
  dataSource : MatTableDataSource<TipRacuna>;
  subscription : Subscription;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private tipRacunaService: TipRacunaService,
    public dialog : MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public loadData(){
    this.subscription = this.tipRacunaService.getBillTypes()
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }),
      (error : Error) => {
        console.log(error.name + ' ' + error.message);
      };
  }

  public openDialog(flag : number, id? : number, naziv? : string, opis? : string, oznaka? : string){
    //+ je 1, update je 2, delete je 3
    const dialogRef = this.dialog.open(TipRacunaDialogComponent, {data: {id, naziv, opis, oznaka}});
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed()
      .subscribe(result => {
        if(result === 1){
          this.loadData();
        }
      });
  }

  applyFilter(filterValue: string){
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();

    this.dataSource.filter = filterValue;
  }

}
