import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact.model';

/**
 * Service layer encapsulates all HTTP logic.
 * Assumption: Email data is structured under a separate /email_addresses endpoint.
 * In a real app, error handling, retry logic, and caching should be added.
 */
@Injectable({ providedIn: 'root' })
export class ContactService {
  private apiUrl = 'https://68871f93071f195ca97f5b27.mockapi.io'; // Replace with your mockapi.io base URL

  constructor(private http: HttpClient) {}

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiUrl}/contacts`);
  }

  getEmailAddresses(contactId: string): Observable<any> {
    // did not used  /contacts/{id}/email_addresses
    // because mockapi.io(mentioned in assignment file) does not support nested routes
    // so used  /email_addresses?contactId=?
    return this.http.get<any[]>(`${this.apiUrl}/email_addresess?contactId=${contactId}`);
  }
}
