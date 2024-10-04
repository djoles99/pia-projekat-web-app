import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Zahtev = new Schema(
    {
        kor_ime: {
            type: String
        },
        lozinka: {
            type: String
        },
        ime: {
            type: String
        },
        prezime: {
            type: String
        },
        tip: {
            type: String
        },
        mejl: {
            type: String
        },
        adresa: {
            type: String
        },
        telefon: {
            type: String
        },
        slika: {
            type: String
        }
    }
);

export default mongoose.model('Zahtev', Zahtev, 'zahtevi');
