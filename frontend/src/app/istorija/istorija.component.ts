import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KnjigeService } from '../knjige.service';
import { KorisnikService } from '../korisnik.service';
import { Knjiga } from '../models/knjiga';
import { Korisnik } from '../models/korisnik';
import { Zaduzenje } from '../models/zaduzenje';

@Component({
  selector: 'app-istorija',
  templateUrl: './istorija.component.html',
  styleUrls: ['./istorija.component.css']
})
export class IstorijaComponent implements OnInit {

  constructor(private ruter: Router, private korisnikServis: KorisnikService, private knjigeServis: KnjigeService) { }

  ngOnInit(): void {
    this.sortString='datumV';
    this.kor=null;
    this.userPfp="";
    //this.rezultatPretrage=null;
    this.kor=JSON.parse(localStorage.getItem('ulogovan'));
    if(this.kor!=null){
      this.userPfp=this.kor.slika;
      if(this.kor.tip=='moderator'||this.kor.tip=='admin') this.moderatorJe=true; else this.moderatorJe=false;
      if(this.kor.tip=='admin') this.adminJe=true; else this.adminJe=false;
      this.knjigeServis.dohvatiSvaZaduzenjaKorisnika(this.kor.kor_ime).subscribe((podaci: Zaduzenje[])=>{
        this.svaZaduzenja=podaci;
        this.sortiraj();
        if(this.svaZaduzenja.length==0) this.poruka="Jos uvek niste zaduzili nijednu knjigu"; else this.poruka="";
      })
    }
  }

  userPfp: string;
  svaZaduzenja: Zaduzenje[]=[];
  //rezultatPretrage: Knjiga[];
  moderatorJe: boolean;
  adminJe: boolean;
  kor: Korisnik;
  kor_ime: string;
  lozinka: string;
  poruka: string;
  sortString: string;
  //stringPretrage: string;
  //imagePreview: string;
  //imagePreview2: string;
  //za: Zahtev[]=[];



  // pretrazi(){
  //   this.rezultatPretrage = this.sveKnjige.filter(knjiga=>knjiga.autor.includes(this.stringPretrage)||knjiga.naziv.includes(this.stringPretrage));
  // }

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

  sortiraj(){
    if(this.sortString=='datumV'){
      this.svaZaduzenja.sort((a,b)=>{
        return Date.parse(a.datumV)-Date.parse(b.datumV);
      })
    }
    if(this.sortString=='datumZ'){
      this.svaZaduzenja.sort((a,b)=>{
        return Date.parse(a.datumZ)-Date.parse(b.datumZ);
      })
    }
    if(this.sortString=='autor'){
      this.svaZaduzenja.sort((a,b)=>{
        return a.autor>b.autor?1:-1;
      })
    }
    if(this.sortString=='naziv'){
      this.svaZaduzenja.sort((a,b)=>{
        return a.naziv>b.naziv?1:-1;
      })
    }
  }

}
