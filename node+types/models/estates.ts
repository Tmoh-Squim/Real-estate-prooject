import mongoose from "mongoose";

const estateSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    images:{
        type:Array
    },
    bedroom:{
        type:Number,
        required:true,
    },
    bathroom:{
        type:Number
    },
    address:{
        type:String
    },
    latitude:{
        type:String,
    },
    longitude:{
        type:String
    },
    price:{
        type:Number,
        required:true
    },
    size:{
        type:String
    },
    city:{
        type:String
    },
    description:{
        type:String,
        required:true
    },
    nearbyPlaces:{
        type:Object
    },
    type:{
        type:String,
        require:true
    },
    property:{
        type:String,
        required:true
    },
    ownerId:{
        type:String,
        required:true
    }
},{timestamps:true})

export default  mongoose.model("Estates",estateSchema)