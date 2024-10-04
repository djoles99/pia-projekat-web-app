import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css']
})
export class PrijavaComponent implements OnInit {

  constructor(private ruter: Router, private korisnikServis: KorisnikService) { }

  ngOnInit(): void {
    // this.korisnikServis.kurcina().subscribe((podaci: Zahtev[])=>{
    //   this.za=podaci;
    //   this.imagePreview=this.za[0].slika;
    //   this.korisnikServis.kurcina2().subscribe((p2: Zahtev)=>{
    //     this.imagePreview2=p2.slika;
    //   })
    // })
  }

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
              this.ruter.navigate(['']);
              this.kor=k;
            }
            else if(k.tip=='citalac'){
              localStorage.setItem('ulogovan', JSON.stringify(k));
              this.ruter.navigate(['']);
              this.kor=k;
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

}
