import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReunionComponent } from './reunion/reunion.component';
import { HomeComponent } from './home/home.component';
import { ReunionAddComponent } from './reunion-add/reunion-add.component';
import { ReunionEditComponent } from './reunion-edit/reunion-edit.component';

import { MembreComponent } from './membre/membre.component';
import { MembreEditComponent } from './membre-edit/membre-edit.component';
import { MembreAddComponent } from './membre-add/membre-add.component';

const routes: Routes = [
  { path: 'home' ,component: HomeComponent},

  { path: 'reunion' ,component: ReunionComponent},
  { path: 'reunion/add',component:ReunionAddComponent},
  { path: 'reunion/edit/:id',component:ReunionEditComponent},
  { path: 'membres',component:MembreComponent},
  { path: 'membres/add',component:MembreAddComponent},
  { path: 'membres/edit/:id',component:MembreEditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const routingComponents = [ReunionComponent,HomeComponent,ReunionAddComponent,ReunionEditComponent,MembreComponent,MembreAddComponent,MembreEditComponent]
