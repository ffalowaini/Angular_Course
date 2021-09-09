import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { StartComponent } from './start/start.component';

const appRoutes = [
  { path: '', redirectTo: 'start', pathMatch: 'full' },
  { path: 'start', component: StartComponent, pathMatch: 'full' },

  {
    path: 'recipes',
    loadChildren: () =>
      import('./recipes/recipes.model').then((m) => m.RecipesModel),
  },
  {
    path: 'shopping-list',
    loadChildren: () =>
      import('./shopping-list/shopping-list.model').then(
        (m) => m.ShoppingListModel
      ),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.model').then((m) => m.AuthModel),
  },
];

@NgModule({
  imports: [
    // RouterModule.forRoot(appRoutes, {useHash: true})
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModel {}
