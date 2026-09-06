# RUMBO

## Bitácora de desarrollo

### Prólogo / Tutorial — Inicio en casa de Nicolás

- El prólogo comienza el día del cumpleaños número 16 de Nicolás.
- La primera escena será una animación gráfica separada del gameplay normal: Nicolás duerme y piensa brevemente sobre su cumpleaños.
- Después habrá una segunda animación en la que despierta con ánimos.
- El control del jugador comienza cuando Nicolás sale de la cama.
- Nicolás empieza en pijama.
- Al iniciar el gameplay aparece una sola vez: `WASD — Moverse` y `E — Interactuar`.
- Después no se repiten ayudas de interacción constantemente.
- Antes de poder bajar, es obligatorio cambiarse de ropa usando el armario.
- La habitación funciona como primer tutorial de exploración e interacción.
- Los objetos interactuables pueden tener un contorno dorado generado por código al estar cerca; no se dibuja una variante manual por objeto.
- Diversos objetos de la habitación tendrán diálogos opcionales o pensamientos de Nicolás.
- Interacciones destacadas de la habitación: cama, ventana, escritorio, foto antigua, mapa/póster del mundo, consola, armario y otros objetos personales.
- La ventana mostrará una vista exterior reutilizable con tráfico ocasional, personas, día/noche y lluvia.
- El mapa/póster podrá abrir una vista gráfica de varios países o del mundo.
- La consola podrá usarse por la noche para un minijuego simple.
- Las fotografías colocadas en la casa podrán abrirse en una vista cercana dibujada en pixel art.
- El armario abrirá una interfaz gráfica de vestuario basada en iconos; al principio solo existirán pijama y ropa casual, y la pijama no podrá volver a equiparse esa mañana.
- Cualquier armario válido de una casa u hospedaje podrá reutilizar esta misma interfaz.

### Corredor del segundo piso

- El corredor conecta la habitación de Nicolás, la habitación de sus padres, un baño y las escaleras.
- Incluye cuadros/fotos familiares, plantas, un mueble decorativo y un reloj de pared.
- Los cuadros/fotos podrán mostrarse en vista cercana pixel art.
- El reloj tendrá agujas que cambian con el tiempo del juego y diálogos distintos según la hora.
- La habitación de los padres puede explorarse esa mañana porque ellos ya están despiertos y abajo esperando a Nicolás.
- La habitación de los padres tendrá cama grande, mesas de noche, armario utilizable, espejo, cómoda, foto familiar, lámpara y decoración sencilla.

### Baños e interacciones cotidianas

- El baño del segundo piso tendrá espejo, lavabo, cepillo de dientes, inodoro, toalla y ducha.
- El espejo usa una animación base simple de mirar el reflejo y parpadear.
- Cuando Molly esté presente, si el jugador permanece un rato frente al espejo, ella puede acercarse al lado de Nicolás y mostrar un leve sonrojo, de forma sutil y no obvia.
- Lavarse las manos y cepillarse los dientes usan animaciones cortas y reutilizables.
- Usar el baño será una animación contextual: el personaje entra, cierra la puerta, pasan unos segundos y se escucha la cadena.
- Ducharse será la interacción de higiene más larga.
- Estas acciones tendrán bloqueos internos para evitar repeticiones absurdas; manos/cepillado tendrán bloqueos cortos, baño uno medio y ducha el más largo.
- El baño de visitas de la planta baja reutiliza estos mismos sistemas.

### Planta baja de la casa de Nicolás

- Las escaleras usan una transición breve a negro y desembocan en un recibidor, no directamente junto a los padres.
- El recibidor conecta cocina/comedor, sala de estar, baño de visitas y salida principal.
- En el recibidor estarán colgadas las llaves de la casa y también estará la mochila de Nicolás antes de salir.
- No se usarán elementos ajenos a una casa guatemalteca típica, como percheros para abrigos de nieve o zapateras de entrada estilo japonés.
- La sala de estar tendrá sofá, mesa central, televisión, librerías y ventana grande.
- La cocina tendrá refrigerador, estufa, repisa/área de preparación, microondas, mueble de platos y alacena.
- La alacena y refrigerador podrán funcionar como fuentes de alimentos, bebidas, ingredientes u objetos útiles; no es necesario dibujar cada contenido individualmente.
- El comedor estará conectado con la cocina y tendrá una mesa grande con sillas.

