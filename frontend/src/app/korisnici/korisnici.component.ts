import { Component, OnInit } from '@angular/core';
import { NavigationStart, NavigationEnd, Router } from '@angular/router';
import { KnjigeService } from '../knjige.service';
import { KorisnikService } from '../korisnik.service';
import { Knjiga } from '../models/knjiga';
import { Korisnik } from '../models/korisnik';
import { Produzetak } from '../models/produzetak';
import { Zahtev } from '../models/zahtev';

@Component({
  selector: 'app-korisnici',
  templateUrl: './korisnici.component.html',
  styleUrls: ['./korisnici.component.css']
})
export class KorisniciComponent implements OnInit {

  constructor(private ruter: Router, private korisnikServis: KorisnikService, private knjigeServis: KnjigeService) { 
    // ruter.events.subscribe((eve)=>{
    //   if(eve instanceof NavigationEnd){
    //     localStorage.removeItem('koredit');
    //   }
    //   if(eve instanceof NavigationStart){
    //     localStorage.removeItem('koredit');
    //   }
    // })
  }

  ngOnInit(): void {
    this.mode='lista';
    this.korisnikServis.dajProduzetak().subscribe((podaci: Produzetak)=>{
      this.produzetak=podaci.produzetak;
    });
    this.kor=null;
    this.userPfp="";
    this.kor=JSON.parse(localStorage.getItem('ulogovan'));
    if(this.kor!=null){
      this.userPfp=this.kor.slika;
      if(this.kor.tip=='moderator'||this.kor.tip=='admin') this.moderatorJe=true; else this.moderatorJe=false;
      if(this.kor.tip=='admin') this.adminJe=true; else this.adminJe=false;
    }
    this.korisnikServis.dohvatiSveKorisnike().subscribe((podaci: Korisnik[])=>{
      this.sviKorisnici=podaci;
    })
    this.korisnikServis.dohvatiZahteve().subscribe((podaci2: Zahtev[])=>{
      this.sviZahtevi=podaci2;
    })
  }

  userPfp: string;
  moderatorJe: boolean;
  adminJe: boolean;
  sviKorisnici: Korisnik[]=[];
  sviZahtevi: Zahtev[]=[];
  kor: Korisnik;
  poruka: string;
  greska:SVGStringList;
  //imagePreview: string;
  //imagePreview2: string;
  //za: Zahtev[]=[];
  ime: string;
  prezime: string;
  kor_ime: string;
  lozinka: string;
  mejl: string;
  tip: string;
  telefon: string;
  adresa: string;
  mode: string;
  produzetak: number;

  selectedFile : File;
  imagePreview: string;

  onFileSelect(event){
    //console.log(event);
    this.selectedFile = <File>event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
    this.imagePreview = <string>reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
    //this.korisnikServis.saljiSliku(this.imagePreview);
    //this.korisnikServis.saljiSlikuJBT(this.imagePreview)
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

  idiNaProfil(kor: Korisnik){
    //localStorage.setItem('koredit', JSON.stringify(kor));
    this.ruter.navigate(['profil', {spec:kor.kor_ime}]);
  }

  modeChange(){
    // if(this.mode="lista"){
    //   // this.korisnikServis.dohvatiSveKorisnike().subscribe((podaci: Korisnik[])=>{
    //   //   this.sviKorisnici=podaci;
    //   // })
    // }
    // else{
      
    // }
  }


  dodajKorisnika(){
    let k= new Korisnik();
    k.ime=this.ime;
    k.prezime=this.prezime;
    k.kor_ime=this.kor_ime;
    k.lozinka=this.lozinka;
    k.tip=this.tip;
    k.mejl=this.mejl;
    k.adresa=this.adresa;
    k.telefon=this.telefon;
    k.slika="";

    this.korisnikServis.dodajKorisnika(k).subscribe((l)=>{
      console.log(l);
      this.korisnikServis.dohvatiSveKorisnike().subscribe((podaci: Korisnik[])=>{
        this.sviKorisnici=podaci;
        this.mode="lista";
        this.modeChange();
      })
    })
  }

  dodajKorisnikaZahtev(z: Zahtev){
    let k= new Korisnik();
    k.ime=z.ime;
    k.prezime=z.prezime;
    k.kor_ime=z.kor_ime;
    k.lozinka=z.lozinka;
    k.tip=z.tip;
    k.mejl=z.mejl;
    k.adresa=z.adresa;
    k.telefon=z.telefon;
    k.slika=z.slika;

    this.korisnikServis.dodajKorisnika(k).subscribe((l1)=>{
      console.log(l1);
      this.korisnikServis.dohvatiSveKorisnike().subscribe((podaci: Korisnik[])=>{
        this.sviKorisnici=podaci;
        this.korisnikServis.obrisiZahtev(z.kor_ime).subscribe((l2)=>{
          console.log(l2);
          this.korisnikServis.dohvatiZahteve().subscribe((podaci2: Zahtev[])=>{
            this.sviZahtevi=podaci2;
            this.mode="lista";
            this.modeChange();
          })
        });
      })
    })
  }

  odbijKorisnika(z: Zahtev){
    this.korisnikServis.odbijZahtev(z.kor_ime, z.ime, z.prezime, z.adresa).subscribe((l)=>{
      console.log(l);
      this.korisnikServis.dohvatiZahteve().subscribe((podaci: Zahtev[])=>{
        this.sviZahtevi=podaci;
        this.mode="lista";
        this.modeChange();
      })
    });
  }

  postaviProduzetak(){
    this.korisnikServis.staviProduzetak(this.produzetak).subscribe((l)=>{
      console.log(l);
      this.mode="lista";
      this.modeChange();
    });
  }

}
