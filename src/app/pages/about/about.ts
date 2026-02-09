import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './about.html',
    styleUrl: './about.css'
})
export class AboutComponent implements AfterViewInit {
    visionContent = [
        {
            title: "About Singga",
            description: "Singga, born in village near Mahilpur, is one of the most influential and authentic voices in contemporary Punjabi entertainment. A singer, lyricist, performer, and actor, Singga is known for his raw honesty, powerful delivery, and deep cultural connection that resonates strongly with audiences across India and globally."
        },
        {
            title: "Musical Journey",
            description: "Singga’s musical journey is rooted in storytelling. From high-energy anthems to emotionally driven tracks, his songs reflect real experiences, strong opinions, and unapologetic individuality. With multiple chart-topping singles, EPs, and viral releases, he has carved a distinct identity in the Punjabi music industry."
        },
        {
            title: "Acting & Films",
            description: "Expanding beyond music, Singga has successfully made his mark in cinema. He has appeared in multiple Punjabi and international film projects, earning appreciation for his natural screen presence and grounded performances. His recent film Punjabi Aa Gye Oye further highlighted his versatility as an actor and strengthened his position as a multi-dimensional artist."
        },
        {
            title: "Artistic Identity",
            description: "What sets Singga apart is his fearless expression. He is known for addressing realities of society, the industry, and personal struggles through his art—while also delivering romantic, celebratory, and emotionally rich music. His work reflects strength, vulnerability, pride, and truth, making his artistry both relatable and impactful."
        },
        {
            title: "Beyond the Spotlight",
            description: "Singga strongly believes in unity beyond caste, religion, gender, and background. He has been actively involved in humanitarian efforts, community support initiatives, and ground-level help during difficult times, using his influence to spread awareness, compassion, and responsibility."
        },
        {
            title: "Today & Ahead",
            description: "With a powerful digital presence, international reach, and a growing portfolio across music, films, and live performances, Singga continues to evolve—pushing creative boundaries while staying true to his roots. His journey is not just about success, but about voice, purpose, and connection."
        }
    ];

    @ViewChildren('scrollAnimate') scrollElements!: QueryList<ElementRef>;

    constructor(private el: ElementRef) { }

    ngAfterViewInit() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target); // Trigger once
                }
            });
        }, { threshold: 0.1 });

        const elements = this.el.nativeElement.querySelectorAll('.animate-on-scroll');
        elements.forEach((elm: any) => observer.observe(elm));
    }
}
