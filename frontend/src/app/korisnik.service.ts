import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  // produzetak=14;

  // getProduzetak(): number{
  //   return this.produzetak;
  // }

  // setProduzetak(a: number){
  //   this.produzetak=a;
  // }

  registracija(zahtev){
    const podaci={
      zahtev: zahtev
    }

    return this.http.post(`${this.uri}/korisnici/registracija`, podaci);
  }

  nadjiKorisnika(kor_ime){
    const podaci={
      kor_ime: kor_ime
    }
    
    return this.http.post(`${this.uri}/korisnici/nadjiKorisnika`, podaci);
  }

  nadjiKorisnikaPoMejlu(mejl){
    const podaci={
      mejl: mejl
    }
    
    return this.http.post(`${this.uri}/korisnici/nadjiKorisnikaPoMejlu`, podaci);
  }

  dohvatiZahteve(){
    return this.http.get(`${this.uri}/korisnici/dohvatiZahteve`);
  }

  prihvatiZahteve(z){
    const podaci={
      z: z
    }
    
    return this.http.post(`${this.uri}/korisnici/prihvatiZahteve`, podaci);
  }

  obrisiZahteve(z){
    const podaci={
      z: z
    }
    
    return this.http.post(`${this.uri}/korisnici/obrisiZahteve`, podaci);
  }


  registrujNekretninu(tip_nekretnine, lokacija, cena, kvadratura, broj_soba){
    const podaci={
      tip_nekretnine: tip_nekretnine,
      lokacija: lokacija,
      cena: cena,
      kvadratura: kvadratura,
      broj_soba: broj_soba,
      prodata: false
    }

    return this.http.post(`${this.uri}/korisnici/registrujNekretninu`, podaci);
  }

  promenaLozinke(kor_ime, stara_lozinka, nova_lozinka){
    const podaci={
      kor_ime: kor_ime,
      stara_lozinka: stara_lozinka,
      nova_lozinka: nova_lozinka
    }

    return this.http.post(`${this.uri}/korisnici/promenaLozinke`, podaci);
  }

  registracijaKorisnika(k){
    const podaci={
      k: k
    }

    return this.http.post(`${this.uri}/korisnici/registracijaKorisnika`, podaci);
  }

  azurirajPodatke(kor_ime, kor_ime_novo, ime, prezime, mejl, adresa, telefon, img){
    const podaci={
      kor_ime: kor_ime,
      kor_ime_novo: kor_ime_novo,
      ime: ime,
      prezime: prezime,
      mejl: mejl,
      adresa: adresa,
      telefon: telefon,
      img: img
    }

    return this.http.post(`${this.uri}/korisnici/azurirajPodatke`, podaci);
  }

  dohvatiSveKorisnike(){
    return this.http.get(`${this.uri}/korisnici/dohvatiSveKorisnike`);
  }

  obrisiKorisnika(kor_ime){
    const podaci={
      kor_ime: kor_ime
    }

    return this.http.post(`${this.uri}/korisnici/obrisiKorisnika`, podaci);
  }

  dodajKorisnika(k){
    const podaci={
      k: k
    }

    return this.http.post(`${this.uri}/korisnici/dodajKorisnika`, podaci);
  }

  obrisiZahtev(kor_ime){
    const podaci={
      kor_ime: kor_ime
    }

    return this.http.post(`${this.uri}/korisnici/obrisiZahtev`, podaci);
  }

  odbijZahtev(kor_ime, ime, prezime, adresa){
    const podaci={
      kor_ime: kor_ime,
      ime: ime,
      prezime: prezime,
      adresa: adresa,
    }

    return this.http.post(`${this.uri}/korisnici/odbijZahtev`, podaci);
  }

  dajProduzetak(){
    return this.http.get(`${this.uri}/korisnici/dajProduzetak`);
  }

  staviProduzetak(produzetak){
    const podaci={
      produzetak: produzetak
    }

    return this.http.post(`${this.uri}/korisnici/staviProduzetak`, podaci);
  }


  
}