import { Component, ElementRef, HostListener, OnDestroy, OnInit, Renderer2, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  private images = [
    'assets/homepage/9.jpg',
    'assets/homepage/DSC02465.JPG',
    'assets/homepage/DSC02591.JPG',
    'assets/homepage/DSC02885.JPG',
    'assets/homepage/DSC02928.JPG',
    'assets/homepage/DSC03005.JPG',
    'assets/homepage/DSC03269.JPG',
    'assets/homepage/DSC03407.JPG',
    'assets/homepage/DSC03559.JPG',
    'assets/homepage/DSC04131.JPG',
    'assets/homepage/DSC05594.JPG'
  ];

  musicList: { title: string; image: string; link: string }[] = [];
  activeTab: string = 'posters';
  isLoaded: boolean = false;
  expandedProject: number | null = null;

  upcomingProjects = [
    { id: 1, title: 'Bille Bille Nain', image: 'assets/UpcomingProjects/Bille Bille Nain.PNG', year: '2025', letter: 'S' },
    { id: 2, title: 'Dekhi Chal', image: 'assets/UpcomingProjects/Dekhi Chal.jpeg', year: '2025', letter: 'I' },
    { id: 3, title: 'Dil Tutteya Anthem', image: 'assets/UpcomingProjects/Dil Tutteya Anthem.PNG', year: '2025', letter: 'N' },
    { id: 4, title: 'Gym Gym', image: 'assets/UpcomingProjects/Gym Gym.jpg.jpeg', year: '2025', letter: 'G' },
    { id: 5, title: 'Tarminal 2', image: 'assets/UpcomingProjects/Tarminal  2.jpg.jpeg', year: '2025', letter: 'G' },
    { id: 6, title: 'You Know', image: 'assets/UpcomingProjects/You Know.jpg.jpeg', year: '2025', letter: 'A' }
  ];

  private carouselInterval: any;


  private lastMouseX = 0;
  private lastMouseY = 0;
  private zIndexCounter = 500;
  private minDistance = 70;
  private autoSpawnInterval: any;

  private imagePool: HTMLImageElement[] = [];
  private poolSize = 12;
  private poolIndex = 0;
  private isProcessingMove = false;

  constructor(private renderer: Renderer2, private el: ElementRef, private cdr: ChangeDetectorRef, private router: Router) { }

  ngOnInit() {
    this.checkMobileState();
    this.generateMusicList();
    this.preloadImages();
  }

  private preloadImages() {
    this.images.forEach(url => {
      const img = new Image();
      img.src = url;
    });
  }



  generateMusicList() {
    // Labels renamed: 'Posters' are now shown under 'Songs' as requested
    this.musicList = Array.from({ length: 24 }, (_, i) => ({
      title: `Poster ${i + 1}`,
      image: `/assets/Posters/${i + 1}.jpeg`,
      link: ''
    })).filter(item => item.title !== 'Poster 2');
  }


  ngAfterViewInit() {
    this.initImagePool();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.renderer.addClass(entry.target, 'section-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0 });

    const heroSection = this.el.nativeElement.querySelector('.hero-section');
    if (heroSection) {
      observer.observe(heroSection);
    }

    const navSection = this.el.nativeElement.querySelector('.navigation-section');
    if (navSection) {
      const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.renderer.addClass(entry.target, 'section-visible');
            navObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });
      navObserver.observe(navSection);
    }

    const aboutSection = this.el.nativeElement.querySelector('.about-section');
    if (aboutSection) {
      const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.renderer.addClass(entry.target, 'section-visible');
            aboutObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });
      aboutObserver.observe(aboutSection);
    }

    const productionSection = this.el.nativeElement.querySelector('.production-section');
    if (productionSection) {
      const productionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.renderer.addClass(entry.target, 'section-visible');
            productionObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });
      productionObserver.observe(productionSection);
    }

    const trailerSection = this.el.nativeElement.querySelector('.trailer-section');
    if (trailerSection) {
      observer.observe(trailerSection);

      const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.playTrailerPreview();
            videoObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      videoObserver.observe(trailerSection);
    }

    const musicSection = this.el.nativeElement.querySelector('.music-section');
    if (musicSection) {
      observer.observe(musicSection);
      this.startMusicCarousel();
    }

    const upcomingSection = this.el.nativeElement.querySelector('.upcoming-section');
    if (upcomingSection) {
      const projectsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.renderer.addClass(entry.target, 'section-visible');
            projectsObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      projectsObserver.observe(upcomingSection);
    }

    const gallerySection = this.el.nativeElement.querySelector('.gallery-section');
    if (gallerySection) {
      const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.renderer.addClass(entry.target, 'section-visible');
            galleryObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      galleryObserver.observe(gallerySection);
    }

    setTimeout(() => {
      this.isLoaded = true;
      this.cdr.detectChanges();
    }, 800);
  }

  private initImagePool() {
    const container = this.el.nativeElement.querySelector('.home-container');
    if (!container) return;

    for (let i = 0; i < this.poolSize; i++) {
      const img = this.renderer.createElement('img');
      this.renderer.setStyle(img, 'display', 'none');
      this.renderer.setStyle(img, 'position', 'absolute');
      this.renderer.addClass(img, 'trail-image');
      this.renderer.appendChild(container, img);
      this.imagePool.push(img);
    }
  }

  startMusicCarousel() {
    const carousel = this.el.nativeElement.querySelector('.music-carousel');
    if (!carousel) return;

    if (this.carouselInterval) clearInterval(this.carouselInterval);

    this.carouselInterval = setInterval(() => {
      const cardWidth = 300 + 32;
      const maxScroll = carousel.scrollWidth - carousel.clientWidth;

      if (carousel.scrollLeft >= maxScroll - 10) {
        carousel.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        carousel.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }

    }, 3000);
  }

  scrollMusic(direction: 'left' | 'right') {
    const carousel = this.el.nativeElement.querySelector('.music-carousel');
    if (carousel) {
      const scrollAmount = 332;
      if (direction === 'left') {
        carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
      this.startMusicCarousel();
    }
  }

  openVideo(link: string) {
    if (link) {
      window.open(link, '_blank');
    }
  }


  private playTrailerPreview() {
    const iframe = this.el.nativeElement.querySelector('iframe');
    if (iframe) {
      const videoId = 's6-mAmtUnPw';
      setTimeout(() => {
        const newSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=1&loop=1&playlist=${videoId}&playsinline=1&rel=0`;
        this.renderer.setAttribute(iframe, 'src', newSrc);
      }, 3500);
    }
  }


  ngOnDestroy() {
    this.stopAutoSpawn();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkMobileState();
  }

  private isMobile(): boolean {
    return window.innerWidth < 768;
  }

  private checkMobileState() {
    const mobile = this.isMobile();
    if (mobile && !this.autoSpawnInterval) {
      this.startAutoSpawn();
    } else if (!mobile && this.autoSpawnInterval) {
      this.stopAutoSpawn();
    }
  }

  private stopAutoSpawn() {
    if (this.autoSpawnInterval) {
      clearInterval(this.autoSpawnInterval);
      this.autoSpawnInterval = null;
    }
  }

  private startAutoSpawn() {
    this.autoSpawnInterval = setInterval(() => {
      if (!this.isMobile()) {
        this.stopAutoSpawn();
        return;
      }

      const jitter = 30;
      const x = (window.innerWidth / 2) + ((Math.random() * jitter * 2) - jitter);
      const y = (window.innerHeight / 2) + ((Math.random() * jitter * 2) - jitter);

      this.spawnImage(x, y, true);
    }, 2000);
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (this.isProcessingMove) return;

    this.isProcessingMove = true;
    window.requestAnimationFrame(() => {
      const scrollY = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const isInNavSection = scrollY >= windowHeight * 0.5;

      const cursor = this.el.nativeElement.querySelector('.custom-cursor');
      if (cursor) {
        this.renderer.removeStyle(cursor, 'display');
        this.renderer.setStyle(cursor, 'left', `${e.clientX}px`);
        this.renderer.setStyle(cursor, 'top', `${e.clientY}px`);
      }

      if (isInNavSection) {
        this.isProcessingMove = false;
        return;
      }

      const distance = Math.hypot(e.clientX - this.lastMouseX, e.clientY - this.lastMouseY);

      if (distance > this.minDistance && !this.isMobile()) {
        this.spawnImage(e.pageX, e.pageY);
        this.lastMouseX = e.clientX;
        this.lastMouseY = e.clientY;
      }
      this.isProcessingMove = false;
    });
  }

  private spawnImage(x: number, y: number, isShowcase: boolean = false) {
    const img = this.imagePool[this.poolIndex];
    this.poolIndex = (this.poolIndex + 1) % this.imagePool.length;

    const imgUrl = this.images[Math.floor(Math.random() * this.images.length)];
    this.renderer.setAttribute(img, 'src', imgUrl);

    if (isShowcase) {
      this.renderer.addClass(img, 'mobile-showcase-image');
      this.renderer.removeClass(img, 'trail-image');
    } else {
      this.renderer.addClass(img, 'trail-image');
      this.renderer.removeClass(img, 'mobile-showcase-image');
      const rotation = (Math.random() * 30) - 15;
      this.renderer.setStyle(img, 'transform', `translate(-50%, -50%) rotate(${rotation}deg) scale(0.5)`);
    }

    this.renderer.setStyle(img, 'left', `${x}px`);
    this.renderer.setStyle(img, 'top', `${y}px`);
    this.renderer.setStyle(img, 'zIndex', `${this.zIndexCounter++}`);
    this.renderer.setStyle(img, 'display', 'block');

    const timeout = isShowcase ? 2000 : 1000;
    setTimeout(() => {
      this.renderer.setStyle(img, 'display', 'none');
    }, timeout);
  }
  navigateToGallery() {
    console.log('Navigating to Gallery...');
    this.router.navigate(['/gallery']);
  }

  scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
