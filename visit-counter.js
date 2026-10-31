 'use strict';
(() => {
 const output=document.getElementById('today-visits');
 let running=false;
 async function refresh() {
  if (running || document.hidden) return;
  running=true;
  try {
   const response=await fetch('/api/visits',{cache:'no-store',credentials:'omit'});
   if (!response.ok) throw new Error('unavailable');
   let data=await response.json();
   if (!/^\d{4}-\d{2}-\d{2}$/.test(data.day) || !Number.isSafeInteger(data.count) || data.count<0) throw new Error('invalid');
   let excluded=true,visitor;
   try {
    excluded=localStorage.getItem('mokita-analytics-excluded')==='1';
    if (!excluded) {
     const key='mokita-visit-'+data.day;
     visitor=localStorage.getItem(key);
     if (!visitor) {visitor=crypto.randomUUID();localStorage.setItem(key,visitor);}
     for (const k of Object.keys(localStorage)) if(k.startsWith('mokita-visit-') && k!==key) localStorage.removeItem(k);
    }
   } catch (_) {excluded=true;}
   if (!excluded && visitor) {
    const counted=await fetch('/api/visits',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({visitor}),cache:'no-store',credentials:'omit'});
    if (!counted.ok) throw new Error('unavailable');
    data=await counted.json();
   }
   if (!Number.isSafeInteger(data.count) || data.count<0) throw new Error('invalid');
   if(output) {output.textContent=new Intl.NumberFormat('fa-IR').format(data.count);output.dataset.day=data.day;}
  } catch (_) {if(output)output.textContent='موقتاً در دسترس نیست';}
  finally {running=false;}
 }
 refresh();setInterval(refresh,60000);
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)refresh();});
})();
