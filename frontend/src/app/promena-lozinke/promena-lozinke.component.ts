import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-promena-lozinke',
  templateUrl: './promena-lozinke.component.html',
  styleUrls: ['./promena-lozinke.component.css']
})
export class PromenaLozinkeComponent implements OnInit {

  constructor(private ruter: Router, private korisnikServis: KorisnikService) { }

  ngOnInit(): void {
    this.kor=JSON.parse(localStorage.getItem('ulogovan'));
    this.userPfp=this.kor.slika;
    if(this.kor.tip=='moderator'||this.kor.tip=='admin') this.moderatorJe=true; else this.moderatorJe=false;
    if(this.kor.tip=='admin') this.adminJe=true; else this.adminJe=false;
  }

  userPfp: string;
  moderatorJe: boolean;
  adminJe: boolean;
  kor: Korisnik;
  kor_ime: string;
  stara_lozinka: string;
  nova_lozinka: string;
  nova_lozinka2: string;
  greska: string;

  promeniLozinku(){
    if(this.proveriLozinku()){
      this.korisnikServis.promenaLozinke(this.kor_ime, this.stara_lozinka, this.nova_lozinka).
      subscribe((kor: Korisnik)=>{
        this.greska=null;
        console.log("uspesna promena za korisnika: " + kor.kor_ime);
        this.odjaviSe();
      })
    }
    else{
      //alert("Neuspesna promena lozinke");
    }
  }

  proveriLozinku(): boolean{
    if(this.nova_lozinka==null||this.nova_lozinka2==null||this.stara_lozinka==null||this.kor_ime==null){
      this.greska="Nisu popunjena sva polja";
      return false;
    }
    if(this.kor.kor_ime!=this.kor_ime){
      this.greska="Unesite svoje korisnicko ime";
      return false;
    }
    if(this.kor.lozinka!=this.stara_lozinka){
      this.greska="Neispravna stara lozinka: pokusaj odbijen";
      return false;
    }
    if(this.nova_lozinka!=this.nova_lozinka2){
      this.greska="Lozinka i potvrda lozinke se ne poklapaju";
      return false;
    }
    if(this.nova_lozinka==this.stara_lozinka){
      this.greska="Lozinka je ista kao stara";
      return false;
    }
    // for(let i = 2; i<this.nova_lozinka.length;++i){
    //   if((this.nova_lozinka[i]==this.nova_lozinka[i-1])&&(this.nova_lozinka[i]==this.nova_lozinka[i-2])){
    //     this.greska="Neki znak lozinke Vam se ponavlja 3 ili vise puta uzastopno";
    //     return false;
    //   }
    // }
    if(this.nova_lozinka.length>12 || this.nova_lozinka.length<8){
      this.greska="Lozinka nema odgovarajucu duzinu od minimalno 8 i maksimalno 12 karaktera";
      return false;
    }
    //var reg = /((^\.{8,24}$)([A-Z]+)([a-z]+)([0-9]+)([$&+,:;=?@#|'<>.-^*()%!]+))/;
    // /(([a-zA-Z].{1,})&&((?:[a-z].*){3,})&&((?:[A-Z].*){1,})&&((?:\W.*){2,}))/;
    var regNum = /(?:\d.*){1,}/;
    if(!regNum.test(this.nova_lozinka)){
      this.greska="Lozinka treba da ima bar 1 numerik";
      return false;
    }
    // var regLower = /(?:[a-z].*){3,}/;
    // if(!regLower.test(this.nova_lozinka)){
    //   alert("Lozinka treba da ima bar 3 mala slova");
    //   return false;
    // }
    var regUpper = /(?:[A-Z].*){1,}/;
    if(!regUpper.test(this.nova_lozinka)){
      this.greska="Lozinka treba da ima bar 1 veliko slovo";
      return false;
    }
    var regSpec = /(?:\W.*){1,}/;
    if(!regSpec.test(this.nova_lozinka)){
      this.greska="Lozinka treba da ima bar 1 specijalni karakter";
      return false;
    }
    var regStart = /^[a-zA-Z].{1,}$/;
    if(!regStart.test(this.nova_lozinka)){
      this.greska="Lozinka treba da pocinje malim ili velikim slovom";
      return false;
    }
    alert("Zahtev za promenu je poslat");
    return true;
  }

  // nazad(){
  //   this.ruter.navigate(['']);
  // }

  vratiNazad(){
    // if(this.kor.tip=="admin"){
    //   this.ruter.navigate(['administrator']);
    //   return;
    // }
    // if(this.kor.tip=="kupac"){
    //   this.ruter.navigate(['kupac']);
    //   return;
    // }
    // if(this.kor.tip=="preduzece"){
    //   this.ruter.navigate(['preduzece']);
    //   return;
    // }
  }

  odjaviSe(){
    localStorage.clear();
    this.kor=null;
    this.userPfp="";
    this.ruter.navigate(['']);
  }

  profil(){
    this.ruter.navigate(['profil']);
  }

}
