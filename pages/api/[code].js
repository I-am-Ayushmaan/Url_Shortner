import Urls from "@/models/urls";
import connectMongo from "@/utils/connectMongo";

export default async function handler (req,res){
    if(req.method === "GET"){
        const { code } =req.query;
        await connectMongo();  
        const data =  await Urls.find({code : req.query.code});
        if(data){
          const redirectUrl = data[0].url;
          data[0].clicked+=1;
          data[0].save();
          return  res.redirect(302,redirectUrl);
        }
        else{
          return  res.status(404);
        }
    }
    else{
        return res.status(400);
    }
}