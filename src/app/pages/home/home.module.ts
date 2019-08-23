import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [HomeRoutingModule, SharedModule],
  declarations: [HomeComponent]
})
export class HomeModule {}