### Primer encuentro con los padres / desayuno

- Al bajar, Nicolás debe ir primero al comedor; la sala y otras zonas se bloquean momentáneamente hasta hablar con sus padres.
- Los padres lo reciben diciéndole feliz cumpleaños.
- Después le ofrecen el desayuno.
- Comer tendrá gameplay simple con `E — Comer` mostrado la primera vez que se use esta mecánica.
- Nicolás no conversa mientras está comiendo; los diálogos continúan después.
- El desayuno será algo sencillo de dibujar en primer plano y se irá consumiendo visualmente.
- Tras comer, comienza la conversación familiar sobre el cumpleaños y los regalos.

### Regalos y objetos importantes

- Nicolás recibe el Diario de viajes.
- Los objetos importantes usan una presentación especial: texto `Objeto conseguido`, sprite grande al centro y nombre del objeto.
- Al recibir el Diario, el jugador puede abrirlo y recorrerlo página por página; el diálogo queda pausado hasta cerrar el diario.
- Nicolás recibe la cámara.
- La cámara tendrá una animación de demostración en la que Nicolás simula tomar una foto y se explican sus controles básicos.
- La cámara no usa una interfaz gráfica compleja de primera persona; en una oportunidad fotográfica válida se activa, hay flash y se obtiene la foto.
- El sistema de cámara se detallará más adelante.
- Los padres también entregan Armónicos y explican que son la moneda usada para comida, objetos, transporte y otros gastos del viaje, además de explicar de forma básica cómo podrán conseguirse.
- Los Armónicos se consideran parte de los objetos importantes de Nicolás.

### Mochilas e inventario

- Nicolás lleva los objetos principales: Diario, cámara, llaves, Armónicos y más adelante linterna, pasaportes y documentos importantes.
- Molly llevará principalmente herramientas, alimentos, suministros y su libreta de apuntes.
- La libreta de Molly sirve como origen de sus comentarios personales que aparecen en entradas del Diario, incluyendo fauna, flora, gastronomía, lugares, fotografías y otros registros.
- Cuando Nicolás necesita acceder al inventario, se quita la mochila, la coloca y la abre con una animación.
- Cuando está con Molly, ella se acerca y coloca su mochila junto a la de Nicolás para que el jugador elija cuál abrir.
- Los objetos comunes no detienen el gameplay: aparece una notificación breve como `Botella de agua x3 obtenida`.
- Cuando Molly recoge algo puede indicarse a qué mochila fue enviado.
- Cada personaje tendrá una botella de agua como objeto principal con un indicador visual sencillo del nivel disponible.
- El agua será esencial y habrá un botón rápido para que ambos personajes beban automáticamente mediante una animación.
- Comida y descanso usarán iconos simples que disminuyen gradualmente; el sistema se detallará más adelante.

### Salida de la casa de Nicolás

- Después de la conversación con los padres se libera la exploración completa de la planta baja.
- Nicolás puede revisar la sala, cocina, baño, librerías, TV, ventanas y recoger suministros opcionales.
- Antes de salir debe recoger obligatoriamente la mochila del recibidor y las llaves de la casa.
- Si intenta salir sin alguno, Nicolás lo comenta de forma natural en vez de aparecer un mensaje técnico.
- Los padres tienen diálogos opcionales si se vuelve a hablar con ellos antes de salir.
- Los padres sugieren que Nicolás vaya a enseñarle los regalos a Molly porque ella probablemente se emocionará más que él.
- Nicolás no sabe que habrá una fiesta esa noche.

### Primera salida a la calle

