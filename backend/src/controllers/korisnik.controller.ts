import express from "express";
import Zahtev from "../models/zahtev";
import Korisnik from "../models/korisnik";
import Produzetak from "../models/produzetak";

export class KorisnikController {


//   registrujNovogKorisnika = (req: express.Request, res: express.Response) => {
//     let zahtev = new Zahtev(req.body);

//     zahtev.save().then((zahtev) => {
//         res.json({ message: "zahtev podnet!" });
//     }).catch((err) => {
//         res.json(err);
//     });
//   }

  nadjiKorisnika = (req: express.Request, res: express.Response) => {
    let kor_ime = req.body.kor_ime;

    Korisnik.findOne({ kor_ime: kor_ime }, (err, kor) => {
      if (err) {
        console.log(err);
        res.json(err);
      } else {
        console.log(kor);
        res.json(kor);
      }
    });
  }

//   nadjiKorisnikaPoMejlu = (req: express.Request, res: express.Response) => {
//     let mejl = req.body.mejl;

//     Korisnik.findOne({ mejl: mejl }, (err, kor) => {
//       if (err) {
//         console.log(err);
//         res.json(err);
//       } else {
//         console.log(kor);
//         res.json(kor);
//       }
//     });
//   }

promenaLozinke = (req: express.Request, res: express.Response)=>{
    let kor_ime = req.body.kor_ime;
    let stara_lozinka = req.body.stara_lozinka;
    let nova_lozinka = req.body.nova_lozinka;

    Korisnik.updateOne({'kor_ime': kor_ime, 'lozinka': stara_lozinka}, {'lozinka': nova_lozinka}, (err, korisnik)=>{
        if(err) console.log(err);
        else {
            res.json(korisnik);
        }
    })
}

registracija = (req: express.Request, res: express.Response) => {
  let zahtev = new Zahtev(req.body.zahtev);

  zahtev.save().then((zah) => {
      res.json({ message: "zahtev dodat!" });
  }).catch((err) => {
      res.json(err);
  });
}

azurirajPodatke = (req: express.Request, res: express.Response)=>{
    let kor_ime = req.body.kor_ime;
    let kor_ime_novo = req.body.kor_ime_novo;
    let ime = req.body.ime;
    let prezime = req.body.prezime;
    let mejl = req.body.mejl;
    let adresa = req.body.adresa;
    let telefon = req.body.telefon;
    let slika = req.body.img;

    Korisnik.updateOne({'kor_ime': kor_ime}, {'kor_ime': kor_ime_novo, 'ime': ime, 'prezime': prezime, 'mejl': mejl, 'adresa': adresa, 'telefon': telefon, 'slika': slika}, (err, korisnik)=>{
        if(err) console.log(err);
        else {
            res.json(korisnik);
        }
    })
}

dohvatiSveKorisnike = (req: express.Request, res: express.Response) => {

  Korisnik.find({}, (err, kor) => {
    if (err) {
      console.log(err);
      res.json(err);
    } else {
      console.log(kor);
      res.json(kor);
    }
  });
}

obrisiKorisnika = (req: express.Request, res: express.Response) => {
  let kor_ime = req.body.kor_ime;

  Korisnik.deleteOne({kor_ime: kor_ime}, (err, k)=>{
    if(err) console.log(err);
    else {
        res.json(k);
    }
  })
}

// registracijaKorisnika = (req: express.Request, res: express.Response) => {
//   let kor = new Korisnik(req.body.k);

//   kor.save().then((k) => {
//       res.json({ message: "zahtev dodat!" });
//   }).catch((err) => {
//       res.json(err);
//   });
// }


  dohvatiZahteve = (req: express.Request, res: express.Response)=>{
    Zahtev.find({}, (err, zah)=>{
        if(err) console.log(err);
        else res.json(zah)
    })
  }

  dodajKorisnika = (req: express.Request, res: express.Response) => {
    let k = new Korisnik(req.body.k);
    k.save().then((kk) => {
      res.json({ message: "korisnik dodat!" });
    }).catch((err) => {
        res.json(err);
    });
  }

  obrisiZahtev = (req: express.Request, res: express.Response) => {
    let kor_ime = req.body.kor_ime;
  
    Zahtev.deleteMany({kor_ime: kor_ime}, (err, k)=>{
      if(err) console.log(err);
      else {
          res.json(k);
      }
    })
  }

  odbijZahtev = (req: express.Request, res: express.Response) => {
    let kor_ime = req.body.kor_ime;
    let ime = req.body.ime;
    let prezime = req.body.prezime;
    let adresa = req.body.adresa;
  
    Zahtev.deleteOne({kor_ime: kor_ime, ime: ime, prezime: prezime, adresa: adresa }, (err, k)=>{
      if(err) console.log(err);
      else {
          res.json(k);
      }
    })
  }

  dajProduzetak = (req: express.Request, res: express.Response) => {
    Produzetak.findOne({}, (err, p)=>{
      if(err) console.log(err);
      else res.json(p)
    })
  }

  staviProduzetak = (req: express.Request, res: express.Response) => {
    let produzetak = req.body.produzetak;

    Produzetak.updateOne({}, {produzetak:produzetak}, (err, p)=>{
      if(err) console.log(err);
      else res.json(p)
    })
  }

//   dohvatiZahteve = (req: express.Request, res: express.Response)=>{
//     // Zahtev.find({'status': 'false'}, (err, kor)=>{//---------status false
//     //     if(err) console.log(err);
//     //     else res.json(kor)
//     // })
//     Zahtev.find({}, (err, kor)=>{
//       if(err) console.log(err);
//       else res.json(kor)
//   })
//   }

//   prihvatiZahteve = (req: express.Request, res: express.Response)=>{
//     let kor = new Korisnik(req.body.z);
//     kor.save().then(kor=>{res.json({'message':'korisnik dodat!'})}).catch(err=>{res.json(err);});
//     Zahtev.deleteOne({'kor_ime' :req.body.z.kor_ime}).catch(err=>{res.json(err);});
//   }

//   obrisiZahteve = (req: express.Request, res: express.Response)=>{
//     Zahtev.deleteOne({'kor_ime' :req.body.z.kor_ime}).catch(err=>{res.json(err);});
//   }

}