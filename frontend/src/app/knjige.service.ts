import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KnjigeService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  // registracija(zahtev){
  //   const podaci={
  //     zahtev: zahtev
  //   }

  //   return this.http.post(`${this.uri}/korisnici/registracija`, podaci);
  // }

  // nadjiKorisnika(kor_ime){
  //   const podaci={
  //     kor_ime: kor_ime
  //   }
    
  //   return this.http.post(`${this.uri}/korisnici/nadjiKorisnika`, podaci);
  // }

  // nadjiKorisnikaPoMejlu(mejl){
  //   const podaci={
  //     mejl: mejl
  //   }
    
  //   return this.http.post(`${this.uri}/korisnici/nadjiKorisnikaPoMejlu`, podaci);
  // }

  dohvatiTop3Knjige(){
    return this.http.get(`${this.uri}/knjige/dohvatiTop3Knjige`);
  }

  dohvatiSveKnjige(){
    return this.http.get(`${this.uri}/knjige/dohvatiSveKnjige`);
  }

  nadjiKnjiguPoNazivu(naziv){
    const podaci={
      naziv: naziv
    }

    return this.http.post(`${this.uri}/knjige/nadjiKnjiguPoNazivu`, podaci);
  }

  nadjiKnjiguPoNazivuAutoruIzdavacuJezikuGodini(naziv, autor, izdavac, jezik, godina){
    const podaci={
      naziv: naziv,
      autor: autor,
      izdavac: izdavac,
      jezik: jezik,
      godina: godina
    }

    return this.http.post(`${this.uri}/knjige/nadjiKnjiguPoNazivuAutoruIzdavacuJezikuGodini`, podaci);
  }

  dohvatiKnjiguDana(id){
    const podaci={
      id: id
    }
    return this.http.post(`${this.uri}/knjige/dohvatiKnjiguDana`, podaci);
  }

  dohvatiKnjiguSaMaxID(){
    return this.http.get(`${this.uri}/knjige/dohvatiKnjiguSaMaxID`);
  }

  dohvatiKnjiguPoID(id){
    const podaci={
      id: id
    }
    return this.http.post(`${this.uri}/knjige/dohvatiKnjiguDana`, podaci);
  }

  dohvatiZaduzenjaKorisnika(kor_ime){
    const podaci={
      kor_ime: kor_ime
    }
    return this.http.post(`${this.uri}/knjige/dohvatiZaduzenjaKorisnika`, podaci);
  }

  dohvatiSvaZaduzenjaUkupno(){
    return this.http.get(`${this.uri}/knjige/dohvatiSvaZaduzenjaUkupno`);
  }

  dohvatiSvaZaduzenjaKorisnika(kor_ime){
    const podaci={
      kor_ime: kor_ime
    }
    return this.http.post(`${this.uri}/knjige/dohvatiSvaZaduzenjaKorisnika`, podaci);
  }

  zaduzi(z){
    const podaci={
      z: z
    }
    return this.http.post(`${this.uri}/knjige/zaduzi`, podaci);
  }

  razduzi(idK, kor_ime, datum){
    const podaci={
      idK: idK,
      kor_ime: kor_ime, 
      datum: datum
    }
    return this.http.post(`${this.uri}/knjige/razduzi`, podaci);
  }

  dohvatiRecenzije(id){
    const podaci={
      id: id
    }
    return this.http.post(`${this.uri}/knjige/dohvatiRecenzije`, podaci);
  }

  updateRec(rec){
    const podaci={
      rec: rec
    }
    return this.http.post(`${this.uri}/knjige/updateRec`, podaci);
  }

  dodajRec(rec){
    const podaci={
      rec: rec
    }
    return this.http.post(`${this.uri}/knjige/dodajRec`, podaci);
  }

  azurirajPodatkeKnjige(k){
    const podaci={
      k: k
    }
    return this.http.post(`${this.uri}/knjige/azurirajPodatkeKnjige`, podaci);
  }

  dodajKnjigu(k){
    const podaci={
      k: k
    }
    return this.http.post(`${this.uri}/knjige/dodajKnjigu`, podaci);
  }

  obrisiKnjigu(id){
    const podaci={
      id: id
    }
    return this.http.post(`${this.uri}/knjige/obrisiKnjigu`, podaci);
  }

  // prihvatiZahteve(z){
  //   const podaci={
  //     z: z
  //   }
    
  //   return this.http.post(`${this.uri}/korisnici/prihvatiZahteve`, podaci);
  // }

  // obrisiZahteve(z){
  //   const podaci={
  //     z: z
  //   }
    
  //   return this.http.post(`${this.uri}/korisnici/obrisiZahteve`, podaci);
  // }


  // registrujAgenciju(naziv, adresa, grad, opstina, telefon, PIB){
  //   const podaci={
  //     naziv: naziv,
  //     adresa: adresa,
  //     grad: grad,
  //     opstina: opstina,
  //     telefon: telefon,
  //     PIB: PIB
  //   }

  //   return this.http.post(`${this.uri}/korisnici/registrujAgenciju`, podaci);
  // }

  // nadjiAgencijuPoPIBu(aPIB){
  //   const podaci={
  //     aPIB: aPIB
  //   }
    
  //   return this.http.post(`${this.uri}/korisnici/nadjiAgencijuPoPIBu`, podaci);
  // }

  // registrujNekretninu(tip_nekretnine, lokacija, cena, kvadratura, broj_soba){
  //   const podaci={
  //     tip_nekretnine: tip_nekretnine,
  //     lokacija: lokacija,
  //     cena: cena,
  //     kvadratura: kvadratura,
  //     broj_soba: broj_soba,
  //     prodata: false
  //   }

  //   return this.http.post(`${this.uri}/korisnici/registrujNekretninu`, podaci);
  // }

  // promenaLozinke(kor_ime, stara_lozinka, nova_lozinka){
  //   const podaci={
  //     kor_ime: kor_ime,
  //     stara_lozinka: stara_lozinka,
  //     nova_lozinka: nova_lozinka
  //   }

  //   return this.http.post(`${this.uri}/korisnici/promenaLozinke`, podaci);
  // }

  // registracijaKorisnika(k){
  //   const podaci={
  //     k: k
  //   }

  //   return this.http.post(`${this.uri}/korisnici/registracijaKorisnika`, podaci);
  // }



}
