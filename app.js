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
 about:['دربارهٔ موکیتا','<p>Mokita VPN فضایی برای معرفی خدمات، پیدا کردن برنامهٔ اتصال و یادگیری راه‌اندازی به زبان فارسی است. در این سایت می‌توانید با خدمات موسیقی، دستیار آوا و مدیریت گروه تلگرام هم آشنا شوید.</p><p>جزئیات فروش و راه‌های تماس پس از تأیید منتشر می‌شوند.</p>'],
 music:['موسیقی و دستیار آوا','<p>نام ربات موسیقی Mansour Music است. در گروهی که ربات و دستیار آن فعال باشند، اعضای مجاز می‌توانند با فرمان‌های موسیقی درخواست پخش بدهند.</p><p>برای صحبت با آوا، او را مستقیم صدا بزنید؛ مثلاً «آوا جان سلام» یا «آوا یه معما بگو». آوا یک شخصیت هوش مصنوعی است و ممکن است اشتباه کند. پاسخ‌گویی به بودجه و محدودیت‌های ربات وابسته است؛ خبر زنده یا پاسخ صوتی در این معرفی وعده داده نمی‌شود.</p><p class="note">لینک رسمی ربات و شرایط دسترسی هنوز در سایت منتشر نشده است. این صفحه دسترسی جدیدی به ربات یا گروه ایجاد نمی‌کند.</p>'],
 management:['ابزارهای مدیریت گروه','<p>راهنمای گروه و فرمان‌های مدیریتی در ربات موجود برای کمک به اعضا و مدیران استفاده می‌شوند. دسترسی به فرمان‌ها تابع نقش فرد در گروه است.</p><p>جزئیات سرویس قابل ارائه، نحوهٔ افزودن ربات و لینک رسمی پس از تأیید مشخص خواهند شد. این سایت در حال حاضر به هیچ پنل یا گروه تلگرامی متصل نیست.</p>'],
 terms:['شرایط استفاده از سایت','<p>این نسخه، سایت معرفی و راهنمای استفاده از ابزارهاست. فعلاً امکان سفارش، پرداخت یا ساخت حساب کاربری در سایت وجود ندارد.</p><p>برنامه‌های معرفی‌شده توسط سازندگان مستقل عرضه می‌شوند و شرایط خودشان را دارند. سازگاری و عملکرد اتصال به دستگاه، شبکه، نسخهٔ برنامه و تنظیمات اشتراک بستگی دارد.</p><p>شرایط نهایی فروش سرویس پس از تأیید مالک، پیش از فعال‌شدن خرید منتشر خواهد شد.</p>'],
 privacy:['حریم خصوصی این وب‌سایت','<p>این نسخه فرم دریافت اطلاعات، حساب کاربری، ابزار تحلیل بازدید یا کوکی افزوده‌شده توسط سایت ندارد. اطلاعات اتصال یا یادداشت شخصی شما در سایت دریافت یا ذخیره نمی‌شود. فونت و فایل‌های رابط از همین سایت بارگذاری می‌شوند.</p><p>میزبانی روی Netlify انجام می‌شود؛ این سرویس ممکن است برای ارائه و حفاظت از وب‌سایت، اطلاعات فنی درخواست مانند IP را طبق سیاست خود پردازش کند. این توضیح فقط دربارهٔ وب‌سایت است و جایگزین سیاست حریم خصوصی سرویس VPN نیست.</p><p>با بازکردن لینک دانلود به GitHub یا App Store می‌روید و سیاست آن سرویس اعمال می‌شود. راه ارتباط رسمی برای پرسش‌های حریم خصوصی پس از تعیین پشتیبانی اعلام خواهد شد.</p><p><a href="https://www.netlify.com/privacy/" target="_blank" rel="noopener noreferrer">سیاست حریم خصوصی Netlify ↗</a></p>'],
 purchase:['شرایط خرید و بازپرداخت','<p>فروش و پرداخت در این سایت هنوز فعال نیست. قیمت، حجم، مدت، تعداد دستگاه، نحوهٔ تحویل و شرایط بازپرداخت نهایی نشده‌اند.</p><p>پیش از شروع فروش، شرایط تأییدشده در این بخش منتشر خواهند شد. این صفحه در حال حاضر هیچ تعهد فروش یا وعدهٔ بازپرداخت مشخصی ایجاد نمی‌کند.</p>']
};
document.querySelectorAll('[data-info]').forEach(button=>button.addEventListener('click',()=>showDialog(...information[button.dataset.info])));
document.getElementById('close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}});
const menu=document.querySelector('.menu-toggle');const navigation=document.getElementById('navigation');
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'بستن منو':'باز کردن منو');navigation.classList.toggle('open',open);});
navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{navigation.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','باز کردن منو');}));
document.getElementById('year').textContent=new Intl.DateTimeFormat('fa-IR-u-ca-gregory',{year:'numeric'}).format(new Date());
renderApps(currentPlatform);
