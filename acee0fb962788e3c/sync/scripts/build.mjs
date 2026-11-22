import fs from 'node:fs';
const read=p=>fs.readFileSync(p,'utf8');const core=read('src/core.mjs'),seed=read('src/seed.json');
const prefix=core.replace(/export /g,'')+'\nconst SEED='+seed+';\nconst CORE_PUBLIC='+JSON.stringify(core)+';\nconst HTML='+JSON.stringify(read('public/index.html'))+';\nconst STYLE='+JSON.stringify(read('public/style.css'))+';\nconst APP='+JSON.stringify(read('public/app.js').replace('__SEED_JSON__',seed))+';\n';
fs.rmSync('dist',{recursive:true,force:true});fs.mkdirSync('dist/server',{recursive:true});fs.mkdirSync('dist/.openai',{recursive:true});fs.writeFileSync('dist/server/index.js',prefix+read('src/server.mjs'));fs.copyFileSync('.openai/hosting.json','dist/.openai/hosting.json');
