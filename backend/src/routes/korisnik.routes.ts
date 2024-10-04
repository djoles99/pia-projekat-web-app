import express from 'express';
import { KorisnikController } from '../controllers/korisnik.controller';

const korisnikRouter = express.Router();



korisnikRouter.route('/nadjiKorisnika').post(
    (req, res)=>new KorisnikController().nadjiKorisnika(req, res)
);

// korisnikRouter.route('/nadjiKorisnikaPoMejlu').post(
//     (req, res)=>new KorisnikController().nadjiKorisnikaPoMejlu(req, res)
// );

korisnikRouter.route('/promenaLozinke').post(
    (req, res)=> new KorisnikController().promenaLozinke(req, res)
)

korisnikRouter.route('/registracija').post(
    (req, res)=> new KorisnikController().registracija(req, res)
)

korisnikRouter.route('/azurirajPodatke').post(
    (req, res)=> new KorisnikController().azurirajPodatke(req, res)
)

korisnikRouter.route('/dohvatiSveKorisnike').get(
    (req, res)=> new KorisnikController().dohvatiSveKorisnike(req, res)
)

korisnikRouter.route('/obrisiKorisnika').post(
    (req, res)=> new KorisnikController().obrisiKorisnika(req, res)
)

// korisnikRouter.route('/registracijaKorisnika').post(
//     (req, res)=> new KorisnikController().registracijaKorisnika(req, res)
// )

korisnikRouter.route('/dohvatiZahteve').get(
    (req, res)=>new KorisnikController().dohvatiZahteve(req, res)
);

korisnikRouter.route('/dodajKorisnika').post(
    (req, res)=>new KorisnikController().dodajKorisnika(req, res)
);

korisnikRouter.route('/obrisiZahtev').post(
    (req, res)=>new KorisnikController().obrisiZahtev(req, res)
);

korisnikRouter.route('/odbijZahtev').post(
    (req, res)=>new KorisnikController().odbijZahtev(req, res)
);

korisnikRouter.route('/dajProduzetak').get(
    (req, res)=>new KorisnikController().dajProduzetak(req, res)
);

korisnikRouter.route('/staviProduzetak').post(
    (req, res)=>new KorisnikController().staviProduzetak(req, res)
);

// korisnikRouter.route('/prihvatiZahteve').post(
//     (req, res)=>new KorisnikController().prihvatiZahteve(req, res)
// );

// korisnikRouter.route('/obrisiZahteve').post(
//     (req, res)=>new KorisnikController().obrisiZahteve(req, res)
// );



export default korisnikRouter;