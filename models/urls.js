const {Schema, model, models} = require("mongoose");
import { customAlphabet } from "nanoid";

const characters =  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const getHash = customAlphabet(characters,7);


const UrlSchema =  new Schema({
    code:{
        type: String,
        unique: true,
        default : getHash(),
    },
    url:{type: String, require:true},
    clicked: { type: Number, default: 0},
    
});

const Urls  = models.Urls ||  model("Urls", UrlSchema);
export default Urls;