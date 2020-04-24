import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from '@agm/core';
import { RegistrationComponent } from './registration/registration.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { StoredetailComponent } from './customer/storedetail/storedetail.component';
import { UserformComponent } from './customer/userform/userform.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RetailerComponent } from './retailer/retailer.component';
import { WhyusComponent } from './whyus/whyus.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MapComponent,
    RegistrationComponent,
    LoginComponent,
    StoredetailComponent,
    UserformComponent,
    NotfoundComponent,
    RetailerComponent,
    WhyusComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxSpinnerModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAHPDpyiI1qbRxYDjQguNnTvcHhK-t7y7E',
      libraries: ['places']
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
