import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Klijent } from 'src/app/models/klijent';
import { Kredit } from 'src/app/models/kredit';
import { KlijentService } from 'src/app/services/klijent.service';
import { KlijentDialogComponent } from '../dialogs/klijent-dialog/klijent-dialog.component';

@Component({
  selector: 'app-klijent',
  templateUrl: './klijent.component.html',
  styleUrls: ['./klijent.component.css']
})
export class KlijentComponent implements OnInit, OnDestroy {

  displayedColumns = ['id', 'brojLk', 'ime', 'prezime', 'kredit', 'actions'];
  dataSource : MatTableDataSource<Klijent>;
  selectedClient : Klijent;
  subscription : Subscription;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private klijentService: KlijentService,
    public dialog : MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public loadData(){
    this.subscription = this.klijentService.getAllClients()
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);

        this.dataSource.filterPredicate = (data, filter: string) => {
          const accumulator = (currentTerm, key) => {
            return key === 'kredit' ? currentTerm + data.kredit.naziv : currentTerm + data[key];
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };

        this.dataSource.sortingDataAccessor = (data, property) => {
          switch (property) {
            case 'kredit': return data.kredit.naziv.toLocaleLowerCase();
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

  public openDialog(flag : number, id? : number, ime? : string, prezime? : string, brojLk? : string, kredit? : Kredit){
    //+ je 1, update je 2, delete je 3
    const dialogRef = this.dialog.open(KlijentDialogComponent, {data: {id, ime, prezime, brojLk, kredit}});
    dialogRef.componentInstance.flag = flag;  //postaljanje svrhe dijaloga preko flaga pomocu component Instance za pristup flag-u unutar dialoga
    dialogRef.afterClosed()
      .subscribe(result => {
        if(result === 1){
          this.loadData();
        }
        if(result === 2){
          this.loadData();
          this.selectedClient = null;
        }
      });
  }

  selectRow(row: any){
    this.selectedClient = row;
  }

  applyFilter(filterValue: string){
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();

    this.dataSource.filter = filterValue;
  }

}
