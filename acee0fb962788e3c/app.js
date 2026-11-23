import {CACHE_KEY,LEGACY_KEY,legacyItems,seedItems,apply,counts} from './core.js';
const groups=[
  {
    "name": "Овощи, фрукты и зелень",
    "items": [
      {
        "id": "item-0",
        "text": "Бананы — 6 шт., свежие, плотные, без пятен.",
        "optional": false,
        "alternative": false
      },
      {
        "id": "item-1",
        "text": "Яблоки нового урожая — 2 кг.",
        "optional": false,
        "alternative": false
      },
      {
        "id": "item-2",
        "text": "Груши Вильямс/Пакхамс — около 0,6 кг.",
        "optional": false,
        "alternative": false
      },
      {
        "id": "item-3",
        "text": "Мандарины — около 1 кг (на скриншоте 1,06 кг).",
        "optional": false,
        "alternative": false
      },
      {
        "id": "item-4",
        "text": "Авокадо «Хаас» — 2 шт., коричневые, чуть мягкие.",
        "optional": false,
        "alternative": false
      },
      {
        "id": "item-5",
        "text": "Огурцы — 2 кг, только плотные и пупырчатые.",
        "optional": false,
        "alternative": false
      },
      {
        "id": "item-6",
        "text": "Помидоры — 1 кг",
        "optional": false,
        "alternative": false
      },
      {
        "id": "item-7",
        "text": "Черри — 1 упаковка, только до 120 ₽.",
        "optional": false,
        "alternative": false
      },
      {
        "id": "item-8",
        "text": "Перец болгарский красный — 4 шт., свежий.",
        "optional": false,
        "alternative": false
      },
      {
        "id": "item-9",
        "text": "Кабачок — нормальный, без пятен; количество не указано.",
        "optional": false,
        "alternative": false
      },
      {
        "id": "item-10",
        "text": "Картошка — 2 кг.",
        "optional": false,
        "alternative": false
      },
      {
        "id": "item-11",
        "text": "Листовой салат — 1 упаковка или горшочек, свежий.",
        "optional": false,
        "alternative": false
      },
      {
        "id": "item-12",
        "text": "Укроп — количество не указано.",
        "optional": false,
        "alternative": false
      }
    ]
  },
  {
    "name": "Хлеб и хлебцы",
    "items": [
      {
        "id": "item-13",
        "text": "Лаваш севанский тонкий — 1 шт.",
        "optional": false,
        "alternative": false
      },
      {
        "id": "item-14",
        "text": "Хлебцы из бурого риса, квадратные — упаковка; число упаковок не указано.",
        "optional": false,
        "alternative": false
      },
      {
        "id": "item-15",
        "text": "Хлебцы «Круазетт» тонкие с прованскими травами, 200 г — 1 уп.",
        "optional": false,
        "alternative": false
      },
      {
        "id": "item-16",
        "text": "Хлебцы «Здоровый Хлеб» протеиновые чечевичные с белыми грибами, 400 г — 1 уп.",
        "optional": false,
        "alternative": false
      }
    ]
  },
  {
    "name": "Молочные продукты и сыры",
    "items": [
      {
        "id": "item-17",
        "text": "Молоко «Очень важная корова» 3,2% — 1 шт., красная упаковка.",
        "optional": false,
        "alternative": false
      },
      {
        "id": "item-18",
        "text": "Сметана «Важная корова» 15% — 2 шт., красная упаковка.",
        "optional": false,
        "alternative": false
      },
      {
        "id": "item-19",
        "text": "Йогурт «Актибио» — 4 шт.",
        "optional": false,
        "alternative": false
      },
      {
        "id": "item-20",
        "text": "Творог 9% — большой, в синей упаковке, в брикетах; количество не указано.",
        "optional": false,
        "alternative": false
      },
      {
        "id": "item-21",
        "text": "Творог «Савушкин» рассыпчатый 5%, 700 г — 1 шт.",
        "optional": false,
        "alternative": false
      },
      {
        "id": "item-22",
        "text": "Творог мягкий «Простоквашино» 5%, 120 г — 2 шт.",
        "optional": false,
        "alternative": false
      },
      {
        "id": "item-23",
        "text": "Сыр лёгкий — 1 треугольник",
        "optional": false,
        "alternative": false
      },
      {
        "id": "item-24",
        "text": "Рикотта «Ондрмандер» — 1 шт.",
        "optional": false,
        "alternative": false
      },
      {
        "id": "item-25",
        "text": "Сыр «Беловежские сыры» «Белая фета» 40%, 250 г — 1 шт.",
        "optional": false,
        "alternative": false
      }
    ]
  },
  {
    "name": "Рыба и замороженные морепродукты",
    "items": [
      {
        "id": "item-26",
        "text": "Рыба солёная — 200 г, плотный кусок, до 400 ₽",
        "optional": false,
        "alternative": true
      },
      {
        "id": "item-27",
        "text": "Либо креветки чищенные, с неочищенными хвостами — примерно до 600 ₽",
        "optional": false,
        "alternative": true
      }
    ]
  },
  {
    "name": "Кофе, сладости и полезные перекусы",
    "items": [
      {
        "id": "item-28",
        "text": "Кофе молотый Egoiste Espresso, 250 г — 1 шт.",
        "optional": false,
        "alternative": false
      },
      {
        "id": "item-29",
        "text": "Пастила белёвская без сахара «Зожно Несложно», 100 г — 4 шт.",
        "optional": false,
        "alternative": false
      },
      {
        "id": "item-30",
        "text": "Протеиновое пирожное Fitnesshock «Брауни горячий шоколад», 50 г — 1 шт.",
        "optional": false,
        "alternative": false
      }
    ]
  },
  {
    "name": "Вода и растительные напитки",
    "items": [
      {
        "id": "item-31",
        "text": "Минеральная вода «Нарзан», 1,5 л — 5 шт.",
        "optional": false,
        "alternative": false
      },
      {
        "id": "item-32",
        "text": "Детская вода — 3 шт.",
        "optional": false,
        "alternative": false
      },
      {
        "id": "item-33",
        "text": "Овсяный напиток Nemoloko классический 3,2%, 1 л — 1 шт., необязательно.",
        "optional": true,
        "alternative": false
      }
    ]
  }
];
const API_ORIGIN='https://ruslan-shopping-magnit-nov22.arctichotel8.chatgpt.site';
const ACCESS_KEY='ruslan-shopping-access-v1';
const fragment=new URLSearchParams(location.hash.slice(1));
let accessKey=fragment.get('key')||'',keySaved=false;
try{if(!accessKey)accessKey=localStorage.getItem(ACCESS_KEY)||'';if(accessKey){localStorage.setItem(ACCESS_KEY,accessKey);keySaved=true;}}catch{}
const accessHeaders=()=>accessKey?{'X-Shopping-Key':accessKey}:{};
const $=id=>document.getElementById(id),uid=()=>crypto.randomUUID(),opened={current:new Set(),archive:new Set()};
let cache={items:seedItems(groups),queue:[],revision:0,updatedAt:0,mode:'all'},view='current',lastSection=0,busy=false,wantSync=false,auth=false,saveError=false,toastTimer;
try{const stored=JSON.parse(localStorage.getItem(CACHE_KEY));if(stored&&Array.isArray(stored.items)&&Array.isArray(stored.queue))cache={...cache,...stored};}catch{}
function persist(){try{localStorage.setItem(CACHE_KEY,JSON.stringify(cache));saveError=false;}catch{saveError=true;}status();}
function currentItems(){return cache.queue.reduce((items,op)=>apply(items,op),cache.items);}
function status(text){$('sync-status').textContent=saveError?'Не сохранено на устройстве':text||(cache.queue.length?(auth?'Сохраняю…':'Есть несохранённые изменения'):(auth?'Сохранено':'Открой секретную ссылку'));}
function notify(text){clearTimeout(toastTimer);$('toast').textContent=text;$('toast').hidden=false;toastTimer=setTimeout(()=>$('toast').hidden=true,3200);}
function enqueue(op){cache.queue.push({id:uid(),...op});persist();render();sync();}
function capture(){document.querySelectorAll('details.department').forEach(el=>{const n=Number(el.dataset.section);if(el.open)opened[view].add(n);else opened[view].delete(n);});}
function render(){capture();const items=currentItems(),visible=items.filter(i=>i.archived===(view==='archive')),c=counts(items);
 $('remaining').textContent= c.total?'Осталось '+(c.total-c.done):'Список пуст';$('hide-bought').checked=cache.mode==='left';$('list-bar').hidden=view==='archive';$('complete').hidden=view!=='current'||!c.total||c.done!==c.total;
 $('current-tab').setAttribute('aria-selected',view==='current');$('archive-tab').setAttribute('aria-selected',view==='archive');$('current-tab').tabIndex=view==='current'?0:-1;$('archive-tab').tabIndex=view==='archive'?0:-1;$('panel').setAttribute('aria-labelledby',view+'-tab');
 const aCount=items.filter(i=>i.archived).length;$('archive-tab').textContent='На будущее'+(aCount?' · '+aCount:'');$('list').replaceChildren();
 $('empty').hidden=!!visible.length;$('empty').textContent=view==='archive'?'Здесь пока пусто. Переноси сюда товары, которые сейчас не нужны.':'Добавь товар или верни его из раздела «На будущее».';
 groups.forEach((g,n)=>{const rows=visible.filter(i=>i.section===n);if(!rows.length)return;const d=document.createElement('details');d.className='department';d.dataset.section=n;d.id='department-'+n;d.open=opened[view].has(n);const boundView=view;d.addEventListener('toggle',()=>{if(!d.isConnected)return;if(d.open){opened[boundView].add(n);lastSection=n;}else opened[boundView].delete(n);});const summary=document.createElement('summary'),title=document.createElement('strong'),amount=document.createElement('span');title.textContent=g.name;amount.className='section-count';const sec=counts(rows);amount.textContent=view==='archive'?rows.length:(sec.total?sec.done+' / '+sec.total:'По желанию');summary.append(title,amount);d.append(summary);
 if(view==='current'&&rows.some(i=>i.alternative)){const p=document.createElement('div');p.className='note-section';p.textContent='Рыба или креветки — один вариант.';d.append(p);}
 let shown=0;for(const item of rows){const other=item.alternative&&items.some(i=>!i.archived&&i.alternative&&i.checked);if(view==='current'&&cache.mode==='left'&&(item.checked||other))continue;shown++;const row=document.createElement('div');row.className='row'+(item.checked&&view==='current'?' done':'');row.dataset.id=item.id;
 const label=document.createElement(view==='current'?'label':'div');label.className=view==='current'?'check':'archive-label';if(view==='current'){const check=document.createElement('input');check.type='checkbox';check.checked=item.checked;check.setAttribute('aria-label',item.name+(item.quantity?', '+item.quantity:''));check.onchange=()=>{lastSection=n;enqueue({type:'check',itemId:item.id,value:check.checked});const next=document.querySelector('[data-id="'+item.id+'"] input');if(next)next.focus({preventScroll:true});else $('department-'+n)?.querySelector('summary').focus({preventScroll:true});};label.append(check);}
 const product=document.createElement('span');product.className='product';const name=document.createElement('span');name.className='product-name';name.textContent=item.name;product.append(name);if(item.quantity){const quantity=document.createElement('span');quantity.className='quantity';quantity.textContent=item.quantity;product.append(quantity);}if(item.note){const note=document.createElement('span');note.className='note';note.textContent=item.note;product.append(note);}if(item.optional){const optional=document.createElement('span');optional.className='optional';optional.textContent='По желанию';product.append(optional);}label.append(product);row.append(label);
 const action=document.createElement('button');if(view==='archive'){action.className='return';action.textContent='Вернуть';action.setAttribute('aria-label','Вернуть в покупки: '+item.name);action.onclick=()=>{enqueue({type:'restore',itemId:item.id});notify('Возвращено в покупки');};}else{action.className='icon';action.innerHTML='<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="3" y="3" width="18" height="4" rx="1"/><path d="M5 7v13h14V7M9 11h6"/></svg>';action.setAttribute('aria-label','На будущее: '+item.name);action.title='На будущее';action.onclick=()=>{enqueue({type:'archive',itemId:item.id});notify('Перенесено на будущее');};}row.append(action);d.append(row);}
 if(!shown){const p=document.createElement('div');p.className='section-empty';p.textContent='В этом отделе всё взято.';d.append(p);}$('list').append(d);});status();}
