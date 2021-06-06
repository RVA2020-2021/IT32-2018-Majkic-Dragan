import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Kredit } from '../models/kredit';
import { KREDIT_URL } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class KreditService {

  constructor(private httpClient: HttpClient) { }

  public getAllCredits() : Observable<any>{
    return this.httpClient.get(`${KREDIT_URL}`);
  }

  public addCredit(kredit: Kredit) : Observable<any>{
    kredit.id = 0;
    return this.httpClient.post(`${KREDIT_URL}`, kredit);
  }

  public updateCredit(kredit: Kredit) : Observable<any>{
    return this.httpClient.put(`${KREDIT_URL}`, kredit);
  }

  public deleteCredit(id: number) : Observable<any>{
    return this.httpClient.delete(`${KREDIT_URL}/${id}`);
  }
}
