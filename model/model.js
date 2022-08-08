const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {

        type: String
    }, surname: {

        type: String
    }, username: {

        type: String
    }, address: {

        type: String
    }, isKYCDone: {

        type: String
    },
    privateKey: {

        type: String
    },
    mnenomics: {

        type: String
    },
    password: {
        required: true,
        type: String
    }, email: {
        required: true,
        type: String
    },
    phone: {

        type: String
    }
    , balance: {

        type: String
    }, state: {

        type: String
    }, city: {

        type: String
    }
})

module.exports = mongoose.model('Data', dataSchema)