import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../models/korisnik';
import { Zahtev } from '../models/zahtev';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {

  constructor(private korisnikServis: KorisnikService, private ruter: Router) { }

  ngOnInit(): void {
    this.selectedFile=null;
    this.imagePreview="";
    this.tip="citalac";
  }

  slicka: File;

  ime: string;
  prezime: string;
  kor_ime: string;
  lozinka: string;
  mejl: string;
  tip: string;
  telefon: string;
  adresa: string;
  greska: string;

  registracija(){
    if(!this.ime||!this.prezime||!this.kor_ime||!this.lozinka||!this.mejl||!this.telefon||!this.adresa){
      this.greska="Nisu popunjena sva polja";
      return;
    }
    else{//sva polja jesu popunjena
      this.korisnikServis.nadjiKorisnika(this.kor_ime).subscribe((k: Korisnik)=>{
        if(k){
          this.greska="Korisnicko ime je zauzeto";
          return;
        }
        else{
          if(this.proveriLozinku()){//lozinka je dobra
            let zahtev= new Zahtev();
            zahtev.ime=this.ime;
            zahtev.prezime=this.prezime;
            zahtev.kor_ime=this.kor_ime;
            zahtev.lozinka=this.lozinka;
            zahtev.tip=this.tip;
            zahtev.mejl=this.mejl;
            zahtev.adresa=this.adresa;
            zahtev.telefon=this.telefon;
            zahtev.slika=this.imagePreview;

            this.korisnikServis.registracija(zahtev).subscribe(resp=>{
              console.log(resp);
              //this.onUploadFile();
              this.ruter.navigate(['']);
            });

          }
          else{
            
          }
        }
      })
    }
  }

  proveriLozinku(): boolean{
    // for(let i = 2; i<this.lozinka.length;++i){
    //   if((this.lozinka[i]==this.lozinka[i-1])&&(this.lozinka[i]==this.lozinka[i-2])){
    //     this.greska="Neki znak lozinke Vam se ponavlja 3 ili vise puta uzastopno";
    //     return false;
    //   }
    // }
    if(this.lozinka.length>12 || this.lozinka.length<8){
      this.greska="Lozinka nema odgovarajucu duzinu od minimalno 8 i maksimalno 12 karaktera";
      return false;
    }
    //var reg = /((^\.{8,24}$)([A-Z]+)([a-z]+)([0-9]+)([$&+,:;=?@#|'<>.-^*()%!]+))/;
    // /(([a-zA-Z].{1,})&&((?:[a-z].*){3,})&&((?:[A-Z].*){1,})&&((?:\W.*){2,}))/;
    var regNum = /(?:\d.*){1,}/;
    if(!regNum.test(this.lozinka)){
      this.greska="Lozinka treba da ima bar 1 numerik";
      return false;
    }
    // var regLower = /(?:[a-z].*){3,}/;
    // if(!regLower.test(this.nova_lozinka)){
    //   alert("Lozinka treba da ima bar 3 mala slova");
    //   return false;
    // }
    var regUpper = /(?:[A-Z].*){1,}/;
    if(!regUpper.test(this.lozinka)){
      this.greska="Lozinka treba da ima bar 1 veliko slovo";
      return false;
    }
    var regSpec = /(?:\W.*){1,}/;
    if(!regSpec.test(this.lozinka)){
      this.greska="Lozinka treba da ima bar 1 specijalni karakter";
      return false;
    }
    var regStart = /^[a-zA-Z].{1,}$/;
    if(!regStart.test(this.lozinka)){
      this.greska="Lozinka treba da pocinje malim ili velikim slovom";
      return false;
    }
    this.greska=null;
    //alert("Zahtev za promenu je poslat");
    return true;
  }

  nazad(){
    this.ruter.navigate(['']);
  }

  // upload(){
  //   this.korisnikServis.uploadSlike(this.slicka).subscribe(resp=>{
  //     console.log(resp);
  //   });
  // }

  // onFileUpload(event){
  //   const file = event.target.files[0]
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

  //onUploadFile() {
    //Upload file here send a binary data

    // this.korisnikServis.uploadSlike2(this.selectedFile, this.kor_ime).subscribe(resp=>{
    //   console.log(resp);
      
    //   this.korisnikServis.uploadSlike(this.selectedFile).subscribe(resp=>{
    //     console.log(resp);
    //   });
    // });
    //const fd = new FormData();
    //fd.append('image', this.selectedFile, this.selectedFile.name);
    //this.http.post('http://localhost:4000/korisnici/registracija/uploadSlike', fd);
  //}


//   String newFileName = "my-image";
// File imageFile = new File("/users/victor/images/image.png");
// GridFS gfsPhoto = new GridFS(db, "photo");
// GridFSInputFile gfsFile = gfsPhoto.createFile(imageFile);
// gfsFile.setFilename(newFileName);
// gfsFile.save();

}
