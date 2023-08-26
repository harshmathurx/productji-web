const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },

    description: {
        type: String,
        required: true,
         maxlength: 2000
    },

    price: {
        type: Number,
        trim: true,
        required: true,
        maxlength: 32
    },

    category: {
        type: Array,
        required: true
    },

    photo: {
        type: Array
    },

    link: {
        type: String,
        trim: true,
        required: true
    },
    store: {
        required: true,
        type: ObjectId,
        ref: "Store"
    }

},{timestamps: true})

productSchema.index({
   name: 'text',
   description: 'text'
});

let Product = mongoose.models.Product || mongoose.model("Product",productSchema)

export default Product