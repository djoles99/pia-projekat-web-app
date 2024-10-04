import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KnjigeService } from '../knjige.service';
import { KorisnikService } from '../korisnik.service';
import { Knjiga } from '../models/knjiga';
import { Korisnik } from '../models/korisnik';
import { Recenzija } from '../models/recenzija';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit {

  constructor(private ruter: Router, private korisnikServis: KorisnikService, private knjigeServis: KnjigeService) { }

  ngOnInit(): void {
    this.kor=null;
    this.userPfp="";
    this.knjigeServis.dohvatiTop3Knjige().subscribe((podaci: Knjiga[])=>{
      this.top3knjige=podaci;
      this.result=podaci;
      this.resetValues();
      this.nextBook();
      this.prevBook();
      // //this.imagePreview=this.za[0].slika;
      // this.korisnikServis.kurcina2().subscribe((p2: Zahtev)=>{
      //   this.imagePreview2=p2.slika;
      // })
      //console.log(podaci);
    })
    this.kor=JSON.parse(localStorage.getItem('ulogovan'));
    if(this.kor!=null){
      this.userPfp=this.kor.slika;
      if(this.kor.tip=='moderator'||this.kor.tip=='admin') this.moderatorJe=true; else this.moderatorJe=false;
      if(this.kor.tip=='admin') this.adminJe=true; else this.adminJe=false;
    }

    this.knjigeServis.dohvatiKnjiguSaMaxID().subscribe((podaci2: Knjiga[])=>{
      let idRandToday=Math.ceil(Date.now().valueOf()/86400000);
      // console.log(idRandToday);
      let id=podaci2[0].id;
      // console.log((idRandToday%id)+1);
      this.knjigeServis.dohvatiKnjiguDana((idRandToday%id)+1).subscribe((podaci3: Knjiga)=>{
        this.knjigaDana=podaci3;
        
        
        this.knjigeServis.dohvatiRecenzije(this.knjigaDana.id).subscribe((r: Recenzija[])=>{
          if(r!=null) {
            let cnt=0, sum=0;
            r.forEach(rec => {
              if(rec.ocena!=null){
                sum+=rec.ocena;
                cnt++;
              }
            });
            if(cnt!=0&&sum!=0){
              this.prosecnaOcena=sum/cnt;
              this.prosecnaOcena=parseFloat(this.prosecnaOcena.toPrecision(3));
            }
            else 
            this.prosecnaOcena=null;
          }
          else this.prosecnaOcena=null;
        })


        if(this.knjigaDana.slika!=""&&this.knjigaDana.slika!=null){
          this.slicicaKnjigeDana=this.knjigaDana.slika;
        }
        else{
          this.slicicaKnjigeDana=null;
        }
        //this.slicicaKnjigeDana="8428753095jdisad";
      })

    })
    //console.log(this.kor)
  }

  prosecnaOcena: number;
  userPfp: string;
  moderatorJe: boolean;
  adminJe: boolean;
  slicicaKnjigeDana: string;
  knjigaDana: Knjiga;
  top3knjige: Knjiga[]=[];
  kor: Korisnik;
  kor_ime: string;
  lozinka: string;
  poruka: string;
  //imagePreview: string;
  //imagePreview2: string;
  //za: Zahtev[]=[];

  registrujSe(){
    this.ruter.navigate(['registracija']);
  }


  prijaviSe(){
    if(this.kor_ime!=null&&this.lozinka!=null){
      this.korisnikServis.nadjiKorisnika(this.kor_ime).subscribe((k: Korisnik)=>{
        if(k){
          if(k.lozinka==this.lozinka){
            this.poruka='';
            if(k.tip=='moderator'){
              localStorage.setItem('ulogovan', JSON.stringify(k));
              this.ruter.navigate(['moderator']);
            }
            else if(k.tip=='citalac'){
              localStorage.setItem('ulogovan', JSON.stringify(k));
              this.ruter.navigate(['citalac']);
            }
            else{
              this.poruka='Neispravan tip'
            }
          }
          else{
            this.poruka = 'Neispravna lozinka';
          }
        }
        else{
          this.poruka = 'Korisnicko ime ne odgovara nijednom korisniku';
        } 
  
      })
    }
    else{
      this.poruka='Polja nisu popunjena';
      //this.ruter.navigate(['']);
    }

  }

  profil(){
    this.ruter.navigate(['profil']);
  }

  odjaviSe(){
    localStorage.clear();
    // this.kor=null;
    // this.userPfp="";
    // this.ruter.navigate(['']);
    location.reload();
  }

  vidiKnjigu(){
    this.ruter.navigate(['knjige', {paramId: this.knjigaDana.id}]);
  }

  vidiKnjiguID(id){
    this.ruter.navigate(['knjige', {paramId: id}]);
  }

  //================================================================================================================

  result: any = [];
  allBooks: any = [];
  currentIndex: number = 0;

  changeShowcase(i: number) {
    this.resetValues();
    this.result[i].status = true;
  }

  nextBook() {
    this.getCurrentIndex();
    this.resetValues();
    this.currentIndex++;
    this.currentIndex > this.result.length - 1 ? (this.currentIndex = 0) : '';
    this.result[this.currentIndex].status = true;
  }

  prevBook() {
    this.getCurrentIndex();
    this.resetValues();
    this.currentIndex > 0
      ? this.currentIndex--
      : (this.currentIndex = this.result.length - 1);
    this.result[this.currentIndex].status = true;
  }

  getCurrentIndex() {
    for (var i = 0; i < this.result.length; i++) {
      if (this.result.status) {
        this.currentIndex = i;
      }
    }
  }

  resetValues() {
    for (var index = 0; index < this.result.length; index++) {
      this.result[index].status = false;
    }
  }



}
