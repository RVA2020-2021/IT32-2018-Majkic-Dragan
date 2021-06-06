import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RACUNI_KLIJENTA_URL, RACUN_URL } from '../app.constants';
import { Racun } from '../models/racun';

@Injectable({
  providedIn: 'root'
})
export class RacunService {

  constructor(private httpClient: HttpClient) { }

  public getClientBills(idKlijenta: number): Observable<any>{
    return this.httpClient.get(`${RACUNI_KLIJENTA_URL}/${idKlijenta}`);
  }

  public addBill(racun : Racun) : Observable<any>{
    racun.id = 0;
    return this.httpClient.post(`${RACUN_URL}`, racun);
  }

  public updateBill(racun: Racun) : Observable<any>{
    return this.httpClient.put(`${RACUN_URL}`, racun);
  }

  public deleteBill(id: number) : Observable<any>{
    return this.httpClient.delete(`${RACUN_URL}/${id}`);
  }
}
