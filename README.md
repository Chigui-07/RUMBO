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

### Exploración libre de la casa de Molly

- Después de la charla con sus padres se desbloquean las zonas restantes de la casa.
- La habitación de Molly tendrá más objetos personales que el resto de la casa; al entrar por primera vez ella se pondrá algo nerviosa porque Nicolás puede ver recuerdos y objetos privados relacionados con su amistad.
- Puede haber fotografías, recuerdos, notas, dibujos u objetos que Nicolás le haya dado años atrás.
- En la habitación estará visible, sin explicación, el regalo que Molly planea darle a Nicolás durante la fiesta nocturna. El jugador podrá verlo sin comprender aún su importancia.
- Se propone que el regalo sea un collar compartido de dos piezas: Molly conserva una mitad y Nicolás recibe la otra. Al juntarlas forman un símbolo completo relacionado con su amistad y con el viaje; una rosa de los vientos o brújula dividida es una opción preferida, aunque el diseño final queda pendiente.
- Si Nicolás intenta revisar el regalo antes de tiempo, Molly puede detenerlo de forma nerviosa sin revelar qué es.
- La habitación de Emily tendrá una atmósfera más relajada: libros, objetos escolares, colecciones, dibujos y recuerdos familiares, sin la misma vergüenza de Molly.
- La habitación de los padres de Molly existirá para mantener lógica espacial, pero será secundaria y sencilla: cama grande, armario, cómoda, espejo, fotos familiares y pocos objetos interactivos.
- Con esto se considera cerrada la casa de Molly a nivel conceptual.

### Secreto de la fiesta de cumpleaños

- Nicolás no sabe que habrá una fiesta esa noche.
- Sus padres, Molly y Emily sí conocen la sorpresa y no pueden revelarla directamente.
- Durante la salida, Molly puede dejar indirectas accidentales que no sean obvias para el jugador en ese momento.
- Emily puede ser todavía peor guardando el secreto y decir frases ambiguas que Molly intente cortar.
- Al regresar por la noche, esas pistas anteriores deben adquirir sentido retrospectivamente.

### Salida conjunta y zona social

- Tras obtener permiso, Nicolás y Molly pueden explorar libremente la colonia y entrar a tiendas que antes estaban temporalmente bloqueadas.
- Al salir de la colonia se llega a una calle principal y luego a una zona más social con más caminos, tránsito, peatones, NPC reales, animales y comercios variados.
- Pueden aparecer negocios como panaderías, supermercados, ferreterías/herrerías, restaurantes, tiendas de ropa y otros comercios cotidianos.
- Habrá zona de buses/Transmetro y zona de taxis. El jugador podrá elegir el transporte que prefiera.
- Dentro del transporte habrá oportunidades de conversación, revisar el Diario, consultar mochilas, beber agua, usar los teléfonos cuando ya estén disponibles y observar el trayecto. Los viajes posteriores podrán tener opción de saltarse.
- Nicolás y Molly tendrán un teléfono propio cada uno; los recibirán como sorpresa durante la fiesta final del prólogo.
- Puede ocurrir una escena casual en el camino donde un perro ladra y Molly se sobresalta, acercándose por reflejo a Nicolás; la escena se mantiene amistosa, breve y humorística.

### Tarjetas de ubicación

- Al entrar a una zona nueva aparecerá durante unos segundos una tarjeta discreta con el nombre del lugar, sin detener el gameplay.
- Las tarjetas no mostrarán hora del día.
- Pueden mostrar jerarquía, por ejemplo: `PASEO DE LA SEXTA` / `Centro Histórico — Zona 1`.
- Se usarán para zonas grandes, lugares concretos, casas y comercios como Palacio Nacional, Mercado Central, Casa de Molly, Supermercado o Panadería.
- La primera visita puede marcar internamente el lugar como descubierto para que luego aparezca en el mapa.

### Tiempo durante el prólogo

