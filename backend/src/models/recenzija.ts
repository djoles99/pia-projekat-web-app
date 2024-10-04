import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Recenzija = new Schema(
    {
        idK: {
            type: Number
        },
        naziv: {
            type: String
        },
        datum: {
            type: String
        },
        ocena: {
            type: Number
        },
        citalac: {
            type: String
        },
        komentar: {
            type: String
        }
    }
);

export default mongoose.model('Recenzija', Recenzija, 'recenzije');