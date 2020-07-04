import { Routes, RouterModule } from '@angular/router';
import { ProvidersComponent } from './components/providers/providers.component';
import { ProviderComponent } from './components/provider/provider.component';
import { NgModule } from '@angular/core';


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'providers',
        pathMatch: 'full'
    },
    {
        path: 'providers',
        component: ProvidersComponent
    },
    {
        path: 'provider',
        component: ProviderComponent
    },
    {
        path: 'provider/:id',
        component: ProviderComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
