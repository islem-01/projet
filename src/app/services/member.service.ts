import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Member {
  id?: number; // JSON Server ajoutera l'id automatiquement
  cin: string;
  name: string;
  type: string;
  cv: string;
}

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private apiUrl = 'http://localhost:3000/members';

  constructor(private httpClient: HttpClient) { }

  GetAllMembers(): Observable<Member[]> {
    
        // envoyer une requete en mode get vers le back end pour recuperer la liste des membres
        return this.httpClient.get<Member[]>('http://localhost:3000/members');
      }
  
  // Récupérer tous les membres
  getMembers(): Observable<Member[]> {
    return this.httpClient.get<Member[]>(this.apiUrl);
  }

  // Ajouter un membre
  addMember(member: Member): Observable<void> {
    return this.httpClient.post<void>('http://localhost:3000/members', member);
  }

  // Supprimer un membre
  deleteMember(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }
  getMemberById(id: number): Observable<Member> {
    return this.httpClient.get<Member>(`http://localhost:3000/members/${id}`);
  }

  updateMember(id: number, member: Member): Observable<void> {
  return this.httpClient.put<void>(`http://localhost:3000/members/${id}`, member);
}




 
}
