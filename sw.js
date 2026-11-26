self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  if(e.request.mode!=='navigate')return;
  e.respondWith(fetch(e.request).catch(()=>new Response('<meta charset=utf-8><body style="font-family:system-ui;text-align:center;padding:40px" dir=rtl>ما فيه اتصال بالإنترنت. تأكد من الاتصال وحاول مرة ثانية.</body>',{headers:{'Content-Type':'text/html; charset=utf-8'}})));
});
self.addEventListener('push',e=>{let d={};try{d=e.data.json()}catch(x){d={title:'الموارد البشرية',body:e.data?e.data.text():''}}
  e.waitUntil(self.registration.showNotification(d.title||'الموارد البشرية',{body:d.body||'',tag:d.tag||undefined,renotify:!!d.tag,dir:'rtl',lang:'ar',vibrate:[200,100,200],requireInteraction:/^pres-/.test(d.tag||'')}))});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(cs=>{for(const c of cs){if('focus' in c){c.navigate&&c.navigate(c.url);return c.focus()}}return self.clients.openWindow('./')}))});
