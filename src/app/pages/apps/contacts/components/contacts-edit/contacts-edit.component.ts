import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Contact } from '../../interfaces/contact.interface';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { ContactsService } from '../../services/contacts.service';
import { CustomDateAdapter, CUSTOM_DATE_FORMATS } from './custom-date-adapter';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';

export let contactIdCounter = 10001557;

@Component({
  selector: 'vex-contacts-edit',
  templateUrl: './contacts-edit.component.html',
  styleUrls: ['./contacts-edit.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    NgIf,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule
  ],
  providers: [
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS }
  ]
})
export class ContactsEditComponent implements OnInit {
  form = this.fb.group({
    name: this.fb.control('', { nonNullable: true }),
    email: this.fb.control('', { nonNullable: true }),
    phone1: this.fb.control('', { nonNullable: true }),
    phone2: this.fb.control('', { nonNullable: true }),
    telephone: this.fb.control('', { nonNullable: true }),
    businessId: this.fb.control('', { nonNullable: true }),
    birthday: this.fb.control('', { nonNullable: true })
  });

  contact?: Contact;

  get isEdit(): boolean {
    return !!this.contactId;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) private contactId: Contact['id'],
    private dialogRef: MatDialogRef<ContactsEditComponent>,
    private fb: FormBuilder,
    private contactsService: ContactsService
  ) {}

  ngOnInit() {
    if (this.contactId) {
      this.contactsService.getContact(this.contactId).subscribe({
        next: (contact) => {
          if (contact) {
            this.contact = contact;
            this.form.patchValue({
              name: contact.name,
              email: contact.email || '',
              phone1: contact.phone1 || '',
              phone2: contact.phone2 || '',
              telephone: contact.telephone || '',
              businessId: contact.businessId || '',
              birthday: contact.birthday ? this.formatDateForInput(new Date(contact.birthday)) : ''
            });
          } else {
            console.error('Contact not found');
          }
        },
        error: (err) => console.error('Error loading contact', err)
      });
    }
  }

  save() {
    const formValue = this.form.getRawValue();
    const contactData: Contact = {
      ...formValue,
      id: this.contact?.id || contactIdCounter++ // Use existing ID or generate a new one
    };

    // Convert the date to ISO string without timezone adjustment before sending it to the API
    if (contactData.birthday) {
      const birthdayDate = new Date(contactData.birthday); // Convert to Date object
      contactData.birthday = this.formatDateForApi(birthdayDate); // Format the date
    }

    if (this.isEdit) {
      // Check if contactData.id is defined before calling updateContact
      if (contactData.id !== undefined) {
        this.contactsService.updateContact(contactData.id, contactData).subscribe({
          next: (updatedContact) => {
            console.log('Contact updated successfully:', updatedContact);
            this.dialogRef.close(updatedContact); // Pass the updated contact back
          },
          error: (err) => console.error('Error updating contact', err)
        });
      } else {
        console.error('Contact ID is undefined, cannot update contact');
      }
    } else {
      // Create new contact
      this.contactsService.createContact(contactData).subscribe({
        next: (newContact) => {
          console.log('Contact created successfully:', newContact);
          this.dialogRef.close(newContact); // Pass the new contact back
        },
        error: (err) => console.error('Error creating contact', err)
      });
    }
  }

  private formatDateForInput(date: Date): string {
    // Format the date as yyyy-MM-dd for the input field
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  private formatDateForApi(date: Date): string {
    // Adjust the date to ignore the timezone offset
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
}
