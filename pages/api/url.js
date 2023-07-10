import connectMongo from '../../utils/connectMongo';
import Urls from '../../models/urls';

export default async function handler (req,res){
    if(req.method === "GET"){
        await connectMongo();
        const urlList = await Urls.find();
        return res.status(200).json(urlList);
    }
    else if(req.method === "POST"){
        if(!req.body.url){
          return res.status(404).json("Please provide url");
        }
        await connectMongo();
        const newUrl = await Urls.create({
          url : req.body.url,
        });

        return res.status(201).json(newUrl);
     }
    else{
      return res.status(404);
    }
  };