// =============================================================
// GWCATAT — Supabase client (dipakai index.html & login.html)
// Key publishable BOLEH di frontend; yang dijaga adalah RLS.
// Auth disimpan di sessionStorage (sesi per-tab, sesuai DESIGN keamanan).
// =============================================================
(function () {
  var SUPABASE_URL = 'https://bsoeatbyigbkjwjbzwny.supabase.co';
  var SUPABASE_KEY = 'sb_publishable_zFe8_CqoqbuxubsfsduUew_PyeaDaIm';

  if (!window.supabase || !window.supabase.createClient) {
    console.error('Supabase JS belum dimuat (CDN).');
    return;
  }
  window.sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: {
      storage: window.sessionStorage,
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  });
})();
