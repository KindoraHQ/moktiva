'use strict';
const apps = {
  hiddify: {name:'Hiddify',icon:'H',color:'',url:'https://github.com/hiddify/hiddify-app/releases',description:'یک برنامه برای چند دستگاه؛ با امکان واردکردن لینک اشتراک و پروفایل اتصال.',platforms:['android','ios','windows']},
  v2rayng: {name:'v2rayNG',icon:'V',color:'purple',url:'https://github.com/2dust/v2rayNG/releases',description:'برنامهٔ اتصال اندروید؛ برای واردکردن کانفیگ از لینک، کلیپ‌بورد یا کد QR.',platforms:['android']},
  streisand: {name:'Streisand',icon:'S',color:'purple',url:'https://apps.apple.com/app/streisand/id6450534064',description:'برنامهٔ آیفون و آیپد؛ برای افزودن پروفایل شخصی و اتصال با تنظیمات سازگار.',platforms:['ios']},
  v2box: {name:'V2Box',icon:'V',color:'blue',url:'https://apps.apple.com/app/v2box-v2ray-client/id6446814690',description:'کلاینت آیفون با پشتیبانی از پروفایل‌های سازگار VLESS و REALITY.',platforms:['ios']},
  v2rayn: {name:'v2rayN',icon:'N',color:'blue',url:'https://github.com/2dust/v2rayN/releases',description:'برنامهٔ دسکتاپ برای ویندوز؛ دریافت، انتخاب و مدیریت پروفایل‌های اتصال.',platforms:['windows']}
};
const platformNames={android:'اندروید',ios:'آیفون و آیپد',windows:'ویندوز'};
const hiddifyIOS='https://apps.apple.com/app/hiddify-proxy-vpn/id6596777532';
let currentPlatform='android';
const appGrid=document.getElementById('app-grid');
function renderApps(platform){
 currentPlatform=platform;
 appGrid.replaceChildren();
 for(const [id,app] of Object.entries(apps)){
  if(!app.platforms.includes(platform))continue;
  const article=document.createElement('article');article.className='app-card';
  article.innerHTML=`<div class="app-top"><span class="app-icon ${app.color}" aria-hidden="true">${app.icon}</span><div><h3 dir="ltr">${app.name}</h3><small>${platformNames[platform]} · منبع رسمی</small></div></div><p>${app.description}</p><div class="app-actions"><a target="_blank" rel="noopener noreferrer">دریافت برنامه ↗</a><button class="text-link" type="button">آموزش اتصال ←</button></div>`;
  const link=article.querySelector('a');link.href=id==='hiddify'&&platform==='ios'?hiddifyIOS:app.url;link.setAttribute('aria-label',`دریافت ${app.name} برای ${platformNames[platform]}؛ در پنجرهٔ جدید`);
  article.querySelector('button').addEventListener('click',()=>showGuide(id,platform));
  appGrid.append(article);
 }
 document.querySelectorAll('[data-platform]').forEach(button=>{const selected=button.dataset.platform===platform;button.classList.toggle('selected',selected);button.setAttribute('aria-pressed',String(selected));});
}
document.querySelectorAll('[data-platform]').forEach(button=>button.addEventListener('click',()=>renderApps(button.dataset.platform)));
const dialog=document.getElementById('info-dialog');
const title=document.getElementById('dialog-title');
const content=document.getElementById('dialog-content');
function showDialog(heading,body){title.textContent=heading;content.innerHTML=body;dialog.showModal();}
const list=steps=>'<ol>'+steps.map(s=>`<li>${s}</li>`).join('')+'</ol>';
function showGuide(id,platform){
 const app=apps[id];let steps=[];
 const common=['لینک اشتراک یا کانفیگ شخصی خود را از ارائه‌دهنده دریافت و کپی کنید. لینک اشتراک معمولاً با https و کانفیگ VLESS با vless شروع می‌شود.'];
 if(id==='hiddify')steps=['نسخهٔ مناسب '+platformNames[platform]+' را از لینک رسمی کارت برنامه نصب و باز کنید.',...common,'در برنامه روی افزودن پروفایل (+) بزنید و گزینهٔ ورود از کلیپ‌بورد را انتخاب کنید. برای QR از گزینهٔ اسکن، در صورت وجود، استفاده کنید.','اگر لینک اشتراک دارید، پروفایل را به‌روزرسانی کنید؛ سپس پروفایل دریافت‌شده و دکمهٔ اتصال را انتخاب کنید.',platform==='windows'?'اگر اتصال برقرار است ولی مرورگر تغییر مسیر نمی‌دهد، حالت پراکسی سیستم را در برنامه بررسی کنید. حالت TUN بسته به تنظیمات ممکن است دسترسی مدیر بخواهد.':'درخواست سیستم‌عامل برای ایجاد VPN را تأیید کنید. پس از اتصال، بازشدن یک صفحه را امتحان کنید.'];
 if(id==='v2rayng')steps=['v2rayNG را از صفحهٔ Releases سازنده دریافت کنید. در Assets، نسخهٔ متناسب با معماری گوشی یا universal را انتخاب کنید.',...common,'برای یک کانفیگ، دکمهٔ + و گزینهٔ Import config from Clipboard را انتخاب کنید؛ برای QR، گزینهٔ اسکن را بزنید.','برای لینک اشتراک، وارد Subscription group setting شوید، با + لینک را اضافه و ذخیره کنید؛ سپس Update subscription را اجرا کنید.','یک پروفایل را انتخاب کنید، دکمهٔ اتصال پایین صفحه را بزنید و درخواست VPN اندروید را تأیید کنید.'];
 if(id==='streisand')steps=['Streisand را از App Store نصب و باز کنید.',...common,'با دکمهٔ +، گزینهٔ ورود از کلیپ‌بورد (Import from clipboard) را انتخاب کنید. اگر کد QR دارید، از گزینهٔ اسکن استفاده کنید.','اگر پروفایل به‌صورت اشتراک اضافه شده است، آن را به‌روزرسانی و یکی از سرورها را انتخاب کنید.','دکمهٔ اتصال را بزنید. اجازهٔ افزودن تنظیمات VPN را در آیفون تأیید کنید و در صورت درخواست، رمز خود گوشی را وارد کنید.'];
 if(id==='v2box')steps=['V2Box - V2ray Client را از لینک App Store همین کارت نصب کنید.',...common,'به بخش Configs بروید؛ روی + بزنید و Import V2Ray URI from Clipboard را برای کانفیگ انتخاب کنید. برای اشتراک، گزینهٔ افزودن Subscription را انتخاب و لینک را ذخیره کنید.','برای QR از گزینهٔ اسکن در بخش افزودن استفاده کنید. در اشتراک، فهرست را به‌روزرسانی و یک پروفایل را انتخاب کنید.','به صفحهٔ اتصال برگردید و کنترل اتصال را فعال کنید. اجازهٔ افزودن VPN به آیفون را تأیید کنید.'];
 if(id==='v2rayn')steps=['از Releases رسمی، نسخهٔ سازگار با ویندوز و معماری رایانه (x64 یا ARM64) را انتخاب کنید. پیش‌نیازهای همان نسخه را در توضیحات سازنده بخوانید و بسته را کامل استخراج کنید.',...common,'برای کانفیگ، در پنجرهٔ برنامه از ورود از کلیپ‌بورد (معمولاً Ctrl+V) استفاده کنید. برای اشتراک، از Subscription group settings گروهی با لینک خود بسازید و آن را به‌روزرسانی کنید.','در صورت داشتن QR، گزینهٔ اسکن کد روی صفحه را از منوی افزودن/سرورها، در نسخه‌هایی که پشتیبانی می‌کنند، انتخاب کنید.','یک سرور را فعال کنید و System proxy را روی حالت تنظیم پراکسی سیستم قرار دهید. برای مسیریابی دیگر برنامه‌ها، حالت TUN بسته به نسخه ممکن است دسترسی مدیر بخواهد.'];
 showDialog(`آموزش ${app.name} برای ${platformNames[platform]}`,list(steps)+'<p class="note">نام و جای گزینه‌ها ممکن است در نسخه‌های مختلف کمی فرق کند. تنظیمات SNI، REALITY، کلیدها و امنیت TLS را خودسرانه تغییر ندهید. نصب برنامه به‌تنهایی اشتراک VPN ایجاد نمی‌کند.</p>');
}
const information={
 about:['دربارهٔ موکیتا','<p>Mokita VPN فضایی برای معرفی خدمات VPN، دریافت برنامه‌های اتصال و آموزش فارسی است. خدمات ربات موسیقی و مدیریت گروه تلگرام نیز در همین سایت معرفی می‌شوند.</p><p>برای شرایط خرید و راه‌اندازی، با <a href="https://t.me/nedarezae1370" target="_blank" rel="noopener noreferrer">خانم ندا در تلگرام؛ <bdi>@nedarezae1370</bdi></a> در ارتباط باشید.</p>'],
 music:['ربات موسیقی Mansour Music','<p>پخش آهنگ در گفت‌وگوی صوتی گروه، مدیریت صف آهنگ‌ها و کنترل پخش با فرمان‌های ربات، برای اعضای مجاز گروه.</p><p>برای راه‌اندازی، حساب دستیار باید عضو گروه و مجاز به صحبت باشد. دسترسی کاربران و امکانات سرویس را پیش از خرید هماهنگ کنید.</p><p>جهت تهیهٔ خدمات ربات، با <a href="https://t.me/nedarezae1370" target="_blank" rel="noopener noreferrer">خانم ندا در تلگرام؛ <bdi>@nedarezae1370</bdi></a> تماس بگیرید.</p>'],
 management:['ابزارهای مدیریت گروه','<p>راهنمای گروه و فرمان‌های مدیریتی برای کمک به اعضا و مدیران؛ دسترسی به فرمان‌ها تابع نقش فرد در گروه است.</p><p>برای بررسی امکانات موردنیاز، قیمت و شرایط راه‌اندازی با <a href="https://t.me/nedarezae1370" target="_blank" rel="noopener noreferrer">خانم ندا در تلگرام؛ <bdi>@nedarezae1370</bdi></a> هماهنگ کنید. این وب‌سایت به پنل مدیریت یا گروه‌های شما متصل نیست.</p>'],
 terms:['شرایط استفاده از سایت','<p>این سایت خدمات را معرفی می‌کند و راهنمای اتصال ارائه می‌دهد. خرید با هماهنگی مستقیم در تلگرام انجام می‌شود؛ سایت حساب کاربری یا درگاه پرداخت ندارد.</p><p>پیش از پرداخت، قیمت، مدت، محدودیت‌ها، زمان تحویل و شرایط بازپرداخت را دریافت و تأیید کنید. سازگاری برنامه و عملکرد اتصال به دستگاه، شبکه و تنظیمات سرویس بستگی دارد.</p>'],
 privacy:['حریم خصوصی این وب‌سایت','<p>این نسخه فرم دریافت اطلاعات، حساب کاربری، ابزار تحلیل بازدید یا کوکی افزوده‌شده توسط سایت ندارد. اطلاعات اتصال یا یادداشت شخصی شما در سایت دریافت یا ذخیره نمی‌شود. فونت و فایل‌های رابط از همین سایت بارگذاری می‌شوند.</p><p>میزبانی روی Netlify انجام می‌شود؛ این سرویس ممکن است برای ارائه و حفاظت از وب‌سایت، اطلاعات فنی درخواست مانند IP را طبق سیاست خود پردازش کند. این توضیح فقط دربارهٔ وب‌سایت است و جایگزین سیاست حریم خصوصی سرویس VPN نیست.</p><p>با بازکردن لینک دانلود به GitHub یا App Store می‌روید و سیاست آن سرویس اعمال می‌شود. برای پرسش‌های مربوط به سایت با خانم ندا در تلگرام در ارتباط باشید. با بازکردن لینک تماس، سیاست حریم خصوصی تلگرام نیز اعمال می‌شود.</p><p><a href="https://www.netlify.com/privacy/" target="_blank" rel="noopener noreferrer">سیاست حریم خصوصی Netlify ↗</a></p>'],
 purchase:['خرید و بازپرداخت','<p>برای خرید VPN یا خدمات ربات موسیقی و مدیریت گروه با <a href="https://t.me/nedarezae1370" target="_blank" rel="noopener noreferrer">خانم ندا در تلگرام؛ <bdi>@nedarezae1370</bdi></a> تماس بگیرید. قیمت و شرایط هر سفارش پیش از پرداخت اعلام می‌شود.</p><p>پرداخت ETH، USDT و USDC روی Ethereum و TRX روی TRON با آدرس‌های بخش خرید امکان هماهنگی دارد. برای BTC و سایر شبکه‌ها، آدرس نهایی را از خانم ندا دریافت کنید. سایت مبلغ را محاسبه و پرداخت را خودکار تأیید نمی‌کند.</p><p>شرایط لغو و بازپرداخت باید قبل از انتقال، در گفت‌وگوی خرید مشخص شود؛ سایت وعدهٔ بازپرداخت عمومی و یکسانی برای همهٔ سفارش‌ها اعلام نمی‌کند.</p>']
};
document.querySelectorAll('[data-info]').forEach(button=>button.addEventListener('click',()=>showDialog(...information[button.dataset.info])));
document.getElementById('close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}});
const menu=document.querySelector('.menu-toggle');const navigation=document.getElementById('navigation');
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'بستن منو':'باز کردن منو');navigation.classList.toggle('open',open);});
navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{navigation.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','باز کردن منو');}));
document.getElementById('year').textContent=new Intl.DateTimeFormat('fa-IR-u-ca-gregory',{year:'numeric'}).format(new Date());
renderApps(currentPlatform);

document.querySelectorAll('[data-copy-address]').forEach(button=>button.addEventListener('click',async()=>{
 const address=document.getElementById(button.dataset.copyAddress).textContent.trim();
 const status=document.getElementById('copy-status');
 try{await navigator.clipboard.writeText(address);status.textContent='آدرس کپی شد؛ پیش از انتقال، شبکه و آدرس کامل را با اطلاعات سفارش تطبیق دهید.';}
 catch{status.textContent='کپی خودکار در این مرورگر در دسترس نیست؛ آدرس نمایش‌داده‌شده را انتخاب و کپی کنید.';}
}));
