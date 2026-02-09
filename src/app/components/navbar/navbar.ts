import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { CommonModule, ViewportScroller, isPlatformBrowser } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarComponent implements OnInit {
  isHome: boolean = true;
  isMobileMenuOpen: boolean = false;
  isHidden: boolean = false;
  isScrolled: boolean = false;
  private lastScrollTop: number = 0;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private viewportScroller: ViewportScroller
  ) { }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      const currentScroll = window.scrollY || document.documentElement.scrollTop;
      if (currentScroll > this.lastScrollTop && currentScroll > 50) {
        this.isHidden = true;
      } else {
        this.isHidden = false;
      }
      this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
      this.isScrolled = currentScroll > 50;
    }
  }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.isHome = event.url === '/' || event.url === '/home';
      this.isMobileMenuOpen = false; // Close mobile menu on navigation
    });

    // Initial check
    this.isHome = this.router.url === '/' || this.router.url === '/home';
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (this.isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  scrollToContact() {
    this.isMobileMenuOpen = false;
    document.body.style.overflow = '';

    if (this.router.url === '/' || this.router.url === '/home') {
      this.viewportScroller.scrollToAnchor('contact');
    } else {
      this.router.navigate(['/home']).then(() => {
        // Small timeout to allow page to load/render before scrolling
        setTimeout(() => {
          this.viewportScroller.scrollToAnchor('contact');
        }, 100);
      });
    }
  }
}
