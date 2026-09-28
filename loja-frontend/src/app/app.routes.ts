import { Routes } from '@angular/router';
import { ProdutoListaComponent } from './components/produto-lista/produto-lista';

export const routes: Routes = [
  { path: 'produtos', component: ProdutoListaComponent },
  { path: '', redirectTo: '/produtos', pathMatch: 'full' }
];