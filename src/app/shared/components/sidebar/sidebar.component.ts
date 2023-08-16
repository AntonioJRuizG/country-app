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
  ];
}
