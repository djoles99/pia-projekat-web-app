import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KnjigeService } from '../knjige.service';
import { KorisnikService } from '../korisnik.service';
import { Knjiga } from '../models/knjiga';
import { Korisnik } from '../models/korisnik';
import { Produzetak } from '../models/produzetak';
import { Recenzija } from '../models/recenzija';
import { Zaduzenje } from '../models/zaduzenje';

@Component({
  selector: 'app-knjige',
  templateUrl: './knjige.component.html',
  styleUrls: ['./knjige.component.css']
})
export class KnjigeComponent implements OnInit {

  constructor(private ruter: Router, private korisnikServis: KorisnikService, private knjigeServis: KnjigeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.mozeDaSeZaduzi=true;
    this.korisnikServis.dajProduzetak().subscribe((podaci: Produzetak)=>{
      this.produzetak=podaci.produzetak;
    })
    this.izmena=false;
    this.zaduzenaJe=false;
    this.knjiga=null;
    this.kor=null;
    this.neMere=false;
    this.userPfp="";
    this.kor=JSON.parse(localStorage.getItem('ulogovan'));
    //this.idK=parseInt(this.route.snapshot.paramMap.get('paramId'));
    this.knjigeServis.dohvatiKnjiguPoID(this.route.snapshot.paramMap.get('paramId')).subscribe((k: Knjiga)=>{
      if(k != null) {
        this.knjiga=k;
        this.autor_novo=this.knjiga.autor;
        this.godina_novo=this.knjiga.godina;
        this.izdavac_novo=this.knjiga.izdavac;
        this.jezik_novo=this.knjiga.jezik;
        this.na_stanju_novo=this.knjiga.na_stanju;
        this.naziv_novo=this.knjiga.naziv;
        this.zanr_novo=this.knjiga.zanr;
        this.imagePreview=this.knjiga.slika;
        this.knjigeServis.dohvatiRecenzije(this.route.snapshot.paramMap.get('paramId')).subscribe((r: Recenzija[])=>{
          if(r!=null) {
            this.recenzijeKnjige=r;
            this.recenzijeKnjige.sort((a,b)=>{
              return -Date.parse(a.datum)+Date.parse(b.datum);
            });
            let cnt=0, sum=0;
            this.recenzijeKnjige.forEach(rec => {
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
          } else this.recenzijeKnjige=[];
        })
        if(k.na_stanju<=0) this.mozeDaSeZaduzi=false;
      } else this.knjiga=null;
    })
    if(this.kor!=null){
      this.userPfp=this.kor.slika;
      if(this.kor.tip=='moderator'||this.kor.tip=='admin') this.moderatorJe=true; else this.moderatorJe=false;
      if(this.kor.tip=='admin') this.adminJe=true; else this.adminJe=false;
      this.knjigeServis.dohvatiZaduzenjaKorisnika(this.kor.kor_ime).subscribe((z: Zaduzenje[])=>{
        this.zaduzenja=z;
        if(z!=null){
          z.forEach(zz => {
            if(zz.idK.toString()==this.route.snapshot.paramMap.get('paramId')){
              this.mozeDaSeZaduzi=false;
              this.zaduzenaJe=true;
            }
            if((zz.aktivno==true)&&(Date.parse(zz.datumV)<Date.now())){
              this.mozeDaSeZaduzi=false;
              this.poruka="Probijen je rok za razduzivanje neke od vasih knjiga";
            }
          });
        }
      });
    }
  }

  //idK: number;
  kor: Korisnik;
  userPfp: string;
  moderatorJe: boolean;
  adminJe: boolean;
  knjiga: Knjiga;
  mozeDaSeZaduzi: boolean;
  zaduzenja: Zaduzenje[]=[];
  poruka: string;
  zaduzenaJe: boolean;
  recenzijeKnjige: Recenzija[]=[];
  prosecnaOcena: number;
  komentar: string="";
  ocena: number=null;
  izmena: boolean;
  na_stanju_novo: number=null;
  jezik_novo: string="";
  zanr_novo: string="";
  izdavac_novo: string="";
  godina_novo: string="";
  autor_novo: string="";
  naziv_novo: string="";
  neMere: boolean;
  produzetak: number;




  profil(){
    this.ruter.navigate(['profil']);
  }

  odjaviSe(){
    localStorage.clear();
    this.kor=null;
    this.userPfp="";
    this.ruter.navigate(['']);
  }

  zaduzi(){
    if(this.kor!=null){
      if(this.zaduzenja.length>=3){
        this.poruka="Nije moguce zaduziti knjigu jer vec imate 3 zaduzenja";
        return;
      }
      else{
        if(this.knjiga.na_stanju<=0){
          this.poruka="Nije moguce zaduziti knjigu jer nema vise primeraka na stanju";
          return;
        }
          else{
          let novoZaduzenje = new Zaduzenje();
          novoZaduzenje.idK=this.knjiga.id;
          novoZaduzenje.naziv=this.knjiga.naziv;
          novoZaduzenje.autor=this.knjiga.autor;
          novoZaduzenje.aktivno=true;
          novoZaduzenje.citalac=this.kor.kor_ime;
          let sad = Date.now();
          novoZaduzenje.datumZ=new Date(sad).toUTCString();
          novoZaduzenje.datumV=new Date(sad+this.produzetak*24*60*60*1000).toUTCString();
          // console.log(novoZaduzenje.datumZ);
          // console.log(novoZaduzenje.datumV);
          this.knjigeServis.zaduzi(novoZaduzenje).subscribe((k)=>{
            // this.zaduzenja.push(novoZaduzenje);
            // console.log(this.zaduzenja);
            this.knjigeServis.dohvatiZaduzenjaKorisnika(this.kor.kor_ime).subscribe((z: Zaduzenje[])=>{
              this.zaduzenja=z;
              // if(z!=null){
              //   z.forEach(zz => {
              //     if(zz.idK.toString()==this.route.snapshot.paramMap.get('paramId')){
              //       this.mozeDaSeZaduzi=false;
              //       this.zaduzenaJe=true;
              //     }
              //     if((zz.aktivno==true)&&(Date.parse(zz.datumV)<Date.now())){
              //       this.mozeDaSeZaduzi=false;
              //       this.poruka="Probijen je rok za razduzivanje neke od vasih knjiga";
              //     }
              //   });
              // }
            });
            this.mozeDaSeZaduzi=false;
            this.zaduzenaJe=true;
            this.knjiga.na_stanju--;
          });
        }
      }
    }
    else{
      this.poruka="Ulogujte se da biste zaduzili knjigu";
    }
  }
  
  razduzi(){
    this.mozeDaSeZaduzi=true;
    this.zaduzenaJe=false;
    let sada = Date.now();
    this.knjigeServis.razduzi(this.knjiga.id, this.kor.kor_ime, new Date(sada).toUTCString()).subscribe((k)=>{
      console.log(k);
      this.knjiga.na_stanju++;
    });
  }

  dodajRecenziju(){
    if(this.komentar!=""||this.ocena!=null){
      
      this.poruka="";
      
      let moze = false;
      console.log(1212);
      if(this.kor==null) { this.poruka="Ulogujte se da biste ostavili recenziju"; return;}
      this.knjigeServis.dohvatiSvaZaduzenjaKorisnika(this.kor.kor_ime).subscribe((podaci: Zaduzenje[])=>{
        podaci.forEach(zad => {
          if(zad.idK==this.knjiga.id){
            moze=true;console.log(122);
          }
        });
        if(!moze) { this.poruka="Niste zaduzivali knjigu stoga ne mozete da dodate recenziju"; return;}
        let done = false;
        console.log(33);
        let novaRecenzija = new Recenzija();
        novaRecenzija.citalac=this.kor.kor_ime;
        novaRecenzija.datum=new Date(Date.now()).toUTCString();
        novaRecenzija.idK=this.knjiga.id;
        novaRecenzija.komentar=this.komentar;
        novaRecenzija.naziv=this.knjiga.naziv;
        novaRecenzija.ocena=this.ocena;

        this.recenzijeKnjige.forEach(rec => {
          if(rec.citalac==this.kor.kor_ime) {
            done=true;
            this.knjigeServis.updateRec(novaRecenzija).subscribe(()=>{console.log(111);
              // console.log();
              location.reload();
            })
          }
        });
        if(done) { location.reload(); return;}
        console.log(1);
        this.knjigeServis.dodajRec(novaRecenzija).subscribe((l)=>{console.log(113);
          console.log(l);
          location.reload();
        })
        location.reload();
      })
    }
    else{
      this.poruka="Recenzija je prazna";
    }
  }

  izmeni(){
    this.autor_novo=this.knjiga.autor;
    this.godina_novo=this.knjiga.godina;
    this.izdavac_novo=this.knjiga.izdavac;
    this.jezik_novo=this.knjiga.jezik;
    this.na_stanju_novo=this.knjiga.na_stanju;
    this.naziv_novo=this.knjiga.naziv;
    this.zanr_novo=this.knjiga.zanr;
    this.imagePreview=this.knjiga.slika;
    this.izmena=true;

  }

  potvrdi(){
    if(this.autor_novo==""&&this.godina_novo==""&&this.izdavac_novo==""&&this.jezik_novo==""&&this.na_stanju_novo==null&&this.naziv_novo==""&&this.zanr_novo==""&&this.imagePreview=="") {console.log('kek'); return;}
    this.knjiga.autor=this.autor_novo;
    this.knjiga.godina=this.godina_novo;
    this.knjiga.izdavac=this.izdavac_novo;
    this.knjiga.jezik=this.jezik_novo;
    this.knjiga.na_stanju=this.na_stanju_novo;
    this.knjiga.naziv=this.naziv_novo;
    this.knjiga.zanr=this.zanr_novo;
    this.knjiga.slika=this.imagePreview;

    this.knjigeServis.azurirajPodatkeKnjige(this.knjiga).subscribe((l)=>{
      console.log(l);
      this.autor_novo="";
      this.godina_novo="";
      this.izdavac_novo="";
      this.jezik_novo="";
      this.na_stanju_novo=null;
      this.naziv_novo="";
      this.zanr_novo="";
      this.imagePreview="";
    })
    this.izmena=false;
  }

  selectedFile : File;
  imagePreview: string="";

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

  obrisiKnjigu(){
    this.knjigeServis.dohvatiSvaZaduzenjaUkupno().subscribe((sz: Zaduzenje[])=>{
      let svaZaduzenja=sz;
      if(sz!=null){
        svaZaduzenja.forEach(z => {
          if(z.aktivno&&(z.idK==this.knjiga.id)){
            this.neMere=true;
          }
        });
        if(!this.neMere){
          this.knjigeServis.obrisiKnjigu(this.knjiga.id).subscribe((l)=>{
            console.log(l);
            this.ruter.navigate(['']);
          })
        }
        else{
          this.poruka="Nije moguce obrisati knjigu jer je ona jos uvek zaduzena";
          return;
        }
      }
    })
  }


}
