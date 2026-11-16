/* Festival Isoca · escena realista en WebGL puro (sin librerías).
   Cielo con nubes, estrellas, luna, sol, mar con reflejos y partículas.
   Uso: var e = IsocaEscena(canvas); e.pintar(progreso0a1, tiempoSeg, mouseX, mouseY) */
window.IsocaEscena = function (cv) {
  'use strict';
  var gl = cv.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'high-performance' });
  if (!gl) return null;

  var VS = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
  var FS = [
    'precision highp float;',
    'uniform vec2 R;uniform float T,P,HOR,CLOUD,STARS,PART,MOONA,SUNA;',
    'uniform vec2 MOON,SUN;uniform vec3 CZ,CH,CW,CS;',
    'float h21(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}',
    'float ns(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);',
    ' return mix(mix(h21(i),h21(i+vec2(1,0)),f.x),mix(h21(i+vec2(0,1)),h21(i+vec2(1,1)),f.x),f.y);}',
    'float fbm(vec2 p){float a=.5,s=0.;for(int i=0;i<5;i++){s+=a*ns(p);p=p*2.03+vec2(17.,9.);a*=.5;}return s;}',
    // cielo: degradé, nubes, luna y sol. q = (x con aspecto, y 0..1)
    'vec3 sky(vec2 q,float det){',
    ' float t=clamp((q.y-HOR)/(1.-HOR),0.,1.);',
    ' vec3 c=mix(CH,CZ,pow(t,.62));',
    ' float ds=distance(q,SUN);',
    ' float glow=exp(-ds*ds*70.)*1.1+exp(-ds*4.5)*.42;',
    ' c+=CS*glow*SUNA;',
    ' float dm=distance(q,MOON);',
    ' c+=vec3(.75,.8,.95)*(exp(-dm*6.5)*.2+exp(-dm*dm*90.)*.22)*MOONA;',
    ' float cl=0.;',
    ' if(CLOUD>0.01){',
    '  vec2 cp=vec2(q.x*1.5+T*.012,q.y*4.4-P*1.2);',
    '  float n=fbm(cp)+.5*fbm(cp*2.3+vec2(T*.02,3.));',
    '  float band=smoothstep(.95,.05,t);',
    '  cl=smoothstep(.72,1.18,n+band*.22)*CLOUD;',
    '  vec3 cc=mix(CH*1.12,vec3(1.),.22)+CS*glow*.9*SUNA+vec3(.5,.55,.7)*exp(-dm*5.)*.35*MOONA;',
    '  c=mix(c,cc,cl*.72);',
    ' }',
    ' if(det>.5){',
    // luna con mares y oscurecimiento del borde
    '  float mr=.088;',
    '  if(dm<mr+.004){vec2 mp=(q-MOON)/mr;float mm=smoothstep(mr,mr-.0022,dm);',
    '   float zz=sqrt(max(0.,1.-dot(mp,mp)));vec2 sp2=mp*(1.+.35*(1.-zz));',
    '   float mar=fbm(sp2*1.9+11.);float fino=fbm(sp2*9.+3.)*.6+fbm(sp2*22.+8.)*.4;',
    '   float tex=smoothstep(.38,.62,mar)*.62+fino*.38;',
    '   float cr=0.;for(int k=0;k<2;k++){float s=4.+float(k)*5.;vec2 g=sp2*s+float(k)*13.;vec2 id=floor(g);float rr=h21(id+2.7);',
    '    vec2 o=(vec2(h21(id+5.1),h21(id+9.3))-.5)*.5;float d=length(fract(g)-.5-o);float rad=.12+.2*rr;',
    '    cr+=step(.45,rr)*(smoothstep(rad+.05,rad,d)*.55-smoothstep(rad,rad-.07,d)*.75);}',
    '   float limb=zz*.5+.5;',
    '   vec3 mc=mix(vec3(.42,.43,.48),vec3(1.,.985,.94),clamp(tex+cr*.22,0.,1.))*limb;',
    '   c=mix(c,mc,mm*MOONA*(1.-cl*.6));}',
    // disco solar
    '  float sr=.042;float sd=smoothstep(sr,sr-.006,ds);',
    '  c=mix(c,mix(CS,vec3(1.,.97,.86),.75)*1.25,sd*SUNA*(1.-cl*.5));',
    // estrellas
    '  if(STARS>0.01){vec2 sp=vec2(q.x,q.y+P*.5)*90.;vec2 id=floor(sp);float r=h21(id);',
    '   vec2 o=vec2(h21(id+3.1),h21(id+7.7))-.5;float d=length(fract(sp)-.5-o*.7);',
    '   float tw=.6+.4*sin(T*(1.+r*3.)+r*60.);',
    '   c+=vec3(.95,.93,.85)*step(.93,r)*smoothstep(.09*r,0.,d)*tw*STARS*(1.-cl)*smoothstep(0.,.25,t);}',
    ' }',
    ' return c;}',
    'void main(){',
    ' vec2 uv=gl_FragCoord.xy/R;float a=R.x/R.y;vec2 q=vec2((uv.x-.5)*a,uv.y);vec3 c;',
    ' if(uv.y>=HOR){c=sky(q,1.);}',
    ' else{',
    '  float d=(HOR-uv.y)/HOR;float z=1./(d+.035);',
    '  vec2 w=vec2(q.x*z*1.1,z*1.9);',
    '  float n1=ns(w*2.4+vec2(T*.35,T*.9));float n2=ns(w*6.+vec2(-T*.5,T*1.3));float n3=ns(w*15.+vec2(T*.9,-T*1.7));',
    '  vec2 r=vec2(q.x+(n1-.5)*.07*(.25+d)+(n2-.5)*.02,HOR+(HOR-uv.y)*(1.-HOR)/HOR*.92+(n2-.5)*.06*(.3+d));',
    '  vec3 ref=sky(r,0.);',
    '  float fres=mix(.9,.38,smoothstep(0.,1.,d));',
    '  c=mix(CW,ref,fres);',
    '  c*=.82+.3*(n1*.6+n2*.4);',
    // camino de luz del sol y de la luna
    '  float spark=smoothstep(.5,.95,n2*.55+n3*.6);',
    '  float sw=.025+d*.2;float gs=exp(-pow((q.x-SUN.x)/sw,2.));',
    '  c+=CS*gs*(spark*1.5+.18)*SUNA*smoothstep(-.09,.03,SUN.y-HOR)*(1.-d*.45);',
    '  float mw=.02+d*.14;float gm=exp(-pow((q.x-MOON.x)/mw,2.));',
    '  c+=vec3(.9,.92,1.)*gm*(spark*.9+.08)*MOONA*.75*(1.-d*.5);',
    '  c=mix(c,CH,exp(-d*26.)*.5);',
    ' }',
    // partículas suaves que flotan
    ' if(PART>0.01){for(int i=0;i<2;i++){float fi=float(i);float s=5.+fi*4.;',
    '  vec2 g=q*s+vec2(T*.018*(fi+1.)+fi*3.7,-T*.03-P*(2.+fi*2.));vec2 id=floor(g);float r=h21(id+fi*19.);',
    '  if(r>.62){vec2 o=(vec2(h21(id+1.3),h21(id+8.9))-.5)*.6;float d2=length(fract(g)-.5-o);',
    '   float tw=.5+.5*sin(T*(.6+r*1.8)+r*50.);',
    '   c+=mix(vec3(1.,.86,.55),CS,.3)*smoothstep(.035+.05*r,0.,d2)*tw*.42*PART;}}}',
    ' c*=1.-.42*pow(length(uv-.5)*1.15,2.2);',
    ' c+=(h21(gl_FragCoord.xy+fract(T)*91.)-.5)*.022;',
    ' gl_FragColor=vec4(c,1.);}'
  ].join('\n');

  function sh(t, s) { var o = gl.createShader(t); gl.shaderSource(o, s); gl.compileShader(o); if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) { console.warn(gl.getShaderInfoLog(o)); return null; } return o; }
  var v = sh(gl.VERTEX_SHADER, VS), f = sh(gl.FRAGMENT_SHADER, FS); if (!v || !f) return null;
  var pr = gl.createProgram(); gl.attachShader(pr, v); gl.attachShader(pr, f); gl.linkProgram(pr);
  if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return null;
  gl.useProgram(pr);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  var loc = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  var U = {}; ['R', 'T', 'P', 'HOR', 'CLOUD', 'STARS', 'PART', 'MOONA', 'SUNA', 'MOON', 'SUN', 'CZ', 'CH', 'CW', 'CS'].forEach(function (n) { U[n] = gl.getUniformLocation(pr, n); });

  // momentos del día: cenit, horizonte, agua, color del sol, nubes, partículas
  var K = [
    { p: 0, z: [5, 10, 30], h: [16, 31, 69], w: [5, 12, 34], s: [255, 176, 112], c: .28, pt: 1 },
    { p: .2, z: [8, 19, 48], h: [28, 55, 103], w: [9, 22, 54], s: [255, 176, 112], c: .4, pt: .9 },
    { p: .42, z: [33, 66, 120], h: [226, 150, 104], w: [24, 54, 98], s: [255, 170, 104], c: .62, pt: .5 },
    { p: .68, z: [34, 96, 160], h: [224, 178, 132], w: [26, 84, 132], s: [255, 222, 160], c: .55, pt: .45 },
    { p: 1, z: [36, 44, 92], h: [238, 112, 62], w: [40, 38, 82], s: [255, 134, 66], c: .7, pt: .9 }
  ];
  function mz(a, b, t) { return [(a[0] + (b[0] - a[0]) * t) / 255, (a[1] + (b[1] - a[1]) * t) / 255, (a[2] + (b[2] - a[2]) * t) / 255]; }
  var HOR = .27;

  function medir() {
    var movil = innerWidth < 800, esc = Math.min(window.devicePixelRatio || 1, movil ? 1.25 : 1.5) * (movil ? .7 : .8);
    var w = Math.round(innerWidth * esc), h = Math.round(innerHeight * esc);
    if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; gl.viewport(0, 0, w, h); }
  }
  medir();

  return {
    medir: medir,
    pintar: function (p, t, mx, my) {
      var i = 0; while (i < K.length - 2 && p > K[i + 1].p) i++;
      var a = K[i], b = K[i + 1], k = Math.min(1, Math.max(0, (p - a.p) / (b.p - a.p))), asp = cv.width / cv.height;
      gl.uniform2f(U.R, cv.width, cv.height); gl.uniform1f(U.T, t); gl.uniform1f(U.P, p); gl.uniform1f(U.HOR, HOR);
      gl.uniform3fv(U.CZ, mz(a.z, b.z, k)); gl.uniform3fv(U.CH, mz(a.h, b.h, k)); gl.uniform3fv(U.CW, mz(a.w, b.w, k)); gl.uniform3fv(U.CS, mz(a.s, b.s, k));
      gl.uniform1f(U.CLOUD, a.c + (b.c - a.c) * k); gl.uniform1f(U.PART, a.pt + (b.pt - a.pt) * k);
      gl.uniform1f(U.STARS, Math.max(0, 1 - p / .4));
      // luna: sale, sube y se pone antes del amanecer
      var tm = (p + .1) / .5, ma = Math.max(0, Math.min(1, tm * 6)) * Math.max(0, Math.min(1, (1 - tm) * 6));
      gl.uniform2f(U.MOON, (.16 + .2 * tm) * asp + mx * .012, HOR + Math.sin(Math.PI * Math.min(1, Math.max(0, tm))) * .56 + .02 + my * .008);
      gl.uniform1f(U.MOONA, ma);
      // sol: amanece, sube y termina apoyado en el horizonte
      var ts = Math.max(0, Math.min(1, (p - .36) / .64));
      gl.uniform2f(U.SUN, (asp < 1 ? .24 + .14 * ts : .08 + .24 * ts) * asp + mx * .008, HOR - .02 + Math.sin(Math.PI * ts) * .5 + my * .006);
      gl.uniform1f(U.SUNA, Math.min(1, ts * 14));
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
  };
};
