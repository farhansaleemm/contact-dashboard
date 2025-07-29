import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact.model';
import { EmailAddress } from '../models/email.model';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private apiUrl = 'https://68871f93071f195ca97f5b27.mockapi.io/'; // Replace with real mockapi.io URL

  constructor(private http: HttpClient) {}

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl+'/contacts');
  }

  getEmailAddresses(contactId: string): any {
    return this.http.get<Contact[]>(`${this.apiUrl}/email_addresess?contactId=${contactId}`);
  }
  
}