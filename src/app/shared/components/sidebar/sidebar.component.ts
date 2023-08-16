import { Component } from '@angular/core';
import { SidebarLabel } from 'src/types/types';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  public sidebarItems: SidebarLabel[] = [
    {
      path: 'home',
      label: 'Home',
    },
    {
      path: 'about',
      label: 'About',
    },
    {
      path: 'contact',
      label: 'Contact',
    },
    {
      path: 'countries',
      label: 'Countries',
    },
    {
      path: 'countries/by-capital',
      label: 'By capital',
    },
    {
      path: 'countries/by-country',
      label: 'By country',
    },
    {
      path: 'countries/by-region',
      label: 'By region',
    },
  ];
}
