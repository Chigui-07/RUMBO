(function () {
  "use strict";

  const storage = window.RumboStorage;
  const WORLD_WIDTH = 960;
  const WORLD_HEIGHT = 540;
  const PLAYER_WIDTH = 34;
  const PLAYER_HEIGHT = 52;
  const MOVE_SPEED = 185;
  const INTERACTION_RANGE = 72;

  const stage = document.getElementById("prologue-stage");
  const playerElement = document.getElementById("prologue-player");
  const sceneTitle = document.getElementById("prologue-scene-title");
  const interactionPrompt = document.getElementById("interaction-prompt");
  const dialogueBox = document.getElementById("prologue-dialogue");
  const dialogueSpeaker = document.getElementById("prologue-dialogue-speaker");
  const dialogueText = document.getElementById("prologue-dialogue-text");
  const wardrobePanel = document.getElementById("wardrobe-panel");
  const wardrobePajamas = document.getElementById("wardrobe-pajamas");
  const wardrobeCasual = document.getElementById("wardrobe-casual");
  const wardrobeClose = document.getElementById("wardrobe-close");
  const introOverlay = document.getElementById("prologue-intro");
  const introLabel = document.getElementById("prologue-intro-label");
  const introTitle = document.getElementById("prologue-intro-title");
  const introText = document.getElementById("prologue-intro-text");
  const introContinue = document.getElementById("prologue-intro-continue");
  const hudSlot = document.getElementById("prologue-hud-slot");
  const hudObjective = document.getElementById("prologue-hud-objective");

  const keys = new Set();

  let activeSlot = null;
  let running = false;
  let animationFrame = null;
  let previousTime = 0;
  let activeSceneId = "bedroom";
  let currentNearbyObject = null;
  let introStep = 0;
  let modalOpen = false;

  const player = {
    x: 480,
    y: 285,
    changedClothes: false
  };

  const scenes = {
    bedroom: {
      title: "Habitación de Nicolás",
      spawn: { x: 480, y: 285 },
      objects: [
        {
          id: "window",
          label: "Ventana",
          x: 90, y: 58, w: 170, h: 48,
          solid: true,
          kind: "interactive",
          text: "La mañana apenas empieza. Desde aquí se ve parte de la colonia y el movimiento de la calle."
        },
        {
          id: "bed",
          label: "Cama",
          x: 68, y: 315, w: 230, h: 125,
          solid: true,
          kind: "interactive",
          text: "Mi cama. Hace unos minutos todavía estaba dormido... hoy cumplo 16."
        },
        {
          id: "desk",
          label: "Escritorio",
          x: 355, y: 62, w: 190, h: 82,
          solid: true,
          kind: "interactive",
          text: "Mi escritorio. Luego habrá objetos, tareas, recuerdos y cosas que podré revisar aquí."
        },
        {
          id: "photo",
          label: "Foto antigua",
          x: 292, y: 64, w: 50, h: 46,
          solid: true,
          kind: "interactive",
          text: "Una foto de hace años. Cuando tengamos el arte final podrá abrirse en una vista cercana."
        },
        {
          id: "world-map",
          label: "Mapa del mundo",
          x: 570, y: 60, w: 118, h: 72,
          solid: true,
          kind: "interactive",
          text: "El mundo es enorme... me pregunto cuántos de estos lugares llegaré a conocer algún día."
        },
        {
          id: "wardrobe",
          label: "Armario",
          x: 742, y: 55, w: 145, h: 112,
          solid: true,
          kind: "interactive",
          action: "wardrobe"
        },
        {
          id: "console",
          label: "Consola",
          x: 690, y: 355, w: 118, h: 78,
          solid: true,
          kind: "interactive",
          text: "Ahora no. Quizá esta noche pueda jugar un rato."
        },
        {
          id: "door",
          label: "Puerta al corredor",
          x: 887, y: 205, w: 52, h: 125,
          solid: true,
          kind: "door",
          action: "bedroom-exit"
        }
      ]
    },

    "upstairs-hall": {
      title: "Corredor · Segundo piso",
      spawn: { x: 105, y: 270 },
      objects: [
        {
          id: "bedroom-door",
          label: "Habitación de Nicolás",
          x: 18, y: 205, w: 52, h: 125,
          solid: true,
          kind: "door",
          action: "return-bedroom"
        },
        {
          id: "parents-door",
          label: "Habitación de los padres",
          x: 185, y: 58, w: 160, h: 54,
          solid: true,
          kind: "door",
          action: "enter-parents-room"
        },
        {
          id: "bathroom-door",
          label: "Baño",
          x: 455, y: 58, w: 105, h: 54,
          solid: true,
          kind: "door",
          action: "enter-bathroom"
        },
        {
          id: "family-photos",
          label: "Fotos familiares",
          x: 290, y: 415, w: 175, h: 48,
          solid: true,
          kind: "interactive",
          text: "Fotos familiares de distintos años. Algunas terminarán siendo recuerdos que Nicolás podrá volver a mirar."
        },
        {
          id: "clock",
          label: "Reloj",
          x: 600, y: 402, w: 58, h: 58,
          solid: true,
          kind: "interactive",
          text: "Todavía es temprano. Más adelante este reloj seguirá la hora real del juego."
        },
        {
          id: "stairs",
          label: "Escaleras",
          x: 760, y: 290, w: 150, h: 150,
          solid: true,
          kind: "door",
          action: "go-downstairs"
        }
      ]
    },

    bathroom: {
      title: "Baño · Segundo piso",
      spawn: { x: 120, y: 275 },
      objects: [
        {
          id: "bathroom-exit",
          label: "Volver al corredor",
          x: 18, y: 205, w: 52, h: 125,
          solid: true,
          kind: "door",
          action: "bathroom-exit"
        },
        {
          id: "sink",
          label: "Lavabo",
          x: 170, y: 64, w: 150, h: 74,
          solid: true,
          kind: "interactive",
          text: "El lavabo. Aquí podremos añadir después acciones de rutina sin convertirlas en obligaciones constantes."
        },
        {
          id: "mirror",
          label: "Espejo",
          x: 355, y: 55, w: 130, h: 82,
          solid: true,
          kind: "interactive",
          text: "Nicolás se mira un momento. Definitivamente ya no tiene cara de seguir durmiendo."
        },
        {
          id: "cabinet",
          label: "Gabinete",
          x: 525, y: 62, w: 130, h: 80,
          solid: true,
          kind: "interactive",
          text: "Aquí se guardan artículos de higiene y cosas de uso diario."
        },
        {
          id: "shower",
          label: "Ducha",
          x: 700, y: 55, w: 190, h: 180,
          solid: true,
          kind: "interactive",
          text: "La ducha. Por ahora es decorativa; luego decidiremos qué rutinas tendrán interacción real."
        },
        {
          id: "toilet",
          label: "Sanitario",
          x: 720, y: 345, w: 105, h: 90,
          solid: true,
          kind: "furniture",
          text: "Parte normal del baño. No necesita convertirse en una mecánica del juego."
        },
        {
          id: "laundry-basket",
          label: "Cesto de ropa",
          x: 500, y: 370, w: 110, h: 85,
          solid: true,
          kind: "interactive",
          text: "Un cesto para la ropa. Más adelante puede servir como detalle ambiental cuando exista el sistema de ropa limpia."
        },
        {
          id: "towel-rack",
          label: "Toallas",
          x: 245, y: 395, w: 135, h: 48,
          solid: true,
          kind: "interactive",
          text: "Toallas limpias. Estos objetos pequeños ayudarán a que la casa se sienta habitada cuando llegue el arte final."
        }
      ]
    },

    "parents-room": {
      title: "Habitación de los padres",
      spawn: { x: 120, y: 275 },
      objects: [
        {
          id: "parents-room-exit",
          label: "Volver al corredor",
          x: 18, y: 205, w: 52, h: 125,
          solid: true,
          kind: "door",
          action: "parents-room-exit"
        },
        {
          id: "parents-bed",
          label: "Cama",
          x: 330, y: 72, w: 290, h: 165,
          solid: true,
          kind: "furniture",
          text: "La cama de mis padres. Mejor no ponerme a revisar demasiado por aquí."
        },
        {
          id: "left-nightstand",
          label: "Mesa de noche",
          x: 245, y: 110, w: 70, h: 75,
          solid: true,
          kind: "interactive",
          text: "Una mesa de noche con objetos cotidianos."
        },
        {
          id: "right-nightstand",
          label: "Mesa de noche",
          x: 635, y: 110, w: 70, h: 75,
          solid: true,
          kind: "interactive",
          text: "Otra mesa de noche. No hay nada que Nicolás necesite tomar."
        },
        {
          id: "parents-wardrobe",
          label: "Armario",
          x: 730, y: 62, w: 165, h: 128,
          solid: true,
          kind: "furniture",
          text: "El armario de mis padres. Sus cosas son suyas; no tengo motivo para abrirlo."
        },
        {
          id: "parents-photo",
          label: "Foto familiar",
          x: 110, y: 70, w: 95, h: 70,
          solid: true,
          kind: "interactive",
          text: "Una fotografía familiar. Cuando tengamos las imágenes definitivas, este tipo de fotos podrá verse de cerca."
        },
        {
          id: "parents-window",
          label: "Ventana",
          x: 105, y: 350, w: 210, h: 65,
          solid: true,
          kind: "interactive",
          text: "Desde aquí también se alcanza a ver la colonia despertando."
        },
        {
          id: "parents-chair",
          label: "Sillón",
          x: 675, y: 345, w: 145, h: 105,
          solid: true,
          kind: "furniture",
          text: "Un sillón sencillo junto a la pared."
        }
      ]
    },

    "downstairs-foyer": {
      title: "Recibidor · Planta baja",
      spawn: { x: 790, y: 330 },
      objects: [
        {
          id: "stairs-up",
          label: "Escaleras al segundo piso",
          x: 760, y: 290, w: 150, h: 150,
          solid: true,
          kind: "door",
          action: "go-upstairs"
        },
        {
          id: "front-door",
          label: "Puerta principal",
          x: 18, y: 200, w: 62, h: 140,
          solid: true,
          kind: "door",
          text: "Todavía no voy a salir. Primero debo bajar con mis padres y desayunar."
        },
        {
          id: "shoe-rack",
          label: "Mueble de entrada",
          x: 105, y: 62, w: 180, h: 82,
          solid: true,
          kind: "interactive",
          text: "Un mueble de entrada para llaves, zapatos y algunas cosas que usamos al salir."
        },
        {
          id: "foyer-mirror",
          label: "Espejo de entrada",
          x: 325, y: 60, w: 115, h: 90,
          solid: true,
          kind: "interactive",
          text: "Otro vistazo rápido antes de empezar el día."
        },
        {
          id: "living-room-way",
          label: "Sala",
          x: 500, y: 60, w: 160, h: 70,
          solid: true,
          kind: "door",
          text: "La sala estará conectada aquí. Será parte del siguiente bloque de la planta baja."
        },
        {
          id: "kitchen-way",
          label: "Cocina / comedor",
          x: 650, y: 58, w: 190, h: 74,
          solid: true,
          kind: "door",
          text: "Por aquí está la cocina y el comedor. Ahí continuará la historia con el desayuno y los regalos."
        },
        {
          id: "plant",
          label: "Planta",
          x: 170, y: 390, w: 95, h: 95,
          solid: true,
          kind: "furniture",
          text: "Una planta de interior. Más adelante tendrá su sprite y detalles propios."
        },
        {
          id: "family-frame",
          label: "Cuadro familiar",
          x: 405, y: 395, w: 150, h: 55,
          solid: true,
          kind: "interactive",
          text: "Un cuadro familiar cerca de la entrada."
        }
      ]
    }
  };

  const introSteps = [
    {
      label: "ANIMACIÓN PROVISIONAL 1",
      title: "Nicolás duerme",
      text: "Este cuadro representa la futura animación pixel art de Nicolás durmiendo y pensando brevemente en su cumpleaños. La lógica ya queda colocada; el arte se sustituirá después."
    },
    {
      label: "ANIMACIÓN PROVISIONAL 2",
      title: "Mañana de cumpleaños",
      text: "Nicolás despierta con ánimos. Después de esta transición comienza el control normal del jugador dentro de su habitación."
    }
  ];

  function start(slotIndex) {
    if (!stage || !storage) {
      return;
    }

    activeSlot = slotIndex;
    const save = storage.getSave(slotIndex);
    if (!save) {
      return;
    }

    const state = save.prologueState || {};
    player.changedClothes = Boolean(state.changedClothes);
    activeSceneId = scenes[state.scene] ? state.scene : "bedroom";

    const scene = scenes[activeSceneId];
    player.x = Number.isFinite(state.x) ? state.x : scene.spawn.x;
    player.y = Number.isFinite(state.y) ? state.y : scene.spawn.y;

    renderScene();
    updatePlayerVisual();
    updateHud();

    running = true;
    previousTime = performance.now();
    keys.clear();

    if (!state.introComplete) {
      introStep = 0;
      modalOpen = true;
      showIntroStep();
    } else {
      introOverlay.hidden = true;
      modalOpen = false;
    }

    if (animationFrame === null) {
      animationFrame = requestAnimationFrame(loop);
    }
  }

  function stop() {
    if (!running) {
      return;
    }

    persistState();
    running = false;
    keys.clear();
    currentNearbyObject = null;
    interactionPrompt.classList.remove("is-visible");

    if (animationFrame !== null) {
      cancelAnimationFrame(animationFrame);
      animationFrame = null;
    }
  }

  function isRunning() {
    return running;
  }

  function loop(time) {
    if (!running) {
      animationFrame = null;
      return;
    }

    const delta = Math.min(0.035, Math.max(0, (time - previousTime) / 1000));
    previousTime = time;

    if (!modalOpen) {
      updateMovement(delta);
      updateNearbyObject();
    }

    animationFrame = requestAnimationFrame(loop);
  }

  function updateMovement(delta) {
    let dx = 0;
    let dy = 0;

    if (keys.has("w") || keys.has("arrowup")) dy -= 1;
    if (keys.has("s") || keys.has("arrowdown")) dy += 1;
    if (keys.has("a") || keys.has("arrowleft")) dx -= 1;
    if (keys.has("d") || keys.has("arrowright")) dx += 1;

    if (dx === 0 && dy === 0) {
      return;
    }

    const length = Math.hypot(dx, dy) || 1;
    dx = (dx / length) * MOVE_SPEED * delta;
    dy = (dy / length) * MOVE_SPEED * delta;

    tryMove(dx, 0);
    tryMove(0, dy);
    updatePlayerVisual();
  }

  function tryMove(dx, dy) {
    const nextX = clamp(player.x + dx, PLAYER_WIDTH / 2 + 10, WORLD_WIDTH - PLAYER_WIDTH / 2 - 10);
    const nextY = clamp(player.y + dy, PLAYER_HEIGHT / 2 + 38, WORLD_HEIGHT - PLAYER_HEIGHT / 2 - 10);

    const box = playerBox(nextX, nextY);
    const scene = scenes[activeSceneId];
    const collision = scene.objects.some(function (object) {
      return object.solid && rectanglesOverlap(box, object);
    });

    if (!collision) {
      player.x = nextX;
      player.y = nextY;
    }
  }

  function playerBox(x, y) {
    return {
      x: x - PLAYER_WIDTH / 2,
      y: y - PLAYER_HEIGHT / 2,
      w: PLAYER_WIDTH,
      h: PLAYER_HEIGHT
    };
  }

  function rectanglesOverlap(a, b) {
    return a.x < b.x + b.w &&
      a.x + a.w > b.x &&
      a.y < b.y + b.h &&
      a.y + a.h > b.y;
  }

  function updateNearbyObject() {
    const scene = scenes[activeSceneId];
    let nearest = null;
    let nearestDistance = Infinity;

    scene.objects.forEach(function (object) {
      if (!object.text && !object.action) {
        return;
      }

      const centerX = object.x + object.w / 2;
      const centerY = object.y + object.h / 2;
      const distance = Math.hypot(player.x - centerX, player.y - centerY);

      if (distance < INTERACTION_RANGE + Math.max(object.w, object.h) * 0.25 && distance < nearestDistance) {
        nearest = object;
        nearestDistance = distance;
      }
    });

    if (nearest === currentNearbyObject) {
      return;
    }

    currentNearbyObject = nearest;
    stage.querySelectorAll(".scene-object.is-near").forEach(function (element) {
      element.classList.remove("is-near");
    });

    if (!nearest) {
      interactionPrompt.classList.remove("is-visible");
      return;
    }

    const element = stage.querySelector('[data-object-id="' + nearest.id + '"]');
    if (element) {
      element.classList.add("is-near");
    }

    interactionPrompt.textContent = "E — " + nearest.label;
    interactionPrompt.classList.add("is-visible");
  }

  function interact() {
    if (!running || modalOpen || !currentNearbyObject) {
      return;
    }

    const object = currentNearbyObject;

    if (object.action === "wardrobe") {
      openWardrobe();
      return;
    }

    if (object.action === "bedroom-exit") {
      if (!player.changedClothes) {
        showDialogue("Nicolás", "Debería cambiarme antes de salir de la habitación.");
        return;
      }

      changeScene("upstairs-hall", 105, 270);
      return;
    }

    if (object.action === "return-bedroom") {
      changeScene("bedroom", 835, 270);
      return;
    }

    if (object.action === "enter-bathroom") {
      changeScene("bathroom", 120, 275);
      return;
    }

    if (object.action === "bathroom-exit") {
      changeScene("upstairs-hall", 505, 175);
      return;
    }

    if (object.action === "enter-parents-room") {
      changeScene("parents-room", 120, 275);
      return;
    }

    if (object.action === "parents-room-exit") {
      changeScene("upstairs-hall", 265, 175);
      return;
    }

    if (object.action === "go-downstairs") {
      changeScene("downstairs-foyer", 790, 330);
      return;
    }

    if (object.action === "go-upstairs") {
      changeScene("upstairs-hall", 705, 345);
      return;
    }

    if (object.text) {
      showDialogue("Nicolás", object.text);
    }
  }

  function renderScene() {
    stage.querySelectorAll(".scene-object").forEach(function (element) {
      element.remove();
    });

    const scene = scenes[activeSceneId];
    sceneTitle.textContent = scene.title;

    scene.objects.forEach(function (object) {
      const element = document.createElement("div");
      element.className = "scene-object";
      element.dataset.objectId = object.id;
      element.dataset.type = object.kind || "interactive";
      element.textContent = object.label;
      element.style.left = percent(object.x, WORLD_WIDTH);
      element.style.top = percent(object.y, WORLD_HEIGHT);
      element.style.width = percent(object.w, WORLD_WIDTH);
      element.style.height = percent(object.h, WORLD_HEIGHT);
      stage.insertBefore(element, playerElement);
    });

    currentNearbyObject = null;
    interactionPrompt.classList.remove("is-visible");
    updateHud();
  }

  function changeScene(sceneId, x, y) {
    if (!scenes[sceneId]) {
      return;
    }

    activeSceneId = sceneId;
    player.x = x;
    player.y = y;
    renderScene();
    updatePlayerVisual();
    persistState();
  }

  function updatePlayerVisual() {
    playerElement.style.left = percent(player.x, WORLD_WIDTH);
    playerElement.style.top = percent(player.y, WORLD_HEIGHT);
    playerElement.dataset.clothes = player.changedClothes ? "ropa casual" : "pijama";
    playerElement.textContent = "NICO";
  }

  function updateHud() {
    hudSlot.textContent = activeSlot === null ? "" : "Partida " + (activeSlot + 1);

    if (!player.changedClothes) {
      hudObjective.textContent = "Objetivo: cambiarse de ropa";
      return;
    }

    if (activeSceneId === "bedroom") {
      hudObjective.textContent = "Objetivo: salir de la habitación";
      return;
    }

    if (activeSceneId === "upstairs-hall" || activeSceneId === "bathroom" || activeSceneId === "parents-room") {
      hudObjective.textContent = "Objetivo: bajar con mis padres";
      return;
    }

    if (activeSceneId === "downstairs-foyer") {
      hudObjective.textContent = "Objetivo: ir a la cocina y desayunar";
      return;
    }

    hudObjective.textContent = "Prólogo";
  }

  function openWardrobe() {
    modalOpen = true;
    wardrobePanel.hidden = false;
    wardrobePajamas.disabled = player.changedClothes;
    wardrobeCasual.disabled = player.changedClothes;
    wardrobeClose.focus();
  }

  function closeWardrobe() {
    wardrobePanel.hidden = true;
    modalOpen = false;
  }

  function chooseCasualClothes() {
    if (player.changedClothes) {
      return;
    }

    player.changedClothes = true;
    updatePlayerVisual();
    updateHud();
    persistState();
    closeWardrobe();
    showDialogue("Nicolás", "Listo. Ahora sí puedo salir de la habitación.");
  }

  function showDialogue(speaker, text) {
    modalOpen = true;
    dialogueSpeaker.textContent = speaker;
    dialogueText.textContent = text;
    dialogueBox.hidden = false;
  }

  function closeDialogue() {
    dialogueBox.hidden = true;
    modalOpen = false;
  }

  function showIntroStep() {
    const step = introSteps[introStep];
    if (!step) {
      finishIntro();
      return;
    }

    introLabel.textContent = step.label;
    introTitle.textContent = step.title;
    introText.textContent = step.text;
    introOverlay.hidden = false;
    introContinue.focus();
  }

  function advanceIntro() {
    introStep += 1;
    if (introStep >= introSteps.length) {
      finishIntro();
    } else {
      showIntroStep();
    }
  }

  function finishIntro() {
    introOverlay.hidden = true;
    modalOpen = false;
    persistState({ introComplete: true });
    showDialogue("RUMBO", "WASD — Moverse · E — Interactuar");
  }

  function persistState(extra) {
    if (activeSlot === null || typeof storage.updateSave !== "function") {
      return;
    }

    const save = storage.getSave(activeSlot);
    const oldState = save && save.prologueState ? save.prologueState : {};
    const state = Object.assign({}, oldState, {
      scene: activeSceneId,
      x: Math.round(player.x),
      y: Math.round(player.y),
      changedClothes: player.changedClothes
    }, extra || {});

    storage.updateSave(activeSlot, {
      location: scenes[activeSceneId].title,
      prologueState: state
    });
  }

  function percent(value, total) {
    return (value / total * 100).toFixed(4) + "%";
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  document.addEventListener("keydown", function (event) {
    if (!running) {
      return;
    }

    const key = event.key.toLowerCase();

    if (["w", "a", "s", "d", "arrowup", "arrowleft", "arrowdown", "arrowright"].includes(key)) {
      if (!modalOpen) {
        event.preventDefault();
        keys.add(key);
      }
      return;
    }

    if (key === "e" || key === "enter") {
      if (!introOverlay.hidden) {
        event.preventDefault();
        advanceIntro();
        return;
      }

      if (!dialogueBox.hidden) {
        event.preventDefault();
        closeDialogue();
        return;
      }

      if (!wardrobePanel.hidden) {
        return;
      }

      event.preventDefault();
      interact();
    }
  });

  document.addEventListener("keyup", function (event) {
    keys.delete(event.key.toLowerCase());
  });

  window.addEventListener("blur", function () {
    keys.clear();
  });

  introContinue.addEventListener("click", advanceIntro);
  wardrobePajamas.addEventListener("click", function () {
    if (!player.changedClothes) {
      closeWardrobe();
      showDialogue("Nicolás", "Ya llevo la pijama. Necesito ponerme ropa casual antes de bajar.");
    }
  });
  wardrobeCasual.addEventListener("click", chooseCasualClothes);
  wardrobeClose.addEventListener("click", closeWardrobe);

  window.RumboPrologue = {
    start: start,
    stop: stop,
    isRunning: isRunning,
    persist: persistState
  };
})();