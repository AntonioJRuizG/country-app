import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './pages/about/about.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HomePageComponent, AboutComponent, SidebarComponent],
  imports: [CommonModule, RouterModule],
  exports: [HomePageComponent, AboutComponent, SidebarComponent],
})
export class SharedModule {}
