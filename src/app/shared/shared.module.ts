import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './pages/about/about.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

@NgModule({
  declarations: [HomePageComponent, AboutComponent],
  imports: [CommonModule],
  exports: [HomePageComponent, AboutComponent],
})
export class SharedModule {}
