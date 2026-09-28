const http=require("http");
const {status,openChannelSetup}=require("./control");
const port=Number(process.env.PORT||3000);

http.createServer(async(req,res)=>{
  res.setHeader("content-type","application/json; charset=utf-8");
  if(req.url==="/health") return res.end(JSON.stringify({ok:true,agent:"youtube-autopilot-agent"}));
  if(req.url==="/status"){
    try{return res.end(JSON.stringify(await status()));}
    catch(e){res.statusCode=401;return res.end(JSON.stringify({ok:false,error:e.message}));}
  }
  if(req.url==="/channel/setup"){
    try{return res.end(JSON.stringify(await openChannelSetup()));}
    catch(e){res.statusCode=500;return res.end(JSON.stringify({ok:false,error:e.message}));}
  }
  res.statusCode=404;
  res.end(JSON.stringify({ok:false,error:"NOT_FOUND"}));
}).listen(port,()=>console.log("YouTube Agent control server listening on "+port));