async function sync(){if(!accessKey){auth=false;$('login').hidden=false;$('login-text').textContent='Открой секретную ссылку, которую тебе передали. Аккаунт не нужен.';status();return;}if(busy){wantSync=true;return;}busy=true;status('Сохраняю…');try{
 let response=await fetch(API_ORIGIN+'/api/state',{cache:'no-store',credentials:'omit',headers:accessHeaders()});if(response.status===401||response.status===403){const error=await response.json();auth=false;$('login').hidden=false;$('login-text').textContent=error.error;status();return;}if(!response.ok)throw Error('Сервер временно недоступен. Изменения сохранены на устройстве.');
 auth=true;$('login').hidden=true;let state=await response.json();cache.items=state.items;cache.revision=state.revision;cache.updatedAt=state.updatedAt;
 if(cache.queue.length){const actions=cache.queue.slice(0,50);response=await fetch(API_ORIGIN+'/api/actions',{method:'POST',credentials:'omit',headers:{'Content-Type':'application/json',...accessHeaders()},body:JSON.stringify({actions})});if(!response.ok)throw Error((await response.json()).error||'Не удалось сохранить изменения.');state=await response.json();const ack=new Set(state.acknowledged);cache.queue=cache.queue.filter(op=>!ack.has(op.id));cache.items=state.items;cache.revision=state.revision;cache.updatedAt=state.updatedAt;}
 persist();render();if(cache.queue.length)wantSync=true;
 }catch(error){$('login').hidden=false;$('login-text').textContent=error.message;status('Нет связи · сохранено здесь');}finally{busy=false;if(wantSync&&auth){wantSync=false;setTimeout(sync,100);}else wantSync=false;}}
