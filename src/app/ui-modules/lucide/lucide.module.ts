import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LUCIDE_ICONS, LucideIconProvider } from 'lucide-angular';
import { LucideAngularModule, File, Home, Menu, UserCheck, Camera, CameraIcon } from 'lucide-angular';

@NgModule({
  imports: [
    LucideAngularModule.pick({File, Home, Menu, UserCheck})
  ]
})
export class AppModule { }

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LucideAngularModule.pick({ File, Home, Menu, UserCheck, Camera, CameraIcon })
  ],
})
export class LucideModule { }
