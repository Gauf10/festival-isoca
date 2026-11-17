# Festival Isoca 2027 🐚

**13 y 14 de febrero de 2027 · Club Villa del Parque · Necochea**

Una web hecha con cariño para acompañar la octava edición del Festival Isoca: un encuentro en la naturaleza con talleres, música y acampe.

Es un sitio hecho por fans, sin fines de lucro. Toda la información oficial está en [@isocafestival](https://www.instagram.com/isocafestival/).

## La idea

Que entrar a la página se sienta un poco como estar ahí.

La entrada es un portal: el arco con el personaje del afiche espera mientras carga la página. Después la imagen se desvanece, el arco queda como una puerta al cielo y crece hasta que pasás. Ya adentro, aparecen de a uno, de arriba abajo, los elementos de la portada.

Empezás de noche, con la luna sobre el mar. A medida que bajás, el cielo aclara, sale el sol, pasa el día y termina en un atardecer naranja sobre el agua. En el camino aparecen la grilla completa, lo que pasa además de la música, y un recorrido por las ediciones 2026 y 2025 con sus bandas, sus talleres y sus fotos.

Algunos detalles para descubrir:

- Tocá el mar: se abre una onda suave en el agua.
- Mantené apretado en cualquier lugar libre: el tiempo corre (noche, amanecer, día, atardecer y otra vez noche) y queda donde soltás. La luna y el sol salen y se ponen atravesando el horizonte; la luna sale después de la puesta del sol y a veces se la ve de día.
- Cada artista de la grilla lleva a su Instagram.
- Las fotos sueltas se pueden mover con el mouse, como si estuvieran sobre una mesa.
- Arriba a la derecha hay un parlante: enciende un sonido de mar muy suave.
- El lugar es un link al mapa.

## Quiénes

- **Diseño y desarrollo:** [GAUF](https://gaufgang.com)
- **Fotografías:** Agus Malaroda · [Agus PH](https://linktr.ee/agusph)
- **Afiche, isotipo y marca:** Festival Isoca

Gracias a Agus por las imágenes, que son las que cuentan de verdad cómo se vive.

## Cómo está hecho

Todo a mano y sin dependencias: HTML, CSS y JavaScript puros. No hay frameworks, librerías ni paso de compilación, así que cualquiera puede abrirlo, leerlo y aprender de él.

- `index.html`: la página, una sola.
- `css/isoca.css`: estilos, pensados primero para celular.
- `js/escena.js`: el cielo, la luna, el sol, las nubes, el mar y las partículas, dibujados con un shader WebGL.
- `js/isoca.js`: intro del portal, contenido, scroll suave, toques sobre el mar y el cielo, fotos arrastrables y sonido (generado en el navegador con Web Audio, sin archivos de audio).
- `data/`: grillas, talleres y listado de fotos.
- `img/`: fotos en WebP, cada una en dos tamaños (`nombre.webp` y `nombre-m.webp` para celular).

Respeta la preferencia de movimiento reducido del sistema: sin portal, sin toques y sin animaciones.

## Verlo en tu compu

Con cualquier servidor estático. Por ejemplo, parado en esta carpeta:

```bash
npx serve .
```

## Dónde tocar

| Qué | Dónde |
|---|---|
| Artistas 2027 y sus Instagram | `data/ediciones.js` → `ediciones[2027].artistas` |
| Fotos de cada sección | `data/ediciones.js` → `fotosExperiencias`, `fotosVive`, `fotoFinal`, `fotos` |
| Ediciones anteriores | `data/ediciones.js` → `orden` y `ediciones` |
| Talleres 2025 y 2026 | `data/talleres.js` |
| Mapa, Instagram, música propia | `data/ediciones.js` → `enlaces` |
| Fecha, lugar y textos | `index.html` |
| Colores del cielo según la hora | `js/escena.js` → lista `K` |
| Recorrido de la luna y el sol | `js/escena.js` → `NOCHE`, `SALE_LUNA`, `DURA_LUNA` y el bloque de los astros |
| Prender o apagar las ondas y el mantener apretado | `data/ediciones.js` → `toques` (`ondas`, `tiempo`) |
| Tiempos del portal | `css/isoca.css` → bloque `intro` · `js/isoca.js` → `intro` |
| Tamaños de letra | `css/isoca.css` → bloque `escala tipográfica` (variables `--tA` a `--tE`) |

Para sumar una foto: guardarla en `img/<edición>/` en sus dos tamaños y agregarla en `data/fotos.js`.

## Licencia

El código es libre, con licencia MIT (ver `LICENSE`): usalo, copialo, mejoralo.

Las fotografías son de Agus Malaroda, y el afiche, el isotipo y la marca son del Festival Isoca. No están incluidos en esa licencia: si querés usarlos, pediles permiso.

Tipografías: Londrina Solid y DM Sans (SIL Open Font License).

---

Hecho con amor por [GAUF](https://gaufgang.com). Nos vemos allá.
