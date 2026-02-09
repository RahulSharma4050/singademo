import { Component, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class FooterComponent implements AfterViewInit {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit() {
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
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    console.log('Form Data:', Object.fromEntries(formData.entries()));
    alert('Thank you for your message! Our team will contact you soon.');
    form.reset();
  }
}
