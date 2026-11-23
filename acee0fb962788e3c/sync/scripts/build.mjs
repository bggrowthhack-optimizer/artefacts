import fs from 'node:fs';
const read=p=>fs.readFileSync(p,'utf8');const core=read('src/core.mjs'),seed=read('src/seed.json');
const prefix=core.replace(/export /g,'')+'\nconst SEED='+seed+';\nconst CORE_PUBLIC='+JSON.stringify(core)+';\nconst HTML='+JSON.stringify(read('public/index.html'))+';\nconst STYLE='+JSON.stringify(read('public/style.css'))+';\nconst APP='+JSON.stringify(read('public/app.js').replace('__SEED_JSON__',seed))+';\n';
fs.rmSync('dist',{recursive:true,force:true});fs.mkdirSync('dist/server',{recursive:true});fs.mkdirSync('dist/.openai',{recursive:true});fs.writeFileSync('dist/server/index.js',prefix+read('src/server.mjs'));fs.copyFileSync('.openai/hosting.json','dist/.openai/hosting.json');

fs.mkdirSync('outputs/github',{recursive:true});
fs.writeFileSync('outputs/github/index.html',read('public/index.html'));
fs.writeFileSync('outputs/github/style.css',read('public/style.css'));
fs.writeFileSync('outputs/github/app.js',read('public/app.js').replace('__SEED_JSON__',seed));
fs.writeFileSync('outputs/github/core.js',core);
