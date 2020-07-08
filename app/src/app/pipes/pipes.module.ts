import { NgModule } from '@angular/core';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';
import { ImageSanatizerPipe } from './image-sanatizer.pipe';
import { ImagePipe } from './image.pipe';



@NgModule({
  declarations: [DomSanitizerPipe, ImageSanatizerPipe, ImagePipe],
  exports: [
    DomSanitizerPipe,
    ImageSanatizerPipe
  ]
})
export class PipesModule { }
