import { Component, OnInit, ElementRef, ViewChildren, QueryList, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-shows',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './shows.html',
    styleUrl: './shows.css'
})
export class ShowsComponent implements OnInit, AfterViewInit {

    videos = [
        { id: 2, src: 'assets/Shows/2.MP4', title: 'Bhola Bhala Munda' },
        { id: 1, src: 'assets/Shows/1.mp4', title: 'Maa Bina' },
        { id: 3, src: 'assets/Shows/3.MP4', title: 'Dil Gift' }
    ];

    activeIndex = 2;

    @ViewChildren('videoPlayer') videoPlayers!: QueryList<ElementRef>;

    @ViewChild('carouselTrack') carouselTrack!: ElementRef;

    constructor() { }

    ngOnInit() { }

    ngAfterViewInit() {
        this.updateVideoPlayback();
    }

    onScroll(event: any) {
        const container = event.target;
        const scrollPosition = container.scrollLeft + (container.offsetWidth / 2);
        const children = container.querySelectorAll('.video-card');

        let closestIndex = 0;
        let closestDistance = Number.MAX_VALUE;

        children.forEach((child: HTMLElement, index: number) => {
            const childCenter = child.offsetLeft + (child.offsetWidth / 2);
            const distance = Math.abs(childCenter - scrollPosition);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
            }
        });

        if (this.activeIndex !== closestIndex) {
            this.activeIndex = closestIndex;
            // Debounce or verify if we want to autoplay while scrolling? 
            // Maybe wait for scroll end? For now, instant update is responsive.
            // this.updateVideoPlayback(); // Optional: might be too heavy during scroll
        }
    }

    setActive(index: number) {
        this.activeIndex = index;
        this.updateVideoPlayback();
        this.scrollToActive();
    }

    next() {
        if (this.activeIndex < this.videos.length - 1) {
            this.activeIndex++;
        } else {
            this.activeIndex = 0;
        }
        this.updateVideoPlayback();
        this.scrollToActive();
    }

    prev() {
        if (this.activeIndex > 0) {
            this.activeIndex--;
        } else {
            this.activeIndex = this.videos.length - 1;
        }
        this.updateVideoPlayback();
        this.scrollToActive();
    }

    scrollToActive() {
        if (this.carouselTrack) {
            const container = this.carouselTrack.nativeElement;
            const children = container.querySelectorAll('.video-card');
            if (children[this.activeIndex]) {
                const child = children[this.activeIndex] as HTMLElement;
                // Center the child
                const scrollLeft = child.offsetLeft - (container.offsetWidth / 2) + (child.offsetWidth / 2);
                container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
            }
        }
    }

    updateVideoPlayback() {
        if (!this.videoPlayers) return;

        this.videoPlayers.forEach((player, index) => {
            const video = player.nativeElement as HTMLVideoElement;
            if (index === this.activeIndex) {
                video.muted = false;
                video.play().catch(e => console.log('Autoplay prevented:', e));
            } else {
                video.pause();
                video.currentTime = 0;
            }
        });
    }

    getVideoStyle(index: number) {
        // Mobile check (simple width check or just rely on CSS override)
        // If we want detailed JS control, we can check window.innerWidth
        const isMobile = window.innerWidth <= 768;

        const offset = index - this.activeIndex;
        const isCenter = index === this.activeIndex;

        // Desktop logic usually
        let transform = `scale(${isCenter ? 1.2 : 0.8})`;
        let zIndex = isCenter ? 100 : 10 - Math.abs(offset);
        let opacity = isCenter ? 1 : 0.5;
        let filter = isCenter ? 'none' : 'blur(5px)';

        if (isMobile) {
            // For mobile, we might want less drastic scaling if screen is small
            transform = `scale(${isCenter ? 1.05 : 0.9})`;
            opacity = isCenter ? 1 : 0.6;
        }

        return {
            transform,
            zIndex,
            opacity,
            filter
        };
    }
}