- Durante el prólogo el sistema normal de día/noche estará temporalmente controlado por secuencias narrativas.
- El mundo no podrá hacerse de noche libremente mientras Nicolás y Molly sigan explorando La Sexta o el Centro Histórico.
- El cambio a tarde/noche ocurrirá únicamente cuando la historia llegue al regreso.
- Después del prólogo el sistema normal de tiempo funcionará libremente.

### Paseo de la Sexta — Primera zona amplia del Centro Histórico

- Independientemente de si usan bus/Transmetro o taxi, ambos transportes llevarán al área general de La Sexta, aunque cada uno tendrá un punto de llegada diferente.
- La Sexta será la primera zona urbana grande con comercios, restaurantes, edificios, NPC, animales comunes y caminos secundarios.
- Será una zona importante para comprar ropa casual dentro de Guatemala: pantalones de lona/jeans, camisas, camisetas, ropa de vestir, vestidos, faldas, sudaderas, zapatos y accesorios.
- Además de ropa casual, cada departamento podrá tener uno o dos conjuntos especiales o representativos disponibles en comercios apropiados.
- Los restaurantes de La Sexta podrán introducir las primeras oportunidades fotográficas de gastronomía.
- La Sexta también podrá tener actividades culturales o ambientales variables para que volver a la zona no siempre produzca exactamente la misma experiencia.
- Algunas bancas podrán servir para descansar y activar conversaciones casuales entre Nicolás y Molly.
- El recorrido del prólogo seguirá de La Sexta hacia la Plaza de la Constitución y luego al Palacio Nacional, con el Mercado Central como otro lugar accesible ese día.

### Mapa como descubrimiento/tutorial

- Al llegar a una zona amplia, Nicolás y Molly pueden darse cuenta de que no saben exactamente por dónde continuar.
- Un NPC puede recomendarles conseguir un mapa, activando una actividad/misión para buscarlo y comprarlo.
- El mapa no genera conocimiento mágico del entorno: organiza lugares ya conocidos o descubiertos y ayuda a orientarse.
- Sin mapa, el jugador no recibirá orientación detallada y deberá guiarse por señales, NPC o exploración; con mapa tendrá una referencia clara.
- El mapa general será de Guatemala y se dividirá por departamento actual, ciudad/zona y secciones descubiertas.

### Filosofía de misiones y actividades opcionales

- Las misiones secundarias no serán necesarias para avanzar en la historia principal ni para abandonar una zona.
- Sí serán necesarias para completar al 100% las zonas, países y el juego.
- Las actividades deben sentirse como exploración, no como una lista artificial de tareas.
- No todas las misiones serán de animales. Podrán incluir observación, investigación, encargos de NPC, descubrir lugares, actividades urbanas, gastronomía, fotografía, pequeños retos de movimiento o interacción y situaciones propias de cada región.
- Las instrucciones pueden ser explícitas cuando el jugador necesite aprender una mecánica concreta; no se obligará al jugador a adivinar reglas importantes.
- Algunas actividades serán globales/reutilizables y podrán aparecer en cualquier país donde tengan sentido; otras serán exclusivas de un lugar o región.
- Molly funcionará como recordatorio natural de objetivos: podrá mencionar pendientes contextualmente o revisar su libreta si el jugador le pregunta qué tienen pendiente.
- Los NPC pueden pedir favores por necesidades propias, no solamente para beneficiar al jugador. Ejemplo: alguien que no puede abandonar su puesto puede pedir comida y recompensar con Armónicos, información u otros objetos.
- Habrá encargos de largo plazo y backtracking: un NPC puede pedir algo procedente de otra zona, departamento o región que todavía no puede visitarse; el jugador podrá completar el favor mucho después al regresar.
- Los encargos de viaje largos no deberían tener límite de tiempo salvo que una situación concreta lo justifique.
- Las recompensas pueden ser Armónicos, información, descuentos, comida, ropa, herramientas, contactos, objetos especiales o progreso de completado; no toda ayuda debe pagarse con dinero.

### Fotografía de animales comunes

