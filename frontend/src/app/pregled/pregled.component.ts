import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KnjigeService } from '../knjige.service';
import { KorisnikService } from '../korisnik.service';
import { Knjiga } from '../models/knjiga';
import { Korisnik } from '../models/korisnik';
import { Zaduzenje } from '../models/zaduzenje';

@Component({
  selector: 'app-pregled',
  templateUrl: './pregled.component.html',
  styleUrls: ['./pregled.component.css']
})
export class PregledComponent implements OnInit {

  constructor(private ruter: Router, private korisnikServis: KorisnikService, private knjigeServis: KnjigeService) { }

  ngOnInit(): void {
    this.kor=null;
    this.userPfp="";
    //this.rezultatPretrage=null;
    this.kor=JSON.parse(localStorage.getItem('ulogovan'));
    if(this.kor!=null){
      this.userPfp=this.kor.slika;
      if(this.kor.tip=='moderator'||this.kor.tip=='admin') this.moderatorJe=true; else this.moderatorJe=false;
      if(this.kor.tip=='admin') this.adminJe=true; else this.adminJe=false;
      this.knjigeServis.dohvatiZaduzenjaKorisnika(this.kor.kor_ime).subscribe((podaci: Zaduzenje[])=>{
        this.svaAktivnaZaduzenja=podaci;
        if(this.svaAktivnaZaduzenja.length==0) this.poruka="Nemate zaduzenih knjiga";
        else{
          for(let i=0; i<this.svaAktivnaZaduzenja.length;++i){
            this.knjigeServis.dohvatiKnjiguPoID(this.svaAktivnaZaduzenja[i].idK).subscribe((k: Knjiga)=>{
              this.zaduzeneKnjige[i]=k;
            })
          }
        }
      })
    }
  }

  userPfp: string;
  moderatorJe: boolean;
  adminJe: boolean;
  svaAktivnaZaduzenja: Zaduzenje[]=[];
  zaduzeneKnjige: Knjiga[]=[];
  // rezultatPretrage: Knjiga[];
  kor: Korisnik;
  kor_ime: string;
  lozinka: string;
  poruka: string;
  // stringPretrage: string;
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

  razduzi(knj: Knjiga, i: number){
    this.svaAktivnaZaduzenja[i].aktivno=false;
    let sada = Date.now();
    this.svaAktivnaZaduzenja[i].datumV=new Date(sada).toUTCString();
    this.knjigeServis.razduzi(knj.id, this.kor.kor_ime, new Date(sada).toUTCString()).subscribe((k)=>{
      this.knjigeServis.dohvatiZaduzenjaKorisnika(this.kor.kor_ime).subscribe((podaci: Zaduzenje[])=>{
        this.svaAktivnaZaduzenja=podaci;
        this.zaduzeneKnjige=[];
        if(this.svaAktivnaZaduzenja.length==0) this.poruka="Nemate zaduzenih knjiga";
        else{
          for(let i=0; i<this.svaAktivnaZaduzenja.length;++i){
            this.knjigeServis.dohvatiKnjiguPoID(this.svaAktivnaZaduzenja[i].idK).subscribe((k: Knjiga)=>{
              this.zaduzeneKnjige[i]=k;
            })
          }
        }
      })
    });
  }

  proveri(z: Zaduzenje): boolean{
    return Date.parse(z.datumV)>Date.now();
  }

  brDana(z: Zaduzenje): string{
    let r = Math.ceil((Date.parse(z.datumV)-Date.now())/86400000)
    if(r%10==1 && (r%100!=11)) return r.toString()+" dan";
    else return r.toString()+" dana";
  }

}
