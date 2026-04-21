import { HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evt } from '../models/Evt';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http:HttpClient) { }

  getAllEvents(): Observable<Evt[]> {
    return this.http.get<Evt[]>('http://localhost:3000/Evt');
  }

  addEvent(event: Evt): Observable<Evt> {
    return this.http.post<Evt>('http://localhost:3000/Evt', event);
  }
  GetEventById(id: string): Observable<Evt> {
    return this.http.get<Evt>(`http://localhost:3000/Evt/${id}`);
  }
}
