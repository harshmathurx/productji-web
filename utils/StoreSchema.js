const mongoose = require('mongoose');
const crypto = require('crypto');

const uuidv1 = require('uuidv1');
const { throws } = require('assert');

const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    hashed_password: {
        type: String,
        required: true,
    },
    salt: String,
    about: {
        type: String,
        trim: true
    },
    photo:{
        type: String
    },
    city: {
        type: String
    },
    address: {
        type: String,
    },
    phone: {
        type: String
    },
    link: {
        type: String
    },
    openTiming: {
        type: String
    },
    expiresAt :{
        type: Date,
    },
    isSubscribed: {
        type: Boolean,
        default: false,
        required: true
    },
    verified:{
        type: Boolean,
        default: false,
        required: true
    }

},{timestamps: true})

//virtual field
storeSchema.virtual('password')
.set(function(password){
    this._password = password;
    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(password);
})

.get(function(){
    return this._password;
})

storeSchema.methods = {
    authenticate: function(plainText){
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    encryptPassword: function(password){
        if(!password){
            return '';
        }

        try{
            return crypto.createHmac('sha1',this.salt)
                .update(password)
                .digest('hex');
        }
        catch(err){
            return '';
        }
    }
}

let Store = mongoose.models.Store || mongoose.model("Store",storeSchema)
export default Store