- Los animales comunes existen en muchos países y por ello sus retos de fotografía no se consideran exclusivos de Guatemala.
- No cualquier gato, perro, paloma u otro animal común será una oportunidad fotográfica.
- De vez en cuando aparecerá un individuo o comportamiento especial que sí active una oportunidad.
- La paloma será un ejemplo de reto más exigente: deberá aparecer sola y el jugador tendrá que acercarse a una distancia adecuada sin espantarla.
- Acercarse demasiado o hacerlo de forma brusca hará que la paloma huya.
- Cuando la distancia sea adecuada, el juego podrá indicar claramente la acción requerida para evitar que el jugador tenga que adivinar la mecánica.
- Esta misión/actividad de paloma no aparecerá en el prólogo; se reservará para más adelante porque sería demasiado exigente para la primera sesión.
- Otros animales comunes podrán requerir comportamientos diferentes para conseguir su registro, de forma que incluso las especies cotidianas tengan cierto reto.

### Misión principal del prólogo

- El prólogo tendrá una única misión principal clara: llegar con Molly al Palacio Nacional y tomarle una fotografía.
- Comprar el mapa, entrar a tiendas, probar comida, fotografiar gastronomía, hablar con NPC o aceptar favores serán actividades opcionales y no requisitos para terminar la misión principal.
- Al llegar al Palacio Nacional se activa una oportunidad fotográfica importante; al tomar la foto se considera cumplido el objetivo principal del día.
- Completar la fotografía no fuerza el regreso inmediato. Después se habilita un período de exploración libre para visitar La Sexta, Mercado Central y alrededores mientras todavía sea de día.
- Durante esta exploración podrán verse cosas pendientes intencionalmente: ropa demasiado cara, encargos aún imposibles, calles no visitadas, sectores grises del mapa, alimentos no probados y lugares que Nicolás y Molly deciden dejar para otro día.
- La intención es que el prólogo cierre su misión principal pero deje suficientes razones para querer regresar a esas zonas más adelante.

### Regreso del prólogo y transición a la noche

- Mientras Nicolás y Molly buscan transporte para volver, la iluminación sigue siendo clara.
- Una vez dentro del transporte de regreso, la iluminación exterior cambia progresivamente a tonos naranjas de atardecer.
- El viaje de regreso puede incluir una conversación tranquila, observar por la ventana, revisar el Diario o simplemente dejar que transcurra el trayecto.
- Al llegar nuevamente a la colonia, el exterior ya se verá considerablemente más oscuro.
- La transición temporal es narrativa y exclusiva del prólogo; no depende todavía del sistema normal de día/noche.
- Al acercarse a las casas, Nicolás puede proponer acompañar primero a Molly hasta su casa.
- Molly se niega de manera natural y le insiste en que vayan primero a la casa de Nicolás, porque ella conoce la fiesta sorpresa y necesita llevarlo allí sin revelarla.
- El diálogo debe sonar razonable para Nicolás y el jugador, aunque retrospectivamente quede claro que Molly estaba evitando que él descubriera o retrasara la sorpresa.
- Esta escena puede incluir otra indirecta leve de Molly sobre la importancia de llegar temprano, sin mencionar la fiesta.
- En momentos serios, Nicolás y Molly dejan de usar los apodos habituales y se llaman por sus nombres completos. En esta escena Molly puede responder con un `Nicolás.` firme cuando él insiste en acompañarla primero, dejando claro que habla en serio sin revelar la razón.

### Fiesta final del prólogo

