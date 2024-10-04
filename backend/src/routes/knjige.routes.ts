import express from 'express';
import { KnjigaController } from '../controllers/knjige.controller';
import { KorisnikController } from '../controllers/korisnik.controller';

const knjigaRouter = express.Router();



knjigaRouter.route('/nadjiKnjiguPoNazivu').post(
    (req, res)=>new KnjigaController().nadjiKnjiguPoNazivu(req, res)
);

knjigaRouter.route('/nadjiKnjiguPoNazivuAutoruIzdavacuJezikuGodini').post(
    (req, res)=>new KnjigaController().nadjiKnjiguPoNazivuAutoruIzdavacuJezikuGodini(req, res)
);

knjigaRouter.route('/dohvatiTop3Knjige').get(
    (req, res)=>new KnjigaController().dohvatiTop3Knjige(req, res)
);

knjigaRouter.route('/dohvatiSveKnjige').get(
    (req, res)=>new KnjigaController().dohvatiSveKnjige(req, res)
);

knjigaRouter.route('/dohvatiKnjiguDana').post(
    (req, res)=>new KnjigaController().dohvatiKnjiguDana(req, res)
);

knjigaRouter.route('/dohvatiKnjiguSaMaxID').get(
    (req, res)=>new KnjigaController().dohvatiKnjiguSaMaxID(req, res)
);

knjigaRouter.route('/dohvatiZaduzenjaKorisnika').post(
    (req, res)=>new KnjigaController().dohvatiZaduzenjaKorisnika(req, res)
);

knjigaRouter.route('/dohvatiSvaZaduzenjaUkupno').get(
    (req, res)=>new KnjigaController().dohvatiSvaZaduzenjaUkupno(req, res)
);

knjigaRouter.route('/dohvatiSvaZaduzenjaKorisnika').post(
    (req, res)=>new KnjigaController().dohvatiSvaZaduzenjaKorisnika(req, res)
);

knjigaRouter.route('/zaduzi').post(
    (req, res)=>new KnjigaController().zaduzi(req, res)
);

knjigaRouter.route('/razduzi').post(
    (req, res)=>new KnjigaController().razduzi(req, res)
);

knjigaRouter.route('/dohvatiRecenzije').post(
    (req, res)=>new KnjigaController().dohvatiRecenzije(req, res)
);

knjigaRouter.route('/dodajRec').post(
    (req, res)=>new KnjigaController().dodajRec(req, res)
);

knjigaRouter.route('/updateRec').post(
    (req, res)=>new KnjigaController().updateRec(req, res)
);

knjigaRouter.route('/azurirajPodatkeKnjige').post(
    (req, res)=>new KnjigaController().azurirajPodatkeKnjige(req, res)
);

knjigaRouter.route('/dodajKnjigu').post(
    (req, res)=>new KnjigaController().dodajKnjigu(req, res)
);

knjigaRouter.route('/obrisiKnjigu').post(
    (req, res)=>new KnjigaController().obrisiKnjigu(req, res)
);





// korisnikRouter.route('/nadjiKorisnikaPoMejlu').post(
//     (req, res)=>new KorisnikController().nadjiKorisnikaPoMejlu(req, res)
// );

// korisnikRouter.route('/promenaLozinke').post(
//     (req, res)=> new KorisnikController().promenaLozinke(req, res)
// )

// korisnikRouter.route('/registracija').post(
//     (req, res)=> new KorisnikController().registracija(req, res)
// )

// korisnikRouter.route('/registracijaKorisnika').post(
//     (req, res)=> new KorisnikController().registracijaKorisnika(req, res)
// )

// korisnikRouter.route('/dohvatiZahteve').get(
//     (req, res)=>new KorisnikController().dohvatiZahteve(req, res)
// );

// korisnikRouter.route('/prihvatiZahteve').post(
//     (req, res)=>new KorisnikController().prihvatiZahteve(req, res)
// );

// korisnikRouter.route('/obrisiZahteve').post(
//     (req, res)=>new KorisnikController().obrisiZahteve(req, res)
// );



export default knjigaRouter;