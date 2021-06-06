import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Klijent } from '../models/klijent';
import { KLIJENT_URL } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class KlijentService {

  constructor(private httpClient: HttpClient) { }

  public getAllClients() : Observable<any>{
    return this.httpClient.get(`${KLIJENT_URL}`);
  }

  public addClient(klijent: Klijent) : Observable<any>{
    klijent.id = 0;
    return this.httpClient.post(`${KLIJENT_URL}`, klijent);
  }

  public updateClient(klijent: Klijent) : Observable<any>{
    return this.httpClient.put(`${KLIJENT_URL}`, klijent);
  }

  public deleteClient(id: number) : Observable<any>{
    return this.httpClient.delete(`${KLIJENT_URL}/${id}`);
  }
}
