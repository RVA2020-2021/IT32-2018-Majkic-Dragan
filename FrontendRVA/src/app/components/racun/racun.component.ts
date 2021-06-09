import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Klijent } from 'src/app/models/klijent';
import { Racun } from 'src/app/models/racun';
import { TipRacuna } from 'src/app/models/tipRacuna';
import { RacunService } from 'src/app/services/racun.service';
import { RacunDialogComponent } from '../dialogs/racun-dialog/racun-dialog.component';

@Component({
  selector: 'app-racun',
  templateUrl: './racun.component.html',
  styleUrls: ['./racun.component.css']
})
export class RacunComponent implements OnInit, OnChanges {

  displayedColumns = ['id', 'naziv', 'opis', 'oznaka', 'klijent', 'tipRacuna', 'actions'];
  dataSource : MatTableDataSource<Racun>;
  subscription : Subscription;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  @Input() selectedClient: Klijent;

  constructor(private racunService: RacunService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    //this.loadData();
  }

  ngOnChanges(): void {
    if(this.selectedClient.id){
      this.loadData();
    }
  }


  public loadData(){
    this.racunService.getClientBills(this.selectedClient.id)
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);

        this.dataSource.filterPredicate = (data, filter: string) => {
          const accumulator = (currentTerm, key) => {
            return key === 'tipRacuna' ? currentTerm + data.tipRacuna.naziv : currentTerm + data[key];
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };

        this.dataSource.sortingDataAccessor = (data, property) => {
          switch (property) {
            case 'tipRacuna': return data.tipRacuna.naziv.toLocaleLowerCase();
            default: return data[property];
          }
        };

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }),
      (error : Error) => {
        console.log(error.name + ' ' + error.message);
      };
  }

  public openDialog(flag : number, id? : number, naziv? : string, opis? : string, oznaka? : string, klijent? : Klijent, tipRacuna? : TipRacuna){
    //+ je 1, update je 2, delete je 3
    const dialogRef = this.dialog.open(RacunDialogComponent, {data: {id, naziv, opis, oznaka, klijent, tipRacuna}});
    dialogRef.componentInstance.flag = flag;  //postaljanje svrhe dijaloga preko flaga pomocu component Instance za pristup flag-u unutar dialoga
    if(flag===1){
      dialogRef.componentInstance.data.klijent = this.selectedClient;
    }
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
