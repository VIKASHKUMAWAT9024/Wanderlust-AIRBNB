const mongoose = require('mongoose');
const initData= require("../init/data.js");
const Listing = require("../models/listing");


const MONGO_URl="mongodb://127.0.0.1:27017/wanderlust"

main()
.then(()=>{
    console.log("Connected to MongoDB");
})
.catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect(MONGO_URl);
}

const initDB=async()=>{
    await Listing.deleteMany({});
     initData.data=initData.data.map((obj)=>({
        ...obj,
         owner:"690b49952b77f788ea80f7d3"
        }));
    await Listing.insertMany(initData.data);
    console.log("Data Initialized");

}
initDB();