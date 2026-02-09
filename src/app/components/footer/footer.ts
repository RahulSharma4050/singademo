import { Component, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class FooterComponent implements AfterViewInit {

  // Form Data Model
  contactData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  isSending = false;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit() {
    // ... existing observer code ...
    const footerElement = this.el.nativeElement.querySelector('.main-footer');
    if (footerElement) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.renderer.addClass(footerElement, 'section-visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1
      });

      observer.observe(footerElement);
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();

    if (this.isSending) return;
    this.isSending = true;


    const serviceID = 'service_wsow4ji';
    const templateID = 'template_462icbp';
    const publicKey = 'hdHaIsFjrRdm5orFz';

    const templateParams = {
      name: this.contactData.name,
      email: this.contactData.email,
      subject: this.contactData.subject,
      message: this.contactData.message,
      time: new Date().toLocaleString(),
      to_email: 'singgaofficial@gmail.com',
    };

    emailjs.send(serviceID, templateID, templateParams, publicKey)
      .then(
        () => {
          Swal.fire({
            title: 'Message Received!',
            text: 'Love from Singga ❤️',
            icon: 'success',
            confirmButtonText: 'Great!',
            confirmButtonColor: '#E6DCC3',
            background: '#1a0f0d',
            color: '#E6DCC3',
            iconColor: '#E6DCC3'
          });
          // Reset form
          this.contactData = { name: '', email: '', subject: '', message: '' };
          this.isSending = false;
        },
        (error: any) => {
          console.error('FAILED...', error.text);
          Swal.fire({
            title: 'Oops...',
            text: 'Something went wrong! Please try again later.',
            icon: 'error',
            confirmButtonColor: '#E6DCC3',
            background: '#1a0f0d',
            color: '#E6DCC3'
          });
          this.isSending = false;
        },
      );
  }
}
