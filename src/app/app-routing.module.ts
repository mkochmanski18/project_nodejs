import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecensionListComponent } from './components/recension-list/recension-list.component';
import { RecensionPageComponent } from './components/recension-page/recension-page.component';

const routes: Routes = [
    {path:'list',component:RecensionListComponent},
    {path:'details/:id',component:RecensionPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
