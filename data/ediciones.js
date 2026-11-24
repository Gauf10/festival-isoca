/* Festival Isoca · datos editables.
   Todo el contenido del sitio sale de este archivo: enlaces, textos, grillas. */

window.ISOCA = {
  enlaces: {
    instagram: 'https://www.instagram.com/isocafestival/',
    fotos: 'https://linktr.ee/agusph',
    gauf: 'https://gaufgang.com',
    mapa: 'https://maps.app.goo.gl/asRHby8seFDc2xvy9',
    // Sonido de fondo: vacío = ambiente de mar generado en el navegador. Para usar un tema propio, poner la ruta a un .mp3 (por ejemplo 'audio/tema.mp3').
    musica: '',
    // Playlist de Spotify (link de compartir, por ejemplo https://open.spotify.com/playlist/...). Vacío = no aparece el botón.
    playlist: ''
  },

  // Juegos con el fondo. Poner false para apagar cada uno.
  toques: {
    ondas: true,   // tocar el agua: una onda suave que se abre despacio
    tiempo: true   // mantener apretado: el tiempo corre (noche → día → atardecer → noche) y queda donde se suelta
  },

  // Ediciones anteriores, en el orden en que aparecen al recorrer la página.
  orden: ['2026', '2025'],

  ediciones: {
    2027: {
      nombre: 'Festival Isoca 2027',
      fecha: '13 y 14 de febrero de 2027',
      lugar: 'Club Villa del Parque · Necochea',
      // [nombre, usuario de Instagram], en el orden del afiche.
      // Jerarquía del afiche: cuántos artistas van en cada fila (de mayor a menor) y el tamaño de letra de esa fila.
      filas: [2, 2, 2, 3, 3, 3, 3, 5, 4, 5, 5, 5],
      tamanos: [72, 63, 56, 47, 40, 35, 31, 26, 24.5, 23, 21.5, 20],
      fotosExperiencias: ['2026-39', '2026-02', '2025-05', '2024-10', '2026-40'],
      fotosVive: [['2024-12', '2026-35', '2025-32', '2024-07', '2026-19', '2025-12'], ['2026-36', '2024-02', '2025-22', '2026-33', '2024-11', '2025-20'], ['2026-31', '2024-04', '2025-11', '2026-21', 'anteriores-02', '2025-19']],
      // Foto grande antes del cierre.
      fotoFinal: '2024-12',
      artistas: [
        ['Divididos', 'divididosoficial'],
        ['El Plan de la Mariposa', 'elplandelamariposa'],
        ['Él Mató a un Policía Motorizado', 'elmatoaunpoliciamotorizado'],
        ['Guasones', 'guasones'],
        ['La Delio Valdez', 'orquestadeliovaldez'],
        ['León Gieco + La Vitale Band', 'giecoleon_oficial'],
        ['Marilina Bertoldi', 'marilinaplastilina'],
        ['Dancing Mood', 'dancingmood'],
        ['Piti Fernández', 'pitifernandez20'],
        ['Autos Robados', 'autosrobados.rnr'],
        ['Maggie Cullen', 'maggie.cullen'],
        ['Lisandro Aristimuño', 'lisandroaristi'],
        ['Carmen Sánchez Viamonte', 'carmensanchezviamonte'],
        ['Edu Schmidt', 'eduschmidtoficial'],
        ['Joaquín del Mundo', 'joa_delmundo'],
        ['Homero Taisen', 'homerotaisen'],
        ['Gauchos of the Pampa', 'gauchosofthepampa'],
        ['Trash (Choque Urbano)', 'elchoqueurbano'],
        ['Manu Martínez', 'manuumartinez_99'],
        ['Paraná Berreta', 'paranaberreta'],
        ['Daltónica', 'daltonica__'],
        ['Terrores Nocturnos', 'terrores_nocturnos'],
        ['Mugre', 'bochademugre'],
        ['La Fanfarria del Capitán', 'lafanfarriadelcapitan'],
        ['Qki Dones', 'qki.dones'],
        ['Nación Ekeko', 'nacionekeko'],
        ['Escalopez', 'escalopezrock'],
        ['María Morgade', 'mariamorgade_'],
        ['Isla Tucán', 'isla.tucan'],
        ['Zaino Overo', 'zaino.overo'],
        ['Litio', 'litio_ok'],
        ['Colmado', 'colmado.hr'],
        ['Benteveo', 'bente.veo'],
        ['La Forastería', 'la.forasteria'],
        ['Celeste CC', 'celestecc___'],
        ['Moah', 'm_o_a_h'],
        ['Valentina Palacio', 'vvalentinapalacio'],
        ['Umo', 'umo_rockband'],
        ['Incendio Chico', 'incendio.chico'],
        ['Potrero', 'potrerodelrock'],
        ['Marea', 'agostina.marea'],
        ['Qué Pichón', 'que_pichon']
      ]
    },

    2026: {
      nombre: 'Isoca 2026',
      edicion: 'Séptima edición',
      fecha: '30 y 31 de enero y 1 de febrero de 2026',
      lugar: 'Club Dannevirke · San Cayetano',
      corto: '2026',
      fotos: ['2026-14', '2026-03', '2026-23', '2026-22', '2026-28', '2026-12', '2026-34', '2026-37', '2026-25', '2026-10'],
      texto: 'Tres jornadas en San Cayetano, entre el bosque y la laguna, con música, talleres y actividades participativas.',
      artistas: ['El Plan de la Mariposa', 'Nonpalidece', 'Camionero', 'Mocchi', 'Rumbo Tumba', 'Todo Aparenta Normal', 'Gauchos of the Pampa', 'Las Hermanas Trucco', 'Julieta Laso', 'Edu Schmidt', 'Nación Ekeko', 'Paraná Berreta', 'Qki Dones', 'El Síndrome de Peter', 'Maia Monaco', 'Campo Loop', 'El Árbol de Diego', 'Soy Sofía', 'Sophie Alice', 'Colmado', 'Apiro', 'Qué Pichón']
    },

    2025: {
      nombre: 'Isoca 2025',
      edicion: 'Sexta edición',
      fecha: '17, 18 y 19 de enero de 2025',
      lugar: 'Club Dannevirke · San Cayetano',
      corto: '2025',
      fotos: ['2025-06', '2025-10', '2025-04', '2025-26', '2025-21', '2025-29', '2025-13', '2025-31', '2025-07', '2025-27'],
      texto: 'Talleres, charlas, ecología, yoga, meditación y astrología, con acampe junto a la laguna.',
      artistas: ['El Plan de la Mariposa', 'Eruca Sativa', 'Gauchito Club', 'Alan Sutton y las Criaturitas', 'Feli Colina', 'Nación Ekeko', 'Pili Presh', 'Rumbo Tumba', 'Facón', 'Manu Martínez', 'Sindicato Argentino de Boleros', 'Gloria Carrá', 'La Fanfarria del Capitán', 'Qki Dones', 'Maia Monaco', 'María Morgade', 'Vale Acevedo', 'Rebeca Flores', 'Antü', 'Forasteros Blues', 'Zaino Overo', 'Luz Pereyra', 'Litio', 'Isla Tucán', 'Nada Desierto', 'Joaco Burgos', 'Dúo Sudestada']
    }
  }
};
