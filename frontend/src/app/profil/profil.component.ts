import { Component, OnInit } from '@angular/core';
import { NavigationStart, NavigationEnd, Router,ActivatedRoute } from '@angular/router';
import { KnjigeService } from '../knjige.service';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../models/korisnik';
import { Zaduzenje } from '../models/zaduzenje';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  constructor(private ruter: Router, private korisnikServis: KorisnikService, private knjigeServis: KnjigeService, private route: ActivatedRoute) { 
    // ruter.events.subscribe((eve)=>{
    //   // if(eve instanceof NavigationEnd){
    //   //   localStorage.removeItem('koredit');
    //   // }
    //   if(eve instanceof NavigationStart){
    //     localStorage.removeItem('koredit');
    //     //this.korEdit=null;
    //     //this.korEdit=null;
    //   }
    // })
  }

  ngOnInit(): void {
    this.kor=JSON.parse(localStorage.getItem('ulogovan'));
    this.userPfp=this.kor.slika;
    this.neMere=false;
    //this.korEdit=JSON.parse(this.route.snapshot.paramMap.get('spec'));
    if(this.kor.tip=='moderator'||this.kor.tip=='admin') this.moderatorJe=true; else this.moderatorJe=false;
    if(this.kor.tip=='admin') this.adminJe=true; else this.adminJe=false;
    this.kor_ime=this.kor.kor_ime;
    this.ime=this.kor.ime;
    this.prezime=this.kor.prezime;
    this.tip=this.kor.tip;
    this.mejl=this.kor.mejl;
    this.adresa=this.kor.adresa;
    this.telefon=this.kor.telefon;
    this.izmena=false;
    this.user2Pfp=this.userPfp;
    if(this.route.snapshot.paramMap.get('spec')!=null){
      this.edit=true;
      this.korisnikServis.nadjiKorisnika(this.route.snapshot.paramMap.get('spec')).subscribe((korr: Korisnik)=>{
      if(korr!=null){
        this.korEdit=korr;//----------
        this.kor_ime=this.korEdit.kor_ime;
        this.ime=this.korEdit.ime;
        this.prezime=this.korEdit.prezime;
        this.tip=this.korEdit.tip;
        this.mejl=this.korEdit.mejl;
        this.adresa=this.korEdit.adresa;
        this.telefon=this.korEdit.telefon;
        this.user2Pfp=this.korEdit.slika;
        this.izmena=false;
      }
      })
    }else {this.edit=false;}
  }

  edit: boolean;
  userPfp: string;
  user2Pfp: string;
  moderatorJe: boolean;
  adminJe: boolean;
  kor: Korisnik;
  korEdit: Korisnik;
  kor_ime: string;
  //lozinka: string;
  ime: string;
  prezime: string;
  tip: string;
  mejl:string;
  adresa: string;
  telefon: string;
  greska: string;
  izmena: boolean;
  neMere: boolean;


  odjaviSe(){
    localStorage.clear();
    this.kor=null;
    this.userPfp="";
    this.ruter.navigate(['']);
  }

  profil(){
    //localStorage.removeItem('koredit');
    location.reload();
    //this.ruter.navigate(['profil']);
  }

  izmeni(){
    this.izmena=true;
  }

  potvrdi(){
    if(this.kor_ime==null){
      this.greska="Niste uneli korisnicko ime";
      return;
    }
    if(this.kor_ime==this.kor.kor_ime&&
      this.ime==this.kor.ime&&
      this.prezime==this.kor.prezime&&
      this.mejl==this.kor.mejl&&
      this.adresa==this.kor.adresa&&
      this.imagePreview==this.kor.slika&&
      this.telefon==this.kor.telefon){
        this.izmena=false;
        console.log(1);
        return;
    }
    else{
      if(this.kor.kor_ime==this.kor_ime){
        this.korisnikServis.azurirajPodatke(this.kor.kor_ime, this.kor_ime, this.ime, this.prezime, this.mejl, this.adresa, this.telefon, this.imagePreview).subscribe((k1)=>{
          //this.kor=k1;
          console.log(12);
          this.kor.kor_ime=this.kor_ime;
          this.kor.ime=this.ime;
          this.kor.prezime=this.prezime;
          this.kor.mejl=this.mejl;
          this.kor.adresa=this.adresa;
          this.kor.telefon=this.telefon;
          if(this.imagePreview!=null&&this.imagePreview!=""){
            this.kor.slika=this.imagePreview;
            this.userPfp=this.imagePreview;
            this.user2Pfp=this.imagePreview;
          }
          localStorage.clear();
          localStorage.setItem('ulogovan', JSON.stringify(this.kor));
          this.izmena=false;
        });
      }
      else if(this.korEdit.kor_ime==this.kor_ime){
        this.korisnikServis.azurirajPodatke(this.korEdit.kor_ime, this.kor_ime, this.ime, this.prezime, this.mejl, this.adresa, this.telefon, this.imagePreview).subscribe((k1)=>{
          //this.kor=k1;
          this.korEdit.kor_ime=this.kor_ime;
          this.korEdit.ime=this.ime;
          this.korEdit.prezime=this.prezime;
          this.korEdit.mejl=this.mejl;
          this.korEdit.adresa=this.adresa;
          this.korEdit.telefon=this.telefon;
          if(this.imagePreview!=null&&this.imagePreview!=""){
            this.korEdit.slika=this.imagePreview;
            this.user2Pfp=this.imagePreview;
          }
          //localStorage.removeItem('koredit');
          //localStorage.setItem('koredit', JSON.stringify(this.korEdit));
          this.izmena=false;
        });
      }
      else{
        this.korisnikServis.nadjiKorisnika(this.kor_ime).subscribe((k: Korisnik)=>{
          if(k){
            this.greska="Korisnicko ime je zauzeto";
            return;
          }
          else{
            this.korisnikServis.azurirajPodatke(this.kor.kor_ime, this.kor_ime, this.ime, this.prezime, this.mejl, this.adresa, this.telefon, this.imagePreview).subscribe((k2)=>{
              //this.kor=k2;
              this.kor.kor_ime=this.kor_ime;
              this.kor.ime=this.ime;
              this.kor.prezime=this.prezime;
              this.kor.mejl=this.mejl;
              this.kor.adresa=this.adresa;
              this.kor.telefon=this.telefon;
              this.kor.slika=this.imagePreview;
              this.userPfp=this.imagePreview;
              this.user2Pfp=this.imagePreview;
              localStorage.clear();
              localStorage.setItem('ulogovan', JSON.stringify(this.kor));
              this.izmena=false;
            });
          }
        });
      }
    }
  }

  // odustani(){
  //   this.userPfp=this.kor.slika;
  //   this.user2Pfp=this.kor.slika;
  //   this.kor_ime=this.kor.kor_ime;
  //   this.ime=this.kor.ime;
  //   this.prezime=this.kor.prezime;
  //   this.tip=this.kor.tip;
  //   this.mejl=this.kor.mejl;
  //   this.adresa=this.kor.adresa;
  //   this.telefon=this.kor.telefon;
  //   this.izmena=false;
  // }

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

  izbrisi(){
    if(this.korEdit!=null){
      this.knjigeServis.dohvatiSvaZaduzenjaUkupno().subscribe((sz: Zaduzenje[])=>{
        let svaZaduzenja=sz;
        if(sz!=null){
          svaZaduzenja.forEach(z => {
            if(z.aktivno&&(z.citalac==this.korEdit.kor_ime)){
              this.neMere=true;
            }
          });
          if(!this.neMere){
            this.korisnikServis.obrisiKorisnika(this.korEdit.kor_ime).subscribe((l)=>{
              console.log(l);
              //localStorage.removeItem('koredit');
              this.ruter.navigate(['korisnici']);
            });
          }
          else{
            this.greska="Nije moguce obrisati korisnika jer jos uvek ima zaduzene knjige";
            return;
          }
        }
      })
    }
  }

}
