import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TIP_RACUNA_URL } from '../app.constants';
import { TipRacuna } from '../models/tipRacuna';

@Injectable({
  providedIn: 'root'
})
export class TipRacunaService {

  constructor(private httpClient: HttpClient) { }

  public getBillTypes() : Observable<any>{
    return this.httpClient.get(`${TIP_RACUNA_URL}`);
  }

  public addBillType(tipRacuna: TipRacuna) : Observable<any>{
    tipRacuna.id = 0;
    return this.httpClient.post(`${TIP_RACUNA_URL}`, tipRacuna);
  }

  public updateBillType(tipRacuna: TipRacuna) : Observable<any>{
    return this.httpClient.put(`${TIP_RACUNA_URL}`, tipRacuna);
  }

  public deleteBillType(id: number) : Observable<any>{
    return this.httpClient.delete(`${TIP_RACUNA_URL}/${id}`);
  }
}
