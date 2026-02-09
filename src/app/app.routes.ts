import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { CareersComponent } from './pages/careers/careers';
import { JobDetailComponent } from './pages/job-detail/job-detail';
import { AboutComponent } from './pages/about/about';

import { GalleryComponent } from './pages/gallery/gallery';
import { ShowsComponent } from './pages/shows/shows';
import { FansComponent } from './pages/fans/fans';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'careers', component: CareersComponent },
  { path: 'careers/:id', component: JobDetailComponent },
  { path: 'about', component: AboutComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'music', loadComponent: () => import('./pages/music/music').then(m => m.MusicComponent) },
  { path: 'shows', component: ShowsComponent },
  { path: 'fans', component: FansComponent },
  { path: '**', redirectTo: '' }
];