- Nicolás y Molly llegan juntos a la casa de Nicolás cuando ya está oscuro.
- La casa puede verse extrañamente tranquila o con las luces principales apagadas para preparar la sorpresa sin hacerla demasiado evidente.
- Nicolás entra primero y la familia activa la sorpresa: sus padres, Molly, Emily y los padres de Molly ya estaban coordinados para celebrar su cumpleaños.
- La revelación debe hacer que las indirectas anteriores de Molly y Emily cobren sentido de forma retrospectiva.
- Emily puede bromear con que casi arruina la sorpresa y Molly reaccionar porque tuvo que evitar que Nicolás descubriera todo durante el día.
- La fiesta será pequeña y familiar, no un evento multitudinario.
- La celebración tendrá gameplay libre entre momentos narrativos: hablar con cada familiar, revisar la decoración, comer, tomar fotografías de recuerdo y participar en una actividad familiar.
- Se considera incluir un minijuego familiar sencillo durante la fiesta. Debe permitir que el jugador participe como Nicolás y, al mismo tiempo, mostrar recuerdos, bromas o personalidad de ambas familias. El diseño concreto del minijuego queda pendiente.
- La cena podrá fotografiarse, pero la fotografía se guardará en `Recuerdos` por representar la celebración del cumpleaños, no en `Gastronomía`.
- El pastel también podrá fotografiarse y se archivará como recuerdo del cumpleaños; una comida similar fotografiada en otro contexto sí podría pertenecer a Gastronomía.
- Durante la fiesta se propone que Molly entregue a Nicolás un collar compartido de dos piezas, quedándose ella con la otra mitad. Las dos piezas forman un símbolo completo al juntarse; la idea preferida es una brújula o rosa de los vientos dividida, aunque el diseño definitivo queda pendiente.
- Si el jugador vio antes el paquete en la habitación de Molly, Nicolás podrá reconocer que se trataba del regalo que ella no quería que revisara.
- Los padres de Molly sorprenderán a Nicolás y Molly regalándoles un teléfono propio a cada uno para sus viajes. El regalo estará acompañado por la petición familiar de mantenerse comunicados, llamar con frecuencia y avisar cuando se desplacen o tengan algún problema.
- Los celulares servirán principalmente para llamadas, mensajes, contactos y futuros servicios de viaje. No reemplazarán la cámara de Nicolás como herramienta principal para las fotografías que registran el Diario.
- La fiesta tendrá dos fotografías personales principales adicionales: una fotografía con ambas familias juntas y otra de Nicolás y Molly juntos. Ambas se guardan en `Recuerdos`.

### Momento tranquilo de Nicolás y Molly durante la fiesta

- Mientras el resto de la familia conversa abajo, el jugador podrá recuperar el control y, mediante una interacción opcional, invitar a Molly a subir a la habitación de Nicolás para hablar con más tranquilidad.
- Esta escena será cercana y personal, pero mantendrá el tono de amistad inocente de ambos personajes.
- Podrán hablar del regalo compartido, de cómo salió el día, de la sorpresa, de lo que quieren hacer al día siguiente y de las cosas que todavía no alcanzaron a explorar.
- Antes de volver con las familias puede existir un intercambio sencillo de `te quiero` entendido como una expresión de cariño entre mejores amigos, sin convertir todavía la relación en una declaración romántica.
- Emily podrá escuchar accidentalmente una pequeña parte de esta conversación sin interrumpir ni burlarse en ese momento. La información puede utilizarse al día siguiente para una indirecta que solamente Molly entienda claramente.
- Este tipo de conversaciones privadas podrán aparecer de manera natural más adelante durante viajes, descansos y otros tiempos muertos, sin convertirse en una mecánica de citas separada.

### Cierre nocturno y descanso

- Después de la fiesta, Molly, Emily y sus padres regresarán a su casa y Nicolás quedará con sus padres.
- Antes de dormir habrá un pequeño tramo de gameplay doméstico para cerrar el día: recoger platos u objetos, ayudar a ordenar una parte de la casa y dejar la celebración atrás de forma natural.
- Nicolás deberá realizar su rutina nocturna básica, incluyendo cepillarse los dientes y prepararse para dormir.
- Podrá despedirse de sus padres y decirles buenas noches antes de subir a su habitación.
- Ya en su habitación el jugador tendrá varias actividades opcionales antes de dormir: revisar el Diario y las fotografías, jugar el minijuego de la consola, probar el nuevo teléfono o llamar a Molly.
- La llamada nocturna a Molly será opcional y permitirá una conversación más personal y tranquila sobre el día, siempre dentro de su amistad y sin contenido físico o sexual. También funcionará como una introducción natural al sistema de llamadas.
- El jugador podrá omitir todas estas actividades y acostarse directamente si quiere terminar el prólogo.
- Dormir será la acción que cierre definitivamente el primer día y el prólogo.
- El cierre debe transmitir que la primera misión terminó, pero que quedan zonas, encargos, lugares, relaciones y sistemas por descubrir en los días siguientes.

