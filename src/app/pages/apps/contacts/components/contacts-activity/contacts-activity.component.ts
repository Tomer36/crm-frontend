// import { Component, Inject, OnInit } from '@angular/core';
// import {
//   MAT_DIALOG_DATA,
//   MatDialogModule,
//   MatDialogRef
// } from '@angular/material/dialog';
// import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
// import { Contact } from '../../interfaces/contact.interface';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatInputModule } from '@angular/material/input';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatDividerModule } from '@angular/material/divider';
// import { MatMenuModule } from '@angular/material/menu';
// import { MatIconModule } from '@angular/material/icon';
// import { MatButtonModule } from '@angular/material/button';
// import { NgIf } from '@angular/common';
// import { ContactsService } from '../../services/contacts.service';

// export let contactIdCounter = 50;

// @Component({
//   selector: 'vex-contacts-edit',
//   templateUrl: './contacts-activity.component.html',
//   styleUrls: ['./contacts-activity.component.scss'],
//   standalone: true,
//   imports: [
//     ReactiveFormsModule,
//     MatDialogModule,
//     NgIf,
//     MatButtonModule,
//     MatIconModule,
//     MatMenuModule,
//     MatDividerModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatDatepickerModule
//   ]
// })
// export class ContactsActivityComponent implements OnInit {
//   form = this.fb.group({
//     name: this.fb.control('', { nonNullable: true }),
//     email: this.fb.control('', { nonNullable: true }),
//     phone: this.fb.control('', { nonNullable: true }),
//     company: this.fb.control('', { nonNullable: true }),
//     notes: this.fb.control('', { nonNullable: true }),
//     birthday: this.fb.control('', { nonNullable: true })
//   });

//   contact?: Contact;

//   get isEdit(): boolean {
//     return !!this.contactId;
//   }

//   constructor(
//     @Inject(MAT_DIALOG_DATA) private contactId: Contact['id'],
//     private dialogRef: MatDialogRef<ContactsActivityComponent>,
//     private fb: FormBuilder,
//     private contactsService: ContactsService // Inject ContactsService
//   ) {}

//   ngOnInit() {
//     if (this.contactId) {
//       this.contactsService.getContact(this.contactId).subscribe({
//         next: (contact) => {
//           if (contact) {
//             this.contact = contact;
//             this.form.patchValue(this.contact);
//           } else {
//             throw new Error('Contact not found');
//           }
//         },
//         error: (err) => console.error('Error loading contact', err)
//       });
//     }
//   }

//   save() {
//     const form = this.form.getRawValue();

//     if (!this.contact) {
//       this.contact = {
//         ...form,
//         imageSrc: '',
//         id: contactIdCounter++
//       };
//     }

//     this.contact.name = form.name;
//     this.contact.email = form.email;
//     this.contact.phone1 = form.phone;
//     this.contact.birthday = form.birthday;

//     this.dialogRef.close(this.contact); // Pass the updated contact back
//   }
// }
