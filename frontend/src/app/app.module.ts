import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { AdminComponent } from './admin/admin.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { ProfilComponent } from './profil/profil.component';
import { PretragaComponent } from './pretraga/pretraga.component';
import { KnjigeComponent } from './knjige/knjige.component';
import { IstorijaComponent } from './istorija/istorija.component';
import { PregledComponent } from './pregled/pregled.component';
import { DodajComponent } from './dodaj/dodaj.component';
import { KorisniciComponent } from './korisnici/korisnici.component';

@NgModule({
  declarations: [
    AppComponent,
    PocetnaComponent,
    AdminComponent,
    RegistracijaComponent,
    PrijavaComponent,
    PromenaLozinkeComponent,
    ProfilComponent,
    PretragaComponent,
    KnjigeComponent,
    IstorijaComponent,
    PregledComponent,
    DodajComponent,
    KorisniciComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
