import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private ruter: Router, private korisnikServis: KorisnikService) { }

  ngOnInit(): void {
    localStorage.clear();
    this.kor=null;
  }

  kor_ime: string;
  lozinka: string;
  poruka: string;
  kor: Korisnik;


  prijaviSe(){
    if(this.kor_ime!=null&&this.lozinka!=null){
      this.korisnikServis.nadjiKorisnika(this.kor_ime).subscribe((k: Korisnik)=>{
        if(k){
          if(k.lozinka==this.lozinka){
            this.poruka='';
            if(k.tip=='admin'){
              localStorage.setItem('ulogovan', JSON.stringify(k));
              //this.ruter.navigate(['administrator']);
              this.kor=k;
              this.ruter.navigate(['']);
            }
            else{
              this.poruka='Uneti korisnik nije administrator';
            }
          }
          else{
            this.poruka = 'Neispravna lozinka';
          }
        }
        else{
          this.poruka = 'Korisnicko ime ne odgovara nijednom korisniku';
        } 
      });
    }
    else{
      this.poruka='Polja nisu popunjena';
      //this.ruter.navigate(['']);
    }
  }

  // odjaviSe(){
  //   localStorage.clear();
  //   this.ruter.navigate(['']);
  // }

}
