import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KnjigeService } from '../knjige.service';
import { KorisnikService } from '../korisnik.service';
import { Knjiga } from '../models/knjiga';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-dodaj',
  templateUrl: './dodaj.component.html',
  styleUrls: ['./dodaj.component.css']
})
export class DodajComponent implements OnInit {

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
    }
    this.knjigeServis.dohvatiSveKnjige().subscribe((podaci: Knjiga[])=>{
      this.sveKnjige=podaci;
    })
  }

  userPfp: string;
  moderatorJe: boolean;
  adminJe: boolean;
  sveKnjige: Knjiga[]=[];
  //rezultatPretrage: Knjiga[];
  kor: Korisnik;
  naziv: string;
  autor: string;
  izdavac: string;
  zanr: string;
  godina: string;
  na_stanju: number;
  slicka: File;
  jezik: string;
  greska: string;
  poruka: string;
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

  dodajKnjigu(){
    if(!this.naziv||!this.na_stanju||!this.autor||!this.izdavac||!this.zanr||!this.godina||!this.jezik){
      this.greska="Nisu popunjena sva polja";
      return;
    }
    else{//sva polja jesu popunjena
      this.knjigeServis.nadjiKnjiguPoNazivuAutoruIzdavacuJezikuGodini(this.naziv, this.autor, this.izdavac, this.jezik, this.godina).subscribe((k: Knjiga)=>{
        if(k!=null){
          this.greska="Knjiga vec postoji u bazi";
          return;
        }
        else{
          let knjiga= new Knjiga();
          knjiga.naziv=this.naziv;
          knjiga.autor=this.autor;
          knjiga.zanr=this.zanr;
          knjiga.izdavac=this.izdavac;
          knjiga.slika=this.imagePreview;
          knjiga.godina=this.godina;
          if(this.na_stanju==0||this.na_stanju==null){
            knjiga.na_stanju=1;
          }
          else{
            knjiga.na_stanju=this.na_stanju;
          }
          knjiga.jezik=this.jezik;
          this.knjigeServis.dohvatiKnjiguSaMaxID().subscribe((k2: Knjiga[])=>{
            //console.log(k2[0].id);
            knjiga.id=k2[0].id+1;
            //console.log(knjiga.id);
            this.knjigeServis.dodajKnjigu(knjiga).subscribe(l=>{
              console.log(l);
              this.greska=null;
              this.poruka="Knjiga je dodata";
            })
          })
        }
      })
    }
  }


}