- Nicolás sale directamente a la acera frente a su casa.
- La calle tendrá árboles, plantas, casas vecinas, postes, señales sencillas y sonidos urbanos.
- Pasarán automóviles con física/colisión; el jugador debe tener cuidado al cruzar.
- Si Nicolás o Molly son atropellados, la consecuencia será no gráfica: impacto breve, fundido, reaparición segura y penalización ligera como pérdida de energía/tiempo.
- Los vehículos pueden frenar si tienen tiempo de reaccionar.
- De vez en cuando pasarán peatones ambientales con variantes visuales y animales comunes.
- Muchos peatones serán solo de ambientación y no se podrá hablar con ellos.
- Gatos, perros y palomas serán comunes en las calles.
- La fauna se dividirá al menos entre animales comunes y animales exóticos/silvestres.
- Animales comunes registrados pueden incluir gatos, perros, palomas, ratas/ratones, cucarachas, hormigas, mosquitos, moscas y otros seres cotidianos.
- No cualquier aparición será una oportunidad fotográfica; solo algunos encuentros concretos.
- Las plantas podrán registrarse sin tanta restricción; algunos árboles comunes serán fáciles de encontrar mientras especies como la ceiba serán encuentros más especiales.

### Camino hacia la casa de Molly

- El trayecto será corto, de unas pocas calles, para permitir exploración sin alargar demasiado el prólogo.
- Habrá al menos un cruce donde sea necesario esperar a que pasen los carros y otro punto posible con semáforo.
- Pueden aparecer tiendas o puestos, pero antes de reunirse con Molly Nicolás no podrá entrar porque preferirá hacer esas cosas con ella.
- Puede haber 2 o 3 objetos opcionales recogibles durante el camino.
- Aunque Nicolás ya tiene la cámara, no podrá tomar fotografías antes de estar con Molly; si intenta usarla puede comentar que quiere esperar por ella.
- Al llegar a la casa de Molly, Nicolás tocará la puerta.

### Casa de Molly y unión al grupo

- Molly abre la puerta personalmente y deja entrar a Nicolás.
- La casa tendrá una estructura parecida a la de Nicolás para reutilizar sistemas, pero con identidad visual propia y toques algo más femeninos/cálidos, ya que viven Molly, Emily y su madre junto al padre.
- La casa incluye habitación de Molly, habitación de Emily, habitación de los padres, baño, sala, cocina/comedor y recibidor.
- Nicolás y Molly se sientan juntos en la sala para conversar sin interrupciones.
- Nicolás le muestra/explica el Diario y la cámara y la invita a salir con él.
- Molly acepta muy emocionada.
- Puede darle un abrazo breve y natural como su mejor amiga y decirle que es su mejor amigo y que lo quiere mucho, manteniendo el tono inocente y apropiado.
- Después de terminar esta conversación aparece Emily y puede molestar cariñosamente a Molly por la situación.
- Tras la escena, Molly se une al grupo y se habilita el gameplay con ambos personajes.
- Molly recuerda que primero deben hablar con sus padres, por lo que ciertas zonas/acciones quedan bloqueadas momentáneamente.

### Conversación con la familia de Molly

- Los padres de Molly felicitan a Nicolás por su cumpleaños.
- La conversación debe sentirse familiar y natural; el permiso para salir surge como un tema dentro de la charla, no como una petición abrupta.
- Molly cuenta emocionada lo del Diario y la cámara y explica que Nicolás quiere ir a probarlos con ella.
- Emily puede participar con comentarios breves y bromas.
- Los padres finalmente les dan permiso con condiciones normales: mantenerse juntos, avisar si pasa algo y regresar a tiempo.
- Después del permiso, Molly prepara su mochila, toma sus llaves y recoge alimentos/suministros.
- Nicolás le pasa a Molly la comida que ya llevaba para que ella gestione los alimentos.

### Secreto de la fiesta de cumpleaños

- Nicolás no sabe que habrá una fiesta esa noche.
- Sus padres, Molly y Emily sí conocen la sorpresa y no pueden revelarla directamente.
- Durante la salida, Molly puede dejar indirectas accidentales que no sean obvias para el jugador en ese momento.
- Emily puede ser todavía peor guardando el secreto y decir frases ambiguas que Molly intente cortar.
- Al regresar por la noche, esas pistas anteriores deben adquirir sentido retrospectivamente.

> Por ahora el repositorio no tendrá estructura de código ni archivos de juego nuevos; el README se usa como bitácora de diseño.