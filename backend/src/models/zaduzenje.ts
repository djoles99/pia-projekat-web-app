import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Zaduzenje = new Schema(
    {
        idK: {
            type: Number
        },
        naziv: {
            type: String
        },
        autor: {
            type: String
        },
        datumZ: {
            type: String
        },
        datumV: {
            type: String
        },
        citalac: {
            type: String
        },
        aktivno: {
            type: Boolean
        }
    }
);

export default mongoose.model('Zaduzenje', Zaduzenje, 'zaduzenja');