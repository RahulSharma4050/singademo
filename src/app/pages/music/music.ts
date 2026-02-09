import { Component, OnInit, OnDestroy, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-music',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './music.html',
    styleUrl: './music.css'
})
export class MusicComponent implements OnInit {
    musicCollection: { title: string; image: string; link: string }[] = [];
    lyricsCollection: { title: string; image: string; link: string }[] = [];

    lyricsVisible = false;
    private observer: IntersectionObserver | undefined;

    constructor(private el: ElementRef, private cdr: ChangeDetectorRef) { }

    ngOnInit() {
        this.generateMusicCollection();
        this.setupObserver();
    }

    ngOnDestroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }

    setupObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.lyricsVisible = true;
                    this.cdr.detectChanges();
                }
            });
        }, { threshold: 0.1 });

        setTimeout(() => {
            const lyricsSection = this.el.nativeElement.querySelector('.lyrics-section');
            if (lyricsSection) {
                this.observer?.observe(lyricsSection);
            }
        }, 100);
    }

    generateMusicCollection() {
        const musicLinks: { [key: number]: string } = {
            1: 'https://youtu.be/cUak-vcQDRo?si=dxy1IH_DUwMW_mOV',
            // 2: '',
            3: 'https://youtu.be/VyRiGoSgGCo?si=EfYdvhDGC1ajO4dA',
            4: 'https://youtu.be/G2nnj02q2Kk?si=VTs9wvkHIe5UhRlh',
            5: 'https://youtu.be/EJ7IWd5fkRk?si=SFrUL1LRWv-FW2oR',
            6: 'https://youtu.be/uzkm8PymFFI?si=U1Se9TR0ingLkXEO',
            7: 'https://youtu.be/DGDk2y6QqaI?si=IUA63woQHvbKhAz3',
            8: 'https://youtu.be/MClNn69r1dk?si=C6kz3pZ05bfdqzCp',
            9: 'https://youtu.be/iIAsrN3PBfk?si=BXsvoCi5kL1FEmQr',
            10: 'https://youtu.be/3cZ7BmHQl2c?si=uWyynBIs-VpKjQdm',
            11: 'https://youtu.be/0NLQ33icfpY?si=WvLEkGnFL_m4kBSM',
            12: 'https://youtu.be/o7ifbZsxfTU?si=zqHIYecx7mGqZZBa',
            13: 'https://youtu.be/si2FI27xn2g?si=0Vtbm2Hxjx-WR9tU',
            14: 'https://youtu.be/TSgZaFdFTsY?si=qpWwqFmcgJe2fyKZ',
            15: 'https://youtu.be/bCSM66-N6v8?si=LyXuGuJ5n0PyoMfC',
            16: 'https://youtu.be/XGhCTL_DyyA?si=A1HvhocrCMg8jIlH',
            17: 'https://youtu.be/rPIcDeqMz1c?si=wtNtDQO3eJ67O-qv',
            18: 'https://youtu.be/WjOG6QPWiB0?si=WcTLwk95iO13VUjz',
            19: 'https://youtu.be/cUak-vcQDRo?si=dxy1IH_DUwMW_mOV',
            20: 'https://youtu.be/WerhHS8XhTM?si=m6uDaRsurzK8mSbm',
            21: 'https://youtu.be/dYxbjzjeSZY?si=HtPNiVV6qDly8gTw',
            22: 'https://youtu.be/YmZb2JetjD4?si=3iTu_CXX_Qtq88Ax',
            23: 'https://youtu.be/y63TAzERKus?si=mtQmGHlaJCNpjjVw',
            24: 'https://youtu.be/_M0PMX5xeWo',
            25: 'https://youtu.be/8MMlHgf1M0A?si=JDsBH7nHLkbfBrE_',
            26: 'https://youtu.be/5ACc_br8Klk?si=TwcYE_Snp-vKhfwt',
            27: 'https://youtu.be/yVDWQCjuAv4?si=H5NVqLIfnFBaRLHs',
            28: 'https://youtu.be/q-tLYteKPJ8?si=SZRoR1EUXaMSbLgq',
            29: 'https://youtu.be/8rR4JP7sQac?si=mdislkA-C1juzqY-',
            // 30: '',
            31: 'https://youtu.be/8mddhC3vk2E?si=CUXu2Qsfjdif2K5X',
            // 32: '',
            33: 'https://youtu.be/k-ZZu2xPA7E?si=wyUDL7gd-JY2c43j',
            34: 'https://youtu.be/8xIq1ePLH4E?si=soCOLmnvc5sICxKN',
            // 35: ''
        };

        const missingIds = [2, 30, 32, 35];
        this.musicCollection = Array.from({ length: 35 }, (_, i) => ({
            title: `Poster ${i + 1}`,
            image: `/assets/Music/${i + 1}.jpeg`,
            link: musicLinks[i + 1] || ''
        })).filter(item => {
            const id = parseInt(item.title.split(' ')[1]);
            return !missingIds.includes(id);
        });

        const lyricsLinks: { [key: number]: string } = {
            1: 'https://youtu.be/7HBTZogKGgg?si=1sizdulqrDran4jU',
            2: 'https://youtu.be/yRN7wbcohRE?si=HIJXoMAP9MIPVcfu',
            3: 'https://youtu.be/kJU9KPeQHMA?si=tQNkmHRabX2Vk5Ng',
            4: 'https://youtu.be/MFbWt4HJ5vQ?si=GKq23t8I9uvfj4kC',
            // 5: '',
            6: 'https://youtu.be/xJMmQl-rCbs?si=fTI0tQO9eQoD3uLL',
            7: 'https://youtu.be/5cP2ol9M0kY?si=X1nTGjSxP8TI2qsW',
            8: 'https://youtu.be/JgDToo8PeEE?si=ozgOArSpAu3j0-8O',
            9: 'https://youtu.be/pxfTl6SGu_4?si=7Q01Zz3t11_ZzCp-'
        };

        this.lyricsCollection = Array.from({ length: 9 }, (_, i) => ({
            title: `Lyrics ${i + 1}`,
            image: `/assets/Music/Lyrics/${i + 1}.jpeg`,
            link: lyricsLinks[i + 1] || ''
        })).filter(item => item.title !== 'Lyrics 5');
    }


    openVideo(link: string) {
        if (link) {
            window.open(link, '_blank');
        } else {
            console.log('Video link not available');
        }
    }
}

