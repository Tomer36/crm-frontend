import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../interfaces/contact.interface'; // Adjust the path according to your project structure

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private apiUrl = 'http://localhost:8081/api/customers'; // Replace with your API endpoint

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl);
  }

  getContact(id: number): Observable<Contact> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Contact>(url);
  }

  addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.apiUrl, contact, this.httpOptions);
  }

  updateContact(id: number, contact: Contact): Observable<Contact> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Contact>(url, contact, this.httpOptions);
  }

  deleteContact(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url, this.httpOptions);
  }
}
