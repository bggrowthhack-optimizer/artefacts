export const LEGACY_KEY='ruslan-magnit-shopping-2026-11-22-v1';
export const CACHE_KEY='ruslan-magnit-shopping-sync-v1';
export function splitText(text){
 const p=text.indexOf(' — ');if(p<0)return {name:text.trim(),quantity:'',note:''};
 const name=text.slice(0,p).trim(),rest=text.slice(p+3).replace(/\.$/,'');
 let cut=rest.search(/; |, (?:свеж|плотн|без |коричнев|чуть |красн|только |примерно |необяз|больш|в син|в брик)/);
 if(cut<0)cut=rest.length;
 let quantity=rest.slice(0,cut).trim(),note=rest.slice(cut).replace(/^[;,]\s*/, '').trim();
 if(/^(?:больш|нормаль|без |количество|нормальный)/.test(quantity)){note=[quantity,note].filter(Boolean).join('; ');quantity='';}
 return {name,quantity,note};
}
export function seedItems(groups){return groups.flatMap((g,section)=>g.items.map(i=>({id:i.id,...splitText(i.text),section,optional:!!i.optional,alternative:!!i.alternative,archived:false,checked:false,edited_at:0})));}
export function normalizeItem(i,sections){
 if(!i||typeof i.id!=='string'||!/^[-a-zA-Z0-9_]{1,100}$/.test(i.id)||typeof i.name!=='string'||!i.name.trim()||i.name.length>160||!Number.isInteger(i.section)||i.section<0||i.section>=sections)throw new Error('Проверь название и отдел товара.');
 if(typeof i.quantity!=='string'||i.quantity.length>100||typeof i.note!=='string'||i.note.length>600)throw new Error('Слишком длинное количество или примечание.');
 return {id:i.id,name:i.name.trim(),quantity:i.quantity.trim(),note:i.note.trim(),section:i.section,optional:!!i.optional,alternative:!!i.alternative,archived:!!i.archived,checked:!!i.checked};
}
export function legacyItems(state,groups){
 const items=seedItems(groups), ids=new Set(items.map(i=>i.id));
 if(Array.isArray(state.customItems))for(const c of state.customItems){if(!c||ids.has(c.id)||typeof c.text!=='string')continue;try{items.push(normalizeItem({id:c.id,...splitText(c.text),section:c.section,optional:!!c.optional,alternative:false,archived:false,checked:false},groups.length));ids.add(c.id);}catch{}}
 const archived=new Set(Array.isArray(state.archived)?state.archived:[]), checked=new Set(Array.isArray(state.checked)?state.checked:[]);
 return items.map(i=>({...i,archived:archived.has(i.id),checked:checked.has(i.id)&&!archived.has(i.id)}));
}
export function apply(items,op){
 const next=items.map(i=>({...i}));
 if(op.type==='import'){for(const incoming of op.items){const old=next.find(i=>i.id===incoming.id);if(!old)next.push({...incoming});else if(!old.edited_at)Object.assign(old,incoming);}return next;}
 const item=next.find(i=>i.id===op.itemId);
 if(op.type==='add'){if(!next.some(i=>i.id===op.item.id))next.push({...op.item});return next;}
 if(!item)return next;
 if(op.type==='check'&&!item.archived){item.checked=!!op.value;if(item.checked&&item.alternative)next.forEach(i=>{if(i.id!==item.id&&i.alternative)i.checked=false;});}
 if(op.type==='archive'){item.archived=true;item.checked=false;}
 if(op.type==='restore'){item.archived=false;item.checked=false;}
 return next;
}
export function counts(items){const list=items.filter(i=>!i.archived),req=list.filter(i=>!i.optional&&!i.alternative);return{total:req.length+(list.some(i=>i.alternative)?1:0),done:req.filter(i=>i.checked).length+(list.some(i=>i.alternative&&i.checked)?1:0)};}
export function toMarkdown(items,groups,revision,updatedAt){
 const esc=s=>String(s).replace(/[\r\n]+/g,' ').replace(/([\\`*_[\]<>])/g,'\\$1');
 let out='# Список покупок\n\nОбновлено: '+new Date(updatedAt||Date.now()).toISOString()+'\nВерсия: '+revision+'\n\n';
 for(const archived of [false,true]){out+='## '+(archived?'На будущее':'Купить сейчас')+'\n\n';let found=false;
 groups.forEach((g,n)=>{const rows=items.filter(i=>!!i.archived===archived&&i.section===n);if(!rows.length)return;found=true;out+='### '+g.name+'\n\n';for(const i of rows)out+='- ['+(i.checked&&!archived?'x':' ')+'] '+esc(i.name)+(i.quantity?' — '+esc(i.quantity):'')+(i.note?'; '+esc(i.note):'')+(i.optional?' (необязательно)':'')+(i.alternative?' (один вариант: рыба или креветки)':'')+'\n';out+='\n';});if(!found)out+='Пусто.\n\n';}
 return out;
}
