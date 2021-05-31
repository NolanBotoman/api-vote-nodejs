'use strict';

var crypto = require('crypto');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type : String,
        required : true
    },
    email: {
        type : String,
        unique : true,
        required : true
    },
    is_admin: {
        type : Boolean,
        default: false,
        required : true
    },
    hash: {
        type : String,
        required : true
    },
    salt: {
        type : String,
        required : true
    }
});

userSchema.methods.generateHash = function(password) 
{
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 16, 'sha512').toString('hex');

    return {
        hash: hash,
        salt: salt
    };
}

userSchema.methods.storePassword = function(password) {
    const generated = this.generateHash(password);

    this.hash = generated.hash;
    this.salt = generated.salt;
}

userSchema.methods.verifyHash = function(password) 
{
    return this.hash == this.generateHash(password);
}

userSchema.methods.generateNewJWT = function() 
{
    return jwt.sign({
        _id : this._id,
        email : this.email,
    }, JWT_SECRET, { expiresIn : '10d' })
}

const User = mongoose.model('User', userSchema);
module.exports = User;