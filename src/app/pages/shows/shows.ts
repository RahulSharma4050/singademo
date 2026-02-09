import { Component, OnInit, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
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

    constructor() { }

    ngOnInit() { }

    ngAfterViewInit() {
        this.updateVideoPlayback();
    }

    setActive(index: number) {
        this.activeIndex = index;
        this.updateVideoPlayback();
    }

    next() {
        if (this.activeIndex < this.videos.length - 1) {
            this.activeIndex++;
        } else {
            this.activeIndex = 0;
        }
        this.updateVideoPlayback();
    }

    prev() {
        if (this.activeIndex > 0) {
            this.activeIndex--;
        } else {
            this.activeIndex = this.videos.length - 1;
        }
        this.updateVideoPlayback();
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
        const offset = index - this.activeIndex;
        const isCenter = index === this.activeIndex;

        let transform = `scale(${isCenter ? 1.2 : 0.8})`;
        let zIndex = isCenter ? 100 : 10 - Math.abs(offset);
        let opacity = isCenter ? 1 : 0.5;
        let filter = isCenter ? 'none' : 'blur(5px)';

        return {
            transform,
            zIndex,
            opacity,
            filter
        };
    }
}