function switchView(next){if(view===next)return;capture();view=next;$('list').replaceChildren();render();window.scrollTo({top:0});}
$('current-tab').onclick=()=>switchView('current');$('archive-tab').onclick=()=>switchView('archive');document.querySelector('.tabs').onkeydown=e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();const next=e.key==='Home'?'current':e.key==='End'?'archive':view==='current'?'archive':'current';switchView(next);$(next+'-tab').focus();}};
$('hide-bought').onchange=()=>{cache.mode=$('hide-bought').checked?'left':'all';persist();render();};
groups.forEach((g,n)=>{const o=document.createElement('option');o.value=n;o.textContent=g.name;$('item-section').append(o);});
$('add').onclick=()=>{$('edit-form').reset();$('item-section').value=lastSection;$('form-error').hidden=true;$('edit-dialog').showModal();$('item-name').focus();};$('close-edit').onclick=()=>$('edit-dialog').close();$('close-settings').onclick=()=>$('settings-dialog').close();
$('edit-form').onsubmit=e=>{e.preventDefault();const name=$('item-name').value.trim();if(!name){$('form-error').textContent='Введи название товара.';$('form-error').hidden=false;return;}const section=Number($('item-section').value),item={id:'custom-'+uid(),name,quantity:$('item-quantity').value.trim(),note:$('item-note').value.trim(),section,optional:$('item-optional').checked,alternative:false,archived:view==='archive',checked:false};$('edit-dialog').close();lastSection=section;enqueue({type:'add',item});const department=$('department-'+section);if(department){department.open=true;opened[view].add(section);department.scrollIntoView({block:'start'});}notify(view==='archive'?'Добавлено на будущее':'Товар добавлен');};
$('app-menu').onclick=()=>$('settings-dialog').showModal();$('retry-sync').onclick=sync;
$('reset-checks').onclick=()=>{const items=currentItems().filter(i=>i.checked&&!i.archived);if(!items.length){notify('Все отметки уже сняты');return;}if(!confirm('Снять отметки с текущих покупок? Архив сохранится.'))return;items.forEach(i=>cache.queue.push({id:uid(),type:'check',itemId:i.id,value:false}));persist();$('settings-dialog').close();render();sync();};
$('share-link').onclick=async()=>{if(!accessKey){notify('Сначала открой секретную ссылку');return;}const url='https://bggrowthhack-optimizer.github.io/artefacts/acee0fb962788e3c/#key='+encodeURIComponent(accessKey);try{await navigator.clipboard.writeText(url);notify('Ссылка скопирована');}catch{$('share-url').value=url;$('settings-dialog').close();$('share-dialog').showModal();$('share-url').select();}};
$('close-share').onclick=()=>$('share-dialog').close();

