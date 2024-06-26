import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetalleComponent } from './detalle/detalle.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'detalle/:id', component: DetalleComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
