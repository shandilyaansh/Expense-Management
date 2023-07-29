const mongoose = require('mongoose')

const transectioSchema = new mongoose.Schema({
    userid:{
        type:String,
        required:[true,'Userid is required']
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required']
    },
    type:{
        type:String,
        required:[true,'Required is true']
    },
    category: {
        type: String,
        required: [true, 'Category is required']
    },
    reference: {
        type: String
    },
    description: {
        type: String,
        required: [true, "Desc is required"]
    },
    date: {
        type: Date,
        required: [true, 'Date is required']
    }
}, { timestamps: true })


const transectionModel = mongoose.model('transections', transectioSchema);
module.exports=transectionModel