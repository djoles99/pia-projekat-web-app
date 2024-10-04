import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Knjiga = new Schema(
    {
        id: {
            type: Number
        },
        naziv: {
            type: String
        },
        autor: {
            type: String
        },
        avg_ocena: {
            type: Number
        },
        zanr: {
            type: String
        },
        izdavac: {
            type: String
        },
        godina: {
            type: String
        },
        jezik: {
            type: String
        },
        slika: {
            type: String
        },
        broj_uzimanja: {
            type: Number
        },
        zaduzena: {
            type: Boolean
        },
        na_stanju: {
            type: Number
        }
    }
);

export default mongoose.model('Knjiga', Knjiga, 'knjige');