async function migration(){let legacy=null,migrationId=null;const migrationText=fragment.get('migrate');if(migrationText){try{const incoming=JSON.parse(migrationText);legacy=incoming.state;migrationId=incoming.id;}catch{notify('Не удалось прочитать прежний список. Он сохранён на старой странице.');}}
 if(!legacy){try{if(!localStorage.getItem(CACHE_KEY)){const raw=localStorage.getItem(LEGACY_KEY);if(raw){legacy=JSON.parse(raw);migrationId='import-'+uid();}}}catch{}}
 if(legacy&&typeof legacy==='object'&&typeof migrationId==='string'){if(!cache.queue.some(op=>op.id===migrationId))cache.queue.unshift({id:migrationId,type:'import',items:legacyItems(legacy,groups)});cache.mode=legacy.mode==='left'?'left':cache.mode;persist();if(!saveError&&(!accessKey||keySaved))history.replaceState(null,'',location.pathname);}
 if(!migrationText&&fragment.has('key')&&keySaved)history.replaceState(null,'',location.pathname);
 render();sync();}
if(typeof ResizeObserver!=='undefined')new ResizeObserver(()=>document.documentElement.style.setProperty('--head',(Math.ceil(document.querySelector('header').getBoundingClientRect().height))+'px')).observe(document.querySelector('header'));
window.addEventListener('online',sync);window.addEventListener('focus',sync);document.addEventListener('visibilitychange',()=>{if(!document.hidden)sync();});setInterval(()=>{if(!document.hidden)sync();},20000);migration();
