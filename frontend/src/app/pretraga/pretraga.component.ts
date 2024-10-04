import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KnjigeService } from '../knjige.service';
import { KorisnikService } from '../korisnik.service';
import { Knjiga } from '../models/knjiga';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-pretraga',
  templateUrl: './pretraga.component.html',
  styleUrls: ['./pretraga.component.css']
})
export class PretragaComponent implements OnInit {

  constructor(private ruter: Router, private korisnikServis: KorisnikService, private knjigeServis: KnjigeService) { }

  ngOnInit(): void {
    this.kor=null;
    this.userPfp="";
    this.kor=JSON.parse(localStorage.getItem('ulogovan'));
    if(this.kor!=null){
      this.userPfp=this.kor.slika;
      if(this.kor.tip=='moderator'||this.kor.tip=='admin') this.moderatorJe=true; else this.moderatorJe=false;
      if(this.kor.tip=='admin') this.adminJe=true; else this.adminJe=false;
    }
    this.knjigeServis.dohvatiSveKnjige().subscribe((podaci: Knjiga[])=>{
      this.sveKnjige=podaci;
    })
  }

  userPfp: string;
  moderatorJe: boolean;
  adminJe: boolean;
  sveKnjige: Knjiga[]=[];
  rezultatPretrage: Knjiga[]=[];
  kor: Korisnik;
  kor_ime: string;
  lozinka: string;
  poruka: string;
  stringPretrage: string;
  //imagePreview: string;
  //imagePreview2: string;
  //za: Zahtev[]=[];



  pretrazi(){
    if(this.sveKnjige!=null) this.rezultatPretrage = this.sveKnjige.filter(knjiga=>knjiga.autor.includes(this.stringPretrage)||knjiga.naziv.includes(this.stringPretrage));
  }

  profil(){
    this.ruter.navigate(['profil']);
  }

  odjaviSe(){
    localStorage.clear();
    this.kor=null;
    this.userPfp="";
    this.ruter.navigate(['']);
  }


  vidiKnjigu(id){
    this.ruter.navigate(['knjige', {paramId:id}]);
  }


}
