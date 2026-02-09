import { Component, OnInit, AfterViewInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-fans',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './fans.html',
    styleUrl: './fans.css'
})
export class FansComponent implements OnInit, AfterViewInit {
    @ViewChildren('videoPlayer') videoPlayers!: QueryList<ElementRef>;

    fanContent = [
        { type: 'video', src: 'assets/Fanpage/1cce222e-66d5-4f00-9160-98a61a6f1bf9 - Copy.MP4', alt: 'Fan Video' },
        { type: 'video', src: 'assets/Fanpage/246c86c5-57ea-473c-8319-10cd2468803e.MP4', alt: 'Fan Video' },
        { type: 'video', src: 'assets/Fanpage/495A44A8-2BBD-432D-9836-6BF8C1E33DB3.MP4', alt: 'Fan Video' },
        { type: 'video', src: 'assets/Fanpage/601F7C8B-F5E7-44C7-8276-BC5F44D953E5.MP4', alt: 'Fan Video' },
        { type: 'video', src: 'assets/Fanpage/6EAA24B6-7E4E-4FBA-A6F3-3EB82BC37B68 - Copy.MP4', alt: 'Fan Video' },
        { type: 'video', src: 'assets/Fanpage/70acce86-5c22-4bc7-96c9-06c9475130f7.MP4', alt: 'Fan Video' },
        { type: 'video', src: 'assets/Fanpage/9beffd17-6294-4dc7-8bf6-ba14c172d419.MP4', alt: 'Fan Video' },
        { type: 'video', src: 'assets/Fanpage/ABBC126C-C8C9-4B47-ABB4-F30081F324A4.MP4', alt: 'Fan Video' },
        { type: 'video', src: 'assets/Fanpage/B5C1E17E-07F2-4692-A73C-13B4BBCF5F82.MP4', alt: 'Fan Video' },
        { type: 'video', src: 'assets/Fanpage/C038F6EF-193B-4EE2-B417-63D0C485F804.MP4', alt: 'Fan Video' },
        { type: 'video', src: 'assets/Fanpage/CC1BE7B7-B5EB-4123-ADC8-77A8728F288E.MP4', alt: 'Fan Video' },
        { type: 'video', src: 'assets/Fanpage/DB416115-D2F6-48E4-BC9E-DA37CF87A3AC.MP4', alt: 'Fan Video' },
        { type: 'video', src: 'assets/Fanpage/DF15F8FD-5CC6-42AA-8007-CF6F5AC7B3CC.MP4', alt: 'Fan Video' },
        { type: 'video', src: 'assets/Fanpage/ECD23D56-3825-4DBC-946C-57E595707670.MP4', alt: 'Fan Video' },
        { type: 'video', src: 'assets/Fanpage/F5229177-8ED3-47B7-B894-1CEB1A98F976.MP4', alt: 'Fan Video' },
        { type: 'video', src: 'assets/Fanpage/IMG_2529.MOV', alt: 'Fan Video' },
        { type: 'video', src: 'assets/Fanpage/IMG_2576.MOV', alt: 'Fan Video' },
        { type: 'video', src: 'assets/Fanpage/WhatsApp Video 2026-02-08 at 3.47.42 PM.mp4', alt: 'Fan Video' },
        { type: 'video', src: 'assets/Fanpage/WhatsApp Video 2026-02-08 at 3.47.44 PM (1).mp4', alt: 'Fan Video' },
        { type: 'video', src: 'assets/Fanpage/WhatsApp Video 2026-02-08 at 3.47.44 PM (2).mp4', alt: 'Fan Video' },
        { type: 'video', src: 'assets/Fanpage/WhatsApp Video 2026-02-08 at 3.47.44 PM (3).mp4', alt: 'Fan Video' },
        { type: 'video', src: 'assets/Fanpage/WhatsApp Video 2026-02-08 at 3.47.44 PM.mp4', alt: 'Fan Video' },
        { type: 'video', src: 'assets/Fanpage/WhatsApp Video 2026-02-08 at 3.51.18 PM.mp4', alt: 'Fan Video' },
        { type: 'video', src: 'assets/Fanpage/WhatsApp Video 2026-02-08 at 3.51.35 PM.mp4', alt: 'Fan Video' },
        { type: 'video', src: 'assets/Fanpage/cm-chat-media-video-1_af7811a9-f735-5608-be72-28096afca7a9_3351_0_0.MOV', alt: 'Fan Video' },
        { type: 'video', src: 'assets/Fanpage/joined_video_3a3889aa4f874c069e31f0a872225665.MP4', alt: 'Fan Video' },
        { type: 'video', src: 'assets/Fanpage/pav-FC10C558-89D7-4F24-B009-365FBA316316.MOV', alt: 'Fan Video' },
    ];

    selectedItem: any = null;

    constructor() { }

    ngOnInit(): void {
    }

    ngAfterViewInit() {
        // Play previews for 2 seconds
        this.videoPlayers.forEach((player) => {
            const video = player.nativeElement as HTMLVideoElement;
            video.muted = true; // Must be muted to autoplay
            video.play().catch(e => console.log('Preview play failed', e));

            setTimeout(() => {
                video.pause();
                video.currentTime = 0; // Reset to start
            }, 2000);
        });
    }

    // Lightbox Logic
    openLightbox(item: any) {
        this.selectedItem = item;
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    closeLightbox() {
        this.selectedItem = null;
        document.body.style.overflow = 'auto'; // Restore scrolling
    }

    // Prevent clicks inside lightbox content from closing it
    stopPropagation(event: Event) {
        event.stopPropagation();
    }

    onMouseEnter(event: MouseEvent) {
        const video = (event.currentTarget as HTMLElement).querySelector('video');
        if (video) {
            video.muted = true;
            video.play().catch(e => console.log('Hover play failed', e));
        }
    }

    onMouseLeave(event: MouseEvent) {
        const video = (event.currentTarget as HTMLElement).querySelector('video');
        if (video) {
            video.pause();
            video.currentTime = 0; // Reset to start
        }
    }
}
