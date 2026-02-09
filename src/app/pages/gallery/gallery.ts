import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-gallery',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './gallery.html',
    styleUrl: './gallery.css'
})
export class GalleryComponent implements OnInit {
    allImages: string[] = [
        "10.jpg",
        "5.jpg",
        "6.jpg",
        "9.jpg",
        "DSC02465.JPG",
        "DSC02519.JPG",
        "DSC02566.JPG",
        "DSC02588.JPG",
        "DSC02591.JPG",
        "DSC02648.JPG",
        "DSC02683.JPG",
        "DSC02735.JPG",
        "DSC02738.JPG",
        "DSC02764.JPG",
        "DSC02806.JPG",
        "DSC02856.JPG",
        "DSC02885.JPG",
        "DSC02917.JPG",
        "DSC02922.JPG",
        "DSC02928.JPG",
        "DSC02963.JPG",
        "DSC02966.JPG",
        "DSC02976.JPG",
        "DSC03005.JPG",
        "DSC03192.JPG",
        "DSC03269.JPG",
        "DSC03282.JPG",
        "DSC03288.JPG",
        "DSC03347.JPG",
        "DSC03351.JPG",
        "DSC03358.JPG",
        "DSC03364.JPG",
        "DSC03407.JPG",
        "DSC03413.JPG",
        "DSC03523.JPG",
        "DSC03536.JPG",
        "DSC03538.JPG",
        "DSC03559.JPG",
        "DSC03695.JPG",
        "DSC03724.JPG",
        "DSC03762.JPG",
        "DSC03804.JPG",
        "DSC03839.JPG",
        "DSC03857.JPG",
        "DSC04090.JPG",
        "DSC04099.JPG",
        "DSC04131.JPG",
        "DSC05301.JPG",
        "DSC05594.JPG",
        "Gemini_Generated_Image_a38x4na38x4na38x.png",
        "Gemini_Generated_Image_f23npyf23npyf23n.png",
        "Gemini_Generated_Image_mqqaspmqqaspmqqa.png",
        "Gemini_Generated_Image_pfs9drpfs9drpfs9.png",
        "WhatsApp Image 2023-11-28 at 12.58.41_1a7f5020.jpg",
        "WhatsApp Image 2023-11-28 at 12.58.41_676611f4.jpg",
        "WhatsApp Image 2023-11-28 at 12.58.41_be502d3a.jpg",
        "WhatsApp Image 2026-01-10 at 10.15.43 PM.jpeg",
        "WhatsApp Image 2026-01-10 at 10.15.44 PM (1).jpeg"
    ];

    displayedImages: any[] = [];
    selectedImage: string | null = null;

    constructor() { }

    ngOnInit() {
        this.displayedImages = this.shuffleArray(this.allImages);
    }

    openLightbox(img: string) {
        this.selectedImage = img;
        document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
        this.selectedImage = null;
        document.body.style.overflow = 'auto';
    }

    shuffleArray(array: any[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    onImageError(event: any, img: string) {
        console.error('Failed to load image:', img, event);
        event.target.style.border = '5px solid yellow';
    }
}

