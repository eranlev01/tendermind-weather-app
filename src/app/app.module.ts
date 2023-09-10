import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { defaultEnvironment } from 'src/environments/environment.default';
import { MaterialUiModule } from './ui-modules/material-ui/material-ui.module';
import { IonNavbarComponent } from './shared/components/ion-navbar/ion-navbar.component';
import { LucideModule } from './ui-modules/lucide/lucide.module';
import { AuthGuard } from './shared/auth-guard/auth.guard';
import { AuthService } from './shared/auth-guard/services/auth.service';

@NgModule({
  declarations: [AppComponent, IonNavbarComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(defaultEnvironment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HttpClientModule,
    MaterialUiModule,
    LucideModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, AuthService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