### Estado del prólogo

- La planificación narrativa general del prólogo se considera terminada.
- La historia ya tiene principio, desarrollo, misión principal, exploración libre, regreso, fiesta y cierre nocturno definidos.
- Los detalles todavía pendientes, como diálogos finales, minijuego familiar, diseño exacto del collar, mapas, sprites, interfaces, balance y comportamiento de sistemas, pertenecen a la fase de diseño jugable e implementación.
- A partir de este punto, trabajar más a fondo el prólogo significa comenzar a convertir la planificación narrativa en el juego real.

## Día 2 — Inicio del juego normal

- A partir del Día 2 se activan los sistemas normales de RUMBO: agua, hambre/energía física, descanso/energía mental, reloj, ciclo día/noche, Armónicos, gastos y formas de conseguirlos.
- Nicolás despierta aproximadamente a las 7:00 de la mañana.
- Antes de salir de su habitación hay dos acciones obligatorias: cambiarse de ropa y ordenar el cuarto, ya que podría pasar bastante tiempo antes de volver a dormir allí dependiendo de las decisiones del jugador.
- El jugador podrá revisar el celular nuevo. Al principio el único chat importante será el de Molly, quien escribió cinco minutos antes que llegaría a la casa de Nicolás en cinco minutos; al revisar el mensaje, ella estará prácticamente llegando.
- Los padres de Nicolás siguen dormidos a esa hora.
- Molly llega a la casa de Nicolás y ambos pueden preparar juntos un desayuno sencillo usando la cocina.
- La comida preparada puede fotografiarse para `Gastronomía` antes de comerla y también sirve para introducir la recuperación normal de energía/hambre.
- Antes de salir, Nicolás deja una nota a sus padres para avisar que está con Molly y que volverán más tarde.
- Ese día la mochila será obligatoria para salir, pero las llaves no serán un requisito como en el prólogo.
- Nicolás y Molly van a la casa de Molly para que ella recoja su mochila, suministros y libreta.
- Los padres de Molly también siguen dormidos. Podrán visitar a Emily y dejar otra nota avisando que salieron juntos y que regresarán más tarde.
- La mañana será una salida libre/preparatoria. La intención es regresar durante la tarde para almorzar con las familias y despedirse oficialmente antes de comenzar a pasar noches fuera de casa.
- Se propone que la primera noche fuera sea en un hotel económico dentro de Ciudad de Guatemala, de modo que el jugador aprenda reservas, pago, instalación en la habitación y descanso estando todavía cerca de las familias.
- La despedida de la tarde no debe sentirse como una partida definitiva; las familias simplemente recalcan que llamen, mantengan los celulares cargados, cuiden sus Armónicos y avisen dónde dormirán.

### La colonia durante la mañana del Día 2

