import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';



@NgModule({
  declarations: [
    NavComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    NavComponent
  ],
  entryComponents:[
    NavComponent
  ]
})
export class SharedModule { }
