import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewPackageComponent } from './new-package/new-package.component';
import { UserPostDataResolver } from './resolvers/user-post-data.resolver';
import { AvailableServicesResolver } from './resolvers/available-services.resolver';

const routes: Routes = [{
  path: '',
  component: NewPackageComponent,
  resolve: { postData: UserPostDataResolver, availableServices: AvailableServicesResolver  },
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
