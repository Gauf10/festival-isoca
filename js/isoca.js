/* Festival Isoca · interacción. JavaScript puro, sin librerías. */
(function () {
  'use strict';
  var D = window.ISOCA, F = window.ISOCA_FOTOS || {}, T = window.ISOCA_TALLERES || {};
  var quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fino = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return [].slice.call((c || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var lim = function (v, a, b) { return Math.max(a, Math.min(b, v)); };

  function src(f, movil) { return 'img/' + f.replace(/-\d+$/, '') + '/' + f + (movil ? '-m' : '') + '.webp'; }
  function dato(f) { var ed = f.replace(/-\d+$/, ''); return (F[ed] || []).filter(function (x) { return x.f === f; })[0] || { f: f, w: 3, h: 2 }; }
  function foto(f, sizes, alt) {
    var d = dato(f), mw = Math.min(800, d.w), mh = Math.round(d.h * mw / d.w);
    return '<figure class="foto" style="--ar:' + d.w + '/' + d.h + '"><img src="' + src(f, true) + '" srcset="' + src(f, true) + ' ' + mw + 'w, ' + src(f) + ' ' + d.w + 'w" sizes="' + sizes +
      '" width="' + mw + '" height="' + mh + '" alt="' + esc(alt) + '" loading="lazy" decoding="async" draggable="false"></figure>';
  }

  // la intro se va sola; este resguardo la quita aunque el navegador pause las animaciones
  var intro = $('.intro'); if (intro) setTimeout(function () { intro.remove(); }, 3200);

  // enlaces configurables
  $$('[data-cta]').forEach(function (a) { a.href = D.enlaces.cta; if (a.hasAttribute('data-cta-texto')) a.textContent = D.enlaces.ctaTexto; });
  $$('[data-ig]').forEach(function (a) { a.href = D.enlaces.instagram; });
  $$('[data-mapa]').forEach(function (a) { a.href = D.enlaces.mapa; });

  /* ---------- contenido ---------- */
  var E27 = D.ediciones[2027];
  function enlace(a) { return '<a href="https://www.instagram.com/' + a[1] + '/" target="_blank" rel="noopener" title="@' + a[1] + '">' + esc(a[0]) + '</a>'; }
  var desde = 0;
  $('#filas').innerHTML = E27.filas.map(function (n, i) {
    var fila = E27.artistas.slice(desde, desde + n); desde += n;
    return '<div class="fila-art' + (i < 4 ? ' fuerte' : '') + '" style="--fs:' + E27.tamanos[i] + '">' + fila.map(enlace).join(' <i aria-hidden="true">✦</i> ') + '</div>';
  }).join('');

  var S_MESA = '(min-width:900px) 34vw, 62vw';
  $('#mesa-mas').innerHTML = E27.fotosExperiencias.map(function (f) { return foto(f, S_MESA, 'Festival Isoca, foto de Agus PH'); }).join('');
  E27.fotosVive.forEach(function (fila, n) { $('#fila' + (n + 1)).innerHTML = fila.map(function (f) { return foto(f, '(min-width:900px) 480px, 60vw', 'Festival Isoca, foto de Agus PH'); }).join(''); });

  // ediciones anteriores, integradas al recorrido
  $('#ediciones').innerHTML = D.orden.map(function (k) {
    var E = D.ediciones[k], h = '<section class="bloque edicion" id="e' + k + '"><p class="anio" aria-hidden="true">' + esc(E.corto) + '</p>' +
      '<div class="leer"><p class="rotulo ver">' + esc(E.edicion) + '</p><h2 class="sr">' + esc(E.nombre) + '</h2><p class="datos ver">' + esc(E.fecha) + '<br>' + esc(E.lugar) + '</p>' +
      '<p class="texto ver">' + esc(E.texto) + '</p>';
    if (E.artistas) h += '<p class="artistas ver">' + E.artistas.map(function (a, i) { return (i < 3 ? '<b>' + esc(a) + '</b>' : esc(a)) + (i === E.artistas.length - 1 ? '' : i + 1 === E.corte ? '<br>' : ' <i aria-hidden="true">✦</i> '); }).join('') + '</p>';
    h += '</div>';
    if (T[k]) {
      var vistos = {}, nombres = T[k].map(function (t) { return t.actividad; }).filter(function (n) { return vistos[n] ? false : (vistos[n] = true); });
      var tira = nombres.map(function (n) { return '<span>' + esc(n) + '</span>'; }).join('');
      h += '<div class="cinta ver" role="group" aria-label="Talleres y actividades de ' + esc(E.nombre) + '"><div style="--dur:' + Math.round(nombres.length * 4.5) + 's">' + tira + '<span class="dup" aria-hidden="true">' + tira + '</span></div></div>';
    }
    h += '<div class="mesa mesa--ancha ver">' + E.fotos.map(function (f) { return foto(f, S_MESA, E.nombre + ', foto de Agus PH'); }).join('') + '</div></section>';
    return h;
  }).join('');

  $('#foto-final').innerHTML = foto(E27.fotoFinal, '(min-width:1240px) 1160px, 92vw', 'Festival Isoca, foto de Agus PH');

  // presentación: cada palabra aparece de 0 a 100 con el scroll
  var man = $('#manifiesto'), pals = [];
  $$('span.l', man).forEach(function (l) { l.innerHTML = l.textContent.trim().split(/\s+/).map(function (p) { return '<span class="pal">' + esc(p) + '</span>'; }).join(' '); });
  pals = $$('.pal', man);

  /* ---------- aparición ---------- */
  var els = $$('.ver');
  if (quieto || !('IntersectionObserver' in window)) els.forEach(function (e) { e.classList.add('en'); });
  else { var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('en'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -8% 0px' }); els.forEach(function (e) { io.observe(e); }); }

  /* ---------- fotos arrastrables (mouse o lápiz) ---------- */
  var capa = 5;
  $$('.mesa .foto').forEach(function (el) {
    var x = 0, y = 0, sx, sy, on = false;
    el.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'touch' || e.button !== 0) return;
      on = true; sx = e.clientX - x; sy = e.clientY - y; el.setPointerCapture(e.pointerId); el.classList.add('agarrada'); el.style.zIndex = ++capa; e.preventDefault();
    });
    el.addEventListener('pointermove', function (e) { if (!on) return; x = e.clientX - sx; y = e.clientY - sy; el.style.setProperty('--dx', x + 'px'); el.style.setProperty('--dy', y + 'px'); });
    function soltar() { on = false; el.classList.remove('agarrada'); }
    el.addEventListener('pointerup', soltar); el.addEventListener('pointercancel', soltar);
  });

  /* ---------- sonido ambiente (generado en el navegador, sin archivos) ---------- */
  var bs = $('#sonido'), au = null;
  function crearAudio() {
    if (D.enlaces.musica) { // si se define un archivo propio en data/ediciones.js, se usa ese
      var el = new Audio(D.enlaces.musica); el.loop = true; el.volume = .7;
      return { on: function () { el.play(); }, off: function () { el.pause(); } };
    }
    var AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null;
    var c = new AC(), out = c.createGain(); out.gain.value = 0; out.connect(c.destination);
    // mar: ruido marrón filtrado que sube y baja como las olas
    var n = c.sampleRate * 4, buf = c.createBuffer(1, n, c.sampleRate), ch = buf.getChannelData(0), last = 0;
    for (var i = 0; i < n; i++) { var w = Math.random() * 2 - 1; last = (last + .02 * w) / 1.02; ch[i] = last * 3.5; }
    var ruido = c.createBufferSource(); ruido.buffer = buf; ruido.loop = true;
    var lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 520;
    var olas = c.createGain(); olas.gain.value = .32;
    var lfo = c.createOscillator(), lg = c.createGain(); lfo.frequency.value = .09; lg.gain.value = .2; lfo.connect(lg); lg.connect(olas.gain);
    var lfo2 = c.createOscillator(), lg2 = c.createGain(); lfo2.frequency.value = .05; lg2.gain.value = 240; lfo2.connect(lg2); lg2.connect(lp.frequency);
    ruido.connect(lp); lp.connect(olas); olas.connect(out); ruido.start(); lfo.start(); lfo2.start();
    // colchón armónico muy suave
    var pad = c.createGain(); pad.gain.value = .05; var pf = c.createBiquadFilter(); pf.type = 'lowpass'; pf.frequency.value = 900; pad.connect(pf); pf.connect(out);
    [110, 164.81, 220, 246.94, 329.63].forEach(function (f, i) {
      var o = c.createOscillator(), g = c.createGain(), l = c.createOscillator(), lgn = c.createGain();
      o.type = i % 2 ? 'sine' : 'triangle'; o.frequency.value = f; o.detune.value = (i - 2) * 4; g.gain.value = .5;
      l.frequency.value = .03 + i * .017; lgn.gain.value = .45; l.connect(lgn); lgn.connect(g.gain);
      o.connect(g); g.connect(pad); o.start(); l.start();
    });
    return {
      on: function () { c.resume(); out.gain.cancelScheduledValues(c.currentTime); out.gain.setValueAtTime(out.gain.value, c.currentTime); out.gain.linearRampToValueAtTime(.9, c.currentTime + 2.5); },
      off: function () { out.gain.cancelScheduledValues(c.currentTime); out.gain.setValueAtTime(out.gain.value, c.currentTime); out.gain.linearRampToValueAtTime(0, c.currentTime + .8); }
    };
  }
  if (bs) bs.addEventListener('click', function () {
    var act = bs.getAttribute('aria-pressed') !== 'true';
    if (act && !au) au = crearAudio();
    if (!au) { bs.hidden = true; return; }
    if (act) au.on(); else au.off();
    bs.setAttribute('aria-pressed', act);
    bs.setAttribute('aria-label', act ? 'Apagar sonido ambiente' : 'Encender sonido ambiente');
  });

  /* ---------- scroll suave con rueda (solo mouse) ---------- */
  var sm = { t: window.scrollY, c: window.scrollY, on: false };
  function tope() { return document.documentElement.scrollHeight - innerHeight; }
  if (fino && !quieto) {
    window.addEventListener('wheel', function (e) {
      if (e.ctrlKey) return; e.preventDefault();
      if (!sm.on) sm.c = sm.t = window.scrollY;
      sm.t = lim(sm.t + e.deltaY * (e.deltaMode === 1 ? 36 : 1), 0, tope()); sm.on = true;
    }, { passive: false });
  }
  $$('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var d = $(a.getAttribute('href')); if (!d) return; e.preventDefault();
      var y = lim(d.getBoundingClientRect().top + window.scrollY, 0, tope());
      if (quieto) { window.scrollTo(0, y); return; }
      sm.c = window.scrollY; sm.t = y; sm.on = true;
    });
  });
  window.addEventListener('pointerdown', function (e) { if (!e.target.closest || !e.target.closest('a[href^="#"]')) sm.on = false; }, { passive: true });
  window.addEventListener('keydown', function () { sm.on = false; });

  /* ---------- bucle: escena, navegación y movimiento ---------- */
  var nav = $('.nav'), arco = $('.arco'), filas = $$('.fila'), anios = $$('.anio'), vive = $('#experiencia');
  var esc3d = window.IsocaEscena ? window.IsocaEscena($('#cielo')) : null;
  var pS = 0, yAnt = window.scrollY, mx = 0, my = 0, mxS = 0, myS = 0, t0 = performance.now(), visible = true;
  window.addEventListener('pointermove', function (e) { if (e.pointerType === 'touch') return; mx = e.clientX / innerWidth - .5; my = .5 - e.clientY / innerHeight; }, { passive: true });
  document.addEventListener('visibilitychange', function () { visible = !document.hidden; if (visible) requestAnimationFrame(cuadro); });
  var rz; window.addEventListener('resize', function () { clearTimeout(rz); rz = setTimeout(function () { if (esc3d) esc3d.medir(); }, 150); });

  /* ---------- toques sobre el mar y el cielo ----------
     Se prenden o apagan uno por uno en data/ediciones.js → toques. */
  var TQ = quieto || !esc3d ? {} : (D.toques || {});
  var fx = { off: 0, ondas: [] };
  var tq = { id: null, x: 0, y: 0, t: 0, tactil: false, apretado: false, antes: 0 };
  function soltar() { tq.id = null; tq.apretado = false; document.documentElement.classList.remove('apretando'); }
  function toque(x, y, ahora) {
    var qy = 1 - y / innerHeight;
    if (TQ.ondas && qy < esc3d.horizonte - .012) { fx.ondas.push({ x: (x / innerWidth - .5) * innerWidth / innerHeight, d: (esc3d.horizonte - qy) / esc3d.horizonte, t: ahora, e: 0 }); if (fx.ondas.length > 3) fx.ondas.shift(); }
  }
  if (TQ.ondas || TQ.tiempo) {
    window.addEventListener('pointerdown', function (e) {
      if (e.button || (e.target.closest && e.target.closest('a,button,.mesa .foto'))) return;
      tq.id = e.pointerId; tq.x = e.clientX; tq.y = e.clientY; tq.t = performance.now(); tq.tactil = e.pointerType === 'touch'; tq.apretado = false;
    }, { passive: true });
    window.addEventListener('pointermove', function (e) { if (e.pointerId === tq.id && Math.hypot(e.clientX - tq.x, e.clientY - tq.y) > 12) soltar(); }, { passive: true });
    window.addEventListener('pointerup', function (e) { if (e.pointerId !== tq.id) return; var ah = performance.now(); if (!tq.apretado && ah - tq.t < 380) toque(tq.x, tq.y, ah); soltar(); }, { passive: true });
    window.addEventListener('pointercancel', soltar, { passive: true });
    window.addEventListener('blur', soltar);
    window.addEventListener('contextmenu', function (e) { if (tq.id !== null && tq.tactil) e.preventDefault(); });
  }
  function efectos(ahora) {
    var dt = Math.min(.1, (ahora - tq.antes) / 1000); tq.antes = ahora;
    // mantener apretado: el tiempo corre y queda donde se suelta (el scroll sigue sumando desde ahí)
    if (TQ.tiempo && tq.id !== null && !tq.apretado && ahora - tq.t > 380) { tq.apretado = true; document.documentElement.classList.add('apretando'); }
    if (tq.apretado) fx.off = (fx.off + dt * .085) % esc3d.ciclo;
    fx.ondas = fx.ondas.filter(function (o) { o.e = (ahora - o.t) / 1000; return o.e < 7; });
  }

  function cuadro(ahora) {
    if (!visible) return;
    if (sm.on) { sm.c += (sm.t - sm.c) * .085; if (Math.abs(sm.t - sm.c) < .4) { sm.c = sm.t; sm.on = false; } window.scrollTo(0, sm.c); }
    var y = window.scrollY, max = tope(), p = max > 0 ? lim(y / max, 0, 1) : 0, H = innerHeight;
    pS += (p - pS) * (quieto ? 1 : .07); mxS += (mx - mxS) * .04; myS += (my - myS) * .04;
    if (esc3d) { efectos(ahora); esc3d.pintar(pS, quieto ? 0 : (ahora - t0) / 1000, mxS, myS, fx); }

    // la navegación se oculta al bajar y vuelve al subir
    if (y > yAnt + 3 && y > 140) nav.classList.add('oculta'); else if (y < yAnt - 3 || y < 140) nav.classList.remove('oculta');
    yAnt = y;

    if (!quieto) {
      if (arco && y < H * 1.2) arco.style.transform = 'translate3d(0,' + (y * .22).toFixed(1) + 'px,0) scale(' + (1 + y / H * .08).toFixed(3) + ')';
      if (vive) {
        var r = vive.getBoundingClientRect();
        if (r.top < H && r.bottom > 0) {
          var k = lim((H - r.top) / (H + r.height), 0, 1);
          filas.forEach(function (f, i) { var rec = Math.max(0, f.scrollWidth - innerWidth + 40); f.style.transform = 'translate3d(' + (-(i % 2 ? 1 - k : k) * rec - 20).toFixed(1) + 'px,0,0)'; });
        }
      }
      anios.forEach(function (a) { var ra = a.getBoundingClientRect(); if (ra.top < H && ra.bottom > 0) a.style.transform = 'translate3d(' + (((ra.top + ra.height / 2) / H - .5) * 90).toFixed(1) + 'px,0,0)'; });
    }
    if (pals.length) { var rm = man.getBoundingClientRect(), av = quieto ? 1 : lim((H * .92 - rm.top) / (rm.height * .85 + H * .22), 0, 1), cab = av * (pals.length + 4);
      pals.forEach(function (s, i) { var o = lim((cab - i) / 4, 0, 1); o = o * o * (3 - 2 * o); s.style.opacity = o.toFixed(3); s.style.transform = 'translate3d(0,' + ((1 - o) * 16).toFixed(1) + 'px,0)'; s.style.filter = o < .98 ? 'blur(' + ((1 - o) * 6).toFixed(1) + 'px)' : 'none'; }); }
    requestAnimationFrame(cuadro);
  }
  requestAnimationFrame(cuadro);
})();
