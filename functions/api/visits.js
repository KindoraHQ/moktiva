const allowed = new Set(['https://mokitavpn.com', 'https://www.mokitavpn.com']);
export function dayKey(now = new Date()) {
 const parts = new Intl.DateTimeFormat('en-GB', {timeZone:'Europe/Brussels',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now);
 const part = type => parts.find(p => p.type === type).value;
 return `${part('year')}-${part('month')}-${part('day')}`;
}
function reply(body, status = 200) {
 return Response.json(body, {status, headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
}
export async function onRequest({request, env}) {
 const url = new URL(request.url);
 if (!allowed.has(url.origin)) return reply({error:'unsupported_host'},403);
 if (!['GET','POST'].includes(request.method)) return reply({error:'method'},405);
 if (!env.VISITS_DB) return reply({error:'temporarily_unavailable'},503);
 const day = dayKey();
 let visitor;
 if (request.method === 'POST') {
  if (request.headers.get('Origin') !== url.origin || request.headers.get('Sec-Fetch-Site') === 'cross-site') return reply({error:'origin'},403);
  if (!request.headers.get('Content-Type')?.startsWith('application/json')) return reply({error:'content_type'},415);
  if (Number(request.headers.get('Content-Length') || 0) > 256) return reply({error:'size'},413);
  const text = await request.text();
  if (text.length > 256) return reply({error:'size'},413);
  let body; try {body=JSON.parse(text);} catch (_) {return reply({error:'json'},400);}
  if (typeof body.visitor !== 'string' || !/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(body.visitor)) return reply({error:'visitor'},400);
  // Ignore known bots; no IP, user agent or browser fingerprint is stored.
  if (!/bot|crawler|spider|headless/i.test(request.headers.get('User-Agent') || '') && !request.cf?.botManagement?.verifiedBot) visitor=body.visitor;
 }
 try {
  const db=env.VISITS_DB;
  await db.prepare('CREATE TABLE IF NOT EXISTS daily_visits (day TEXT NOT NULL, visitor TEXT NOT NULL, PRIMARY KEY(day, visitor)) WITHOUT ROWID').run();
  if (visitor) {
   await db.prepare('INSERT OR IGNORE INTO daily_visits(day,visitor) VALUES (?,?)').bind(day,visitor).run();
   const cutoff=dayKey(new Date(Date.now()-31*86400000));
   await db.prepare('DELETE FROM daily_visits WHERE day < ?').bind(cutoff).run();
  }
  const row=await db.prepare('SELECT COUNT(*) AS count FROM daily_visits WHERE day = ?').bind(day).first();
  return reply({day,count:Number(row.count),timezone:'Europe/Brussels',metric:'daily_browsers'});
 } catch (_) {return reply({error:'temporarily_unavailable'},503);}
}
