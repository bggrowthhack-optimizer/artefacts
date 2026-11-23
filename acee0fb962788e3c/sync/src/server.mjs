// The build embeds CORE, SEED and the three static assets in this module.
const headers={'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'same-origin'};
function json(value,status=200){return new Response(JSON.stringify(value),{status,headers:{...headers,'Content-Type':'application/json; charset=utf-8'}});}
function authorized(request,env){return service(request,env)||!!(env.SHOP_LINK_KEY&&request.headers.get('X-Shopping-Key')===env.SHOP_LINK_KEY);}
function service(request,env){return !!env.SHOP_SERVICE_TOKEN&&request.headers.get('X-Shopping-Service')===env.SHOP_SERVICE_TOKEN;}
function itemStatement(db,item,guard){return db.prepare('INSERT INTO shopping_items (id,name,quantity,note,section,optional,alternative,archived,checked,edited_at) SELECT ?,?,?,?,?,?,?,?,?,? WHERE NOT EXISTS(SELECT 1 FROM shopping_operations WHERE id=?) ON CONFLICT(id) DO NOTHING').bind(item.id,item.name,item.quantity,item.note,item.section,+item.optional,+item.alternative,+item.archived,+item.checked,item.edited_at||0,guard);}
async function initialize(db){const found=await db.prepare('SELECT revision FROM shopping_meta WHERE id=1').first();if(found)return;const statements=seedItems(SEED).map(i=>itemStatement(db,i,'seed'));statements.push(db.prepare('INSERT OR IGNORE INTO shopping_meta (id,revision,updated_at) VALUES (1,0,?)').bind(Date.now()));await db.batch(statements);}
async function snapshot(db){const [rows,meta]=await db.batch([db.prepare('SELECT * FROM shopping_items ORDER BY section, CASE WHEN id LIKE \'item-%\' THEN 0 ELSE 1 END, CASE WHEN id LIKE \'item-%\' THEN CAST(SUBSTR(id,6) AS INTEGER) ELSE edited_at END, id'),db.prepare('SELECT revision,updated_at FROM shopping_meta WHERE id=1')]);return {items:rows.results.map(i=>({...i,optional:!!i.optional,alternative:!!i.alternative,archived:!!i.archived,checked:!!i.checked})),revision:meta.results[0].revision,updatedAt:meta.results[0].updated_at};}
async function markdown(db,state){const md=toMarkdown(state.items,SEED,state.revision,state.updatedAt);const chunks=md.match(/[\s\S]{1,800}/g)||[''];const statements=[db.prepare('DELETE FROM shopping_markdown WHERE (SELECT revision FROM shopping_meta WHERE id=1)=?').bind(state.revision)];chunks.forEach((chunk,i)=>statements.push(db.prepare('INSERT INTO shopping_markdown (id,revision,content) SELECT ?,?,? WHERE (SELECT revision FROM shopping_meta WHERE id=1)=? ON CONFLICT(id) DO UPDATE SET revision=excluded.revision,content=excluded.content WHERE excluded.revision>=shopping_markdown.revision').bind(i,state.revision,chunk,state.revision)));await db.batch(statements);return md;}
function validate(op){
 if(!op||typeof op.id!=='string'||!/^[-a-zA-Z0-9_]{1,100}$/.test(op.id))throw new Error('Некорректное действие.');
 if(op.type==='import'){if(!Array.isArray(op.items)||op.items.length>1000)throw new Error('Слишком большой список.');op.items=op.items.map(i=>normalizeItem(i,SEED.length));return op;}
 if(op.type==='add'){op.item=normalizeItem({...op.item,alternative:false,checked:false},SEED.length);return op;}
 if(!['archive','restore','check'].includes(op.type)||typeof op.itemId!=='string'||op.itemId.length>100)throw new Error('Неизвестное действие.');if(op.type==='check'&&typeof op.value!=='boolean')throw new Error('Некорректная отметка.');return op;
}
async function mutate(db,op){const now=Date.now(),q=[],guard=' AND NOT EXISTS(SELECT 1 FROM shopping_operations WHERE id=?)';
 if(op.type==='import')for(const item of op.items){q.push(itemStatement(db,{...item,edited_at:now},op.id));q.push(db.prepare('UPDATE shopping_items SET archived=?,checked=?,edited_at=? WHERE id=? AND edited_at=0'+guard).bind(+item.archived,+item.checked,now,item.id,op.id));}
 if(op.type==='add')q.push(itemStatement(db,{...op.item,edited_at:now},op.id));
 if(op.type==='check'){
  if(op.value)q.push(db.prepare('UPDATE shopping_items SET checked=0,edited_at=? WHERE alternative=1 AND id<>? AND EXISTS(SELECT 1 FROM shopping_items WHERE id=? AND alternative=1 AND archived=0)'+guard).bind(now,op.itemId,op.itemId,op.id));
  q.push(db.prepare('UPDATE shopping_items SET checked=?,edited_at=? WHERE id=? AND archived=0'+guard).bind(+op.value,now,op.itemId,op.id));
 }
 if(op.type==='archive'||op.type==='restore')q.push(db.prepare('UPDATE shopping_items SET archived=?,checked=0,edited_at=? WHERE id=?'+guard).bind(+(op.type==='archive'),now,op.itemId,op.id));
 q.push(db.prepare('UPDATE shopping_meta SET revision=revision+1,updated_at=? WHERE id=1'+guard).bind(now,op.id));q.push(db.prepare('INSERT OR IGNORE INTO shopping_operations (id,applied_at) VALUES (?,?)').bind(op.id,now));await db.batch(q);
}
export default {async fetch(request,env){try{const url=new URL(request.url),path=url.pathname;
 if(path==='/style.css')return new Response(STYLE,{headers:{'Content-Type':'text/css; charset=utf-8',...headers}});
 if(path==='/app.js')return new Response(APP,{headers:{'Content-Type':'text/javascript; charset=utf-8',...headers}});
 if(path==='/core.js')return new Response(CORE_PUBLIC,{headers:{'Content-Type':'text/javascript; charset=utf-8',...headers}});
 if(path==='/'||path==='/app/'||path==='/app')return new Response(HTML,{headers:{'Content-Type':'text/html; charset=utf-8',...headers,'Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; frame-ancestors 'self' https://chatgpt.com; base-uri 'self'; form-action 'self'"}});
 if(path!=='/api/state'&&path!=='/api/actions'&&path!=='/shopping-list.md')return new Response('Не найдено',{status:404,headers});
 if(!authorized(request,env))return json({error:'Для доступа к списку нужна секретная ссылка.'},401);
 if(!env.DB)return json({error:'Общее хранилище ещё подключается. Локальные изменения сохранены.'},503);
 await initialize(env.DB);
 if(path==='/api/actions'){
  if(request.method!=='POST')return json({error:'Метод не поддерживается.'},405);
  if(!service(request,env)&&request.headers.get('Origin')!==url.origin)return json({error:'Недопустимый источник запроса.'},403);
  const body=await request.text();if(body.length>500000)return json({error:'Слишком большой список.'},413);
  const payload=JSON.parse(body);if(!Array.isArray(payload.actions)||payload.actions.length>50)return json({error:'Слишком много действий.'},400);
  const actions=payload.actions.map(validate);for(const op of actions)await mutate(env.DB,op);
  const state=await snapshot(env.DB);await markdown(env.DB,state);return json({...state,acknowledged:actions.map(op=>op.id)});
 }
 if(request.method!=='GET')return json({error:'Метод не поддерживается.'},405);
 const state=await snapshot(env.DB);const md=await markdown(env.DB,state);
 if(path==='/shopping-list.md')return new Response(md,{headers:{...headers,'Content-Type':'text/markdown; charset=utf-8','Content-Disposition':'attachment; filename="shopping-list.md"'}});
 return json(state);
 }catch(error){return json({error:error instanceof SyntaxError?'Не удалось прочитать данные.':error.message||'Не удалось сохранить изменения.'},400);}}};
