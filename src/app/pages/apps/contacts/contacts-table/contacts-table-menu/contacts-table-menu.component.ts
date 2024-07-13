import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { contactsData } from '../../../../../../static-data/contacts';
import { Contact } from '../../interfaces/contact.interface';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { stagger40ms } from '@vex/animations/stagger.animation';
import { MatRippleModule } from '@angular/material/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

export interface ContactsTableMenu {
  type: 'link' | 'subheading';
  id?: 'all' | 'family' | 'friends' | 'colleagues' | 'business';
  icon?: string;
  label: string;
  classes?: {
    icon?: string;
  };
}

@Component({
  selector: 'vex-contacts-table-menu',
  templateUrl: './contacts-table-menu.component.html',
  animations: [fadeInRight400ms, stagger40ms],
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    NgFor,
    NgIf,
    MatRippleModule,
    NgClass
  ]
})
export class ContactsTableMenuComponent implements OnInit {
  @Input() items: ContactsTableMenu[] = [
    {
      type: 'link',
      id: 'all',
      icon: 'mat:view_headline',
      label: 'All Contacts'
    }
  ];

  @Output() filterChange = new EventEmitter<Contact[]>();
  @Output() openAddNew = new EventEmitter<void>();

  activeCategory: ContactsTableMenu['id'] = 'all';

  constructor() {}

  ngOnInit() {}

  setFilter(category: ContactsTableMenu['id']) {
    this.activeCategory = category;

    if (category === 'all') {
      return this.filterChange.emit(contactsData);
    }

    if (
      category === 'family' ||
      category === 'friends' ||
      category === 'colleagues' ||
      category === 'business'
    ) {
      return this.filterChange.emit([]);
    }
  }

  isActive(category: ContactsTableMenu['id']) {
    return this.activeCategory === category;
  }
}
