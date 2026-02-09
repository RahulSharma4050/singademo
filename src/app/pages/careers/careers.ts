import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './careers.html',
  styleUrl: './careers.css'
})
export class CareersComponent {
  jobs = [
    { id: 1, title: 'Senior Frontend Engineer', category: 'Engineering' },
    { id: 2, title: 'Product Designer', category: 'Design' },
    { id: 3, title: 'Full Stack Developer', category: 'Engineering' },
    { id: 4, title: 'Marketing Specialist', category: 'Marketing' }
  ];
}
