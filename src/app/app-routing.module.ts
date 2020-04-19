import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { MapComponent } from './map/map.component';
import { LoginComponent } from './login/login.component';
import { StoredetailComponent } from './customer/storedetail/storedetail.component';
import { UserformComponent } from './customer/userform/userform.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RetailerComponent } from './retailer/retailer.component';

const routes: Routes = [
  { path: '', component: MapComponent },
  { path: 'map', component: MapComponent },
  { path: 'login', component: LoginComponent },
  { path: 'retailer', component: RetailerComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'customer/storedetail', component: StoredetailComponent },
  { path: 'customer/userform', component: UserformComponent},
  { path: '**', component: NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
