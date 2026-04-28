import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  contact = {
    name: '',
    email: '',
    message: '',
  };

  onSubmit() {
    console.log('Contact Form Submitted:', this.contact);
  }
}
