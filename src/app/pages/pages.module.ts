import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { ProductsComponent } from './products/products.component';

import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { PaginatorModule } from 'primeng/paginator';
import { NgOptimizedImage } from '@angular/common';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({
  declarations: [ProductsComponent, ProductCardComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    DropdownModule,
    FormsModule,
    InputTextModule,
    AutoCompleteModule,
    ButtonModule,
    CarouselModule,
    PaginatorModule,
    NgOptimizedImage,
    ProgressBarModule,
    ToastModule,
    TagModule,
    SkeletonModule,
  ],
})
export class PagesModule {}