- Al salir temprano de la casa de Molly, la colonia se verá mucho más vacía que durante el día: pocos peatones, poco tránsito y varios comercios todavía cerrados.
- La hora del día afectará visualmente la actividad del vecindario y la disponibilidad de algunos negocios.
- La colonia se llamará `Colonia Fuente de Cristal` y estará ubicada de forma ficticia dentro de la Zona 4 de Ciudad de Guatemala, cerca de los bordes que permiten conectar con Zona 1 y Zona 5.
- La fuente central será el principal punto de referencia interno y la razón del nombre de la colonia. Puede formar parte de una pequeña plazoleta conectada con el parque y las calles residenciales.
- La colonia tendrá más extensión de la mostrada en el prólogo. Hasta ahora se conoce principalmente el recorrido desde la casa de Nicolás hacia la casa de Molly y, desde allí, hacia la salida/calle principal.
- El Día 2 puede abrir por primera vez la zona situada detrás o al otro lado de la casa de Nicolás, dejando claro que el jugador todavía no conocía toda su propia colonia.
- Un parque de la colonia será una de las primeras áreas completamente libres para explorar durante esta mañana.
- El parque puede funcionar como espacio de descanso, encuentro con vecinos, animales comunes, plantas, pequeños objetos y futuras actividades opcionales.
- La colonia incluirá más residencias alrededor de las casas de Nicolás y Molly para que el lugar se sienta como un vecindario real y no como un corredor de gameplay.
- La colonia tendrá al menos dos salidas diferentes.
- La `Salida 1` será la conocida durante el prólogo: una salida más transitada/comercial que conduce hacia la ruta de transporte utilizada para llegar al Centro Histórico y Zona 1.
- La `Salida 2` estará en otro extremo de Fuente de Cristal y conectará a pie con Zona 5. El jugador no necesitará tomar bus ni taxi: tras abandonar la colonia y caminar un tramo urbano, cruzará naturalmente a la nueva zona.
- La transición caminando entre Fuente de Cristal y Zona 5 servirá para enseñar que algunas zonas de una misma ciudad pueden recorrerse directamente sin transporte.
- Caminar será gratuito y permitirá descubrir NPC, comercios, fauna, flora, calles y actividades, pero consumirá más tiempo, agua y energía. El transporte podrá ahorrar tiempo y esfuerzo a cambio de Armónicos.
- La primera sección de Zona 5 deberá sentirse más activa que Fuente de Cristal: edificios, comercios y centros comerciales, parques pequeños, escuelas/colegios, tráfico y mayor densidad de peatones.
- No será necesario representar toda Zona 5 de una sola vez. Al principio se abrirá únicamente un sector cercano a la Salida 2 y el resto podrá descubrirse progresivamente.
- No todo debe estar activo a las 7:00: algunos NPC aún no habrán salido, ciertos comercios permanecerán cerrados y algunas actividades aparecerán únicamente más tarde.
- Esta expansión permite que volver a Fuente de Cristal y Zona 5 en diferentes horarios produzca experiencias distintas y evita que el vecindario se convierta solamente en un corredor entre las dos casas y la salida principal.

### Orden de expansión y cierre por zonas

- El desarrollo del mundo se organizará por zonas completas para evitar avanzar demasiado rápido y dejar sectores vacíos o repetitivos.
- Antes de diseñar o implementar en profundidad Zona 5, se terminará primero Zona 4.
- Zona 4 tendrá a Fuente de Cristal como colonia principal y se añadirán al menos dos áreas adicionales —por ejemplo otra colonia residencial y un sector con función distinta— para que la zona tenga variedad real y pueda considerarse cerrada.
- Las áreas adicionales de Zona 4 no deben repetir exactamente el concepto de Fuente de Cristal. Se priorizarán identidades diferentes, como mayor densidad residencial, servicios cotidianos, actividad comercial, educación, talleres, oficinas, hospedaje u otros usos urbanos que se definan después de investigar la zona.
- La primera noche en hotel puede aprovechar uno de estos sectores de Zona 4, lo que permite introducir hospedaje sin abandonar todavía la zona inicial.
- Una vez terminada Zona 4, el siguiente gran objetivo de diseño será completar Zona 1, ampliando y cerrando el contenido iniciado en el prólogo antes de continuar a Zona 5.
- La Salida 2 de Fuente de Cristal seguirá existiendo geográficamente y conectará con Zona 5, pero el orden de desarrollo no obliga a cruzarla inmediatamente. En la versión final podrá abrirse cuando el contenido de Zona 5 esté listo, sin necesidad de convertir esta decisión de producción en una barrera artificial permanente para el jugador.
- Antes de diseñar cada zona nueva se investigarán sus rasgos, lugares, ambiente, usos urbanos, gastronomía, historia y tipos de actividad para evitar repetir los mismos conceptos con nombres diferentes.
- El principio general será: terminar un bloque jugable con identidad propia, después expandir el mapa.

> Por ahora el repositorio no tendrá estructura de código ni archivos de juego nuevos; el README se usa como bitácora de diseño.