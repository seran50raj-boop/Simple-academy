const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const port = process.env.PORT || 4178;
const types = {'.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8','.svg':'image/svg+xml','.css':'text/css; charset=utf-8','.mp4':'video/mp4','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp'};
http.createServer((request,response)=>{
  const parsed = decodeURIComponent((request.url||'/').split('?')[0]);
  const relative = parsed === '/' ? '/index.html' : parsed;
  const file = path.resolve(root,'.'+relative);
  if(!file.startsWith(root+path.sep)){response.writeHead(403);response.end('Forbidden');return;}
  fs.readFile(file,(error,bytes)=>{
    if(error){
      // The original landing's preserved artwork is a root-level legacy asset.
      if(/^\/assets\/v566-asset-[\w.-]+\.(png|jpg|webp)$/.test(relative)){
        const shared=path.resolve(root,'..','.'+relative);
        fs.readFile(shared,(sharedError,sharedBytes)=>{
          if(sharedError){response.writeHead(404);response.end('Not found');return;}
          response.writeHead(200,{'Content-Type':types[path.extname(shared)]||'application/octet-stream','Cache-Control':'no-store'});
          response.end(sharedBytes);
        });
        return;
      }
      response.writeHead(404);response.end('Not found');return;
    }
    response.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});
    response.end(bytes);
  });
}).listen(port,'127.0.0.1',()=>console.log('Rebuild preview http://127.0.0.1:'+port));
