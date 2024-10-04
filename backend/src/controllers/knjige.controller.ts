import express from "express";
import Zahtev from "../models/zahtev";
import Korisnik from "../models/korisnik";
import Knjiga from "../models/knjiga";
import Zaduzenje from "../models/zaduzenje";
import Recenzija from "../models/recenzija";

export class KnjigaController {


//   registrujNovogKorisnika = (req: express.Request, res: express.Response) => {
//     let zahtev = new Zahtev(req.body);

//     zahtev.save().then((zahtev) => {
//         res.json({ message: "zahtev podnet!" });
//     }).catch((err) => {
//         res.json(err);
//     });
//   }

  nadjiKnjiguPoNazivu = (req: express.Request, res: express.Response) => {
    let naziv = req.body.naziv;

    Knjiga.find({ naziv: naziv }, (err, k) => {
      if (err) {
        console.log(err);
        res.json(err);
      } else {
        console.log(k);
        res.json(k);
      }
    });
  }

  nadjiKnjiguPoNazivuAutoruIzdavacuJezikuGodini = (req: express.Request, res: express.Response) => {
    let naziv = req.body.naziv;
    let autor = req.body.autor;
    let jezik = req.body.jezik;
    let godina = req.body.godina;
    let izdavac = req.body.izdavac;

    Knjiga.findOne({ naziv: naziv, autor: autor, jezik: jezik, godina: godina, izdavac: izdavac }, (err, k) => {
      if (err) {
        console.log(err);
        res.json(err);
      } else {
        console.log(k);
        res.json(k);
      }
    });
  }

  dohvatiSveKnjige = (req: express.Request, res: express.Response) => {

    Knjiga.find({}, (err, k) => {
      if (err) {
        console.log(err);
        res.json(err);
      } else {
        console.log(k);
        res.json(k);
      }
    });
  }

  dohvatiTop3Knjige = (req: express.Request, res: express.Response) => {
    //res.json(Knjiga.find().sort({broj_uzimanja:-1}).limit(3));
    Knjiga.find().sort({broj_uzimanja:-1}).limit(3).then((k) => {
        res.json(k);
    }).catch((err) => {
        res.json(err);
    })
  }

  dohvatiKnjiguDana = (req: express.Request, res: express.Response) => {
    let id= req.body.id;

    Knjiga.findOne({id: id }, (err, k) => {
        if (err) {
          console.log(err);
          res.json(err);
        } else {
          console.log(k);
          res.json(k);
        }
      });
  }

  dohvatiKnjiguSaMaxID = (req: express.Request, res: express.Response) => {
    Knjiga.find().sort({id:-1}).limit(1).then((k) => {
        res.json(k);
    }).catch((err) => {
        res.json(err);
    })
  }

  dohvatiZaduzenjaKorisnika = (req: express.Request, res: express.Response) => {
    let kor_ime = req.body.kor_ime;

    Zaduzenje.find({ 'citalac': kor_ime, 'aktivno': 'true' }, (err, k) => {
      if (err) {
        console.log(err);
        res.json(err);
      } else {
        console.log(k);
        res.json(k);
      }
    });
  }

  dohvatiSvaZaduzenjaKorisnika = (req: express.Request, res: express.Response) => {
    let kor_ime = req.body.kor_ime;

    Zaduzenje.find({ 'citalac': kor_ime }, (err, k) => {
      if (err) {
        console.log(err);
        res.json(err);
      } else {
        console.log(k);
        res.json(k);
      }
    });
  }

  dohvatiSvaZaduzenjaUkupno = (req: express.Request, res: express.Response) => {

    Zaduzenje.find({}, (err, k) => {
      if (err) {
        console.log(err);
        res.json(err);
      } else {
        console.log(k);
        res.json(k);
      }
    });
  }

  zaduzi = (req: express.Request, res: express.Response) => {
    let zad = new Zaduzenje(req.body.z);

    

    Knjiga.updateOne({'id': zad.idK}, {$inc: {'na_stanju': -1, 'broj_uzimanja': 1}}, (err, k)=>{
      if(err) {
        console.log(err);
      }
      else {
        zad.save().then((zz) => {
            res.json({ message: "zaduzenje dodato!" });
        }).catch((err) => {
            res.json(err);
        });
      }
    })
    
  }

  razduzi = (req: express.Request, res: express.Response) => {
    let idK = req.body.idK;
    let kor_ime = req.body.kor_ime;
    let datum = req.body.datum;

    Zaduzenje.updateOne({'idK': idK, 'citalac': kor_ime, 'aktivno': 'true'}, {'aktivno': 'false', 'datumV': datum}, (err, k)=>{
      if(err) console.log(err);
      else {
          res.json(k);
      }
    })

    Knjiga.updateOne({'id': idK}, {$inc: {'na_stanju': 1}}, (err, k2)=>{
      if(err) console.log(err);
      else {
          //res.json(k2);
      }
    })
  }

  dohvatiRecenzije = (req: express.Request, res: express.Response) => {
    let id= req.body.id;

    Recenzija.find({idK: id }, (err, k) => {
        if (err) {
          console.log(err);
          res.json(err);
        } else {
          console.log(k);
          res.json(k);
        }
      });
  }

  updateRec = (req: express.Request, res: express.Response) => {
    let rec = new Recenzija(req.body.rec);

    Recenzija.updateOne({'idK': rec.idK, 'citalac': rec.citalac}, {'datum': rec.datum, 'ocena': rec.ocena, 'komentar': rec.komentar}, (err, k)=>{
      if(err) {
        console.log(err);
      }
      else {
        console.log(k);
      }
    })
  }

  dodajRec = (req: express.Request, res: express.Response) => {
    let rec = new Recenzija(req.body.rec);

    rec.save().then((r) => {
        res.json({ message: "recenzija dodata!" });
    }).catch((err) => {
        res.json(err);
    });
  }


  azurirajPodatkeKnjige = (req: express.Request, res: express.Response)=>{
    let k = new Knjiga(req.body.k);

    Knjiga.updateOne({'id': k.id}, {'autor': k.autor, 'godina': k.godina, 'izdavac': k.izdavac, 'jezik': k.jezik, 'na_stanju': k.na_stanju, 'naziv': k.naziv, 'zanr': k.zanr, 'slika': k.slika}, (err, k)=>{
        if(err) console.log(err);
        else {
            res.json(k);
        }
    })
}


dodajKnjigu = (req: express.Request, res: express.Response) => {
  let k = new Knjiga(req.body.k);

  k.save().then((k1) => {
      res.json({ message: "knjiga dodata!" });
  }).catch((err) => {
      res.json(err);
  });
}

obrisiKnjigu = (req: express.Request, res: express.Response) => {
  let id = req.body.id;

  Knjiga.deleteOne({id: id}, (err, k)=>{
    if(err) console.log(err);
    else {
        res.json(k);
    }
  })
}
    




}