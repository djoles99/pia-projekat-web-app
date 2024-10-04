import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Produzetak = new Schema(
    {
        produzetak: {
            type: Number
        }
    }
);

export default mongoose.model('Produzetak', Produzetak, 'produzetak');
