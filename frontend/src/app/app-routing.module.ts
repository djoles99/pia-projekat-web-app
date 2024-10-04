import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { DodajComponent } from './dodaj/dodaj.component';
import { IstorijaComponent } from './istorija/istorija.component';
import { KnjigeComponent } from './knjige/knjige.component';
import { KorisniciComponent } from './korisnici/korisnici.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { PregledComponent } from './pregled/pregled.component';
import { PretragaComponent } from './pretraga/pretraga.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { ProfilComponent } from './profil/profil.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { RegistracijaComponent } from './registracija/registracija.component';

const routes: Routes = [
  {path: '', component: PocetnaComponent},
  {path: 'prijava', component: PrijavaComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'registracija', component: RegistracijaComponent},
  {path: 'promena-lozinke', component: PromenaLozinkeComponent},
  {path: 'profil', component: ProfilComponent},
  {path: 'pretraga', component: PretragaComponent},  
  {path: 'knjige', component: KnjigeComponent},
  {path: 'pregled', component: PregledComponent},
  {path: 'istorija', component: IstorijaComponent},
  {path: 'dodaj', component: DodajComponent},
  {path: 'korisnici', component: KorisniciComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
