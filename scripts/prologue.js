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
          text: "La habitación de mis padres. Su interior será uno de los siguientes espacios del prólogo."
        },
        {
          id: "bathroom-door",
          label: "Baño",
          x: 455, y: 58, w: 105, h: 54,
          solid: true,
          kind: "door",
          text: "El baño del segundo piso. Aquí estarán el espejo, lavabo, cepillo, ducha y demás interacciones."
        },
        {
          id: "family-photos",
          label: "Fotos familiares",
          x: 290, y: 415, w: 175, h: 48,
          solid: true,
          kind: "interactive",
          text: "Fotos familiares. Más adelante cada una podrá tener su propia vista cercana."
        },
        {
          id: "clock",
          label: "Reloj",
          x: 600, y: 402, w: 58, h: 58,
          solid: true,
          kind: "interactive",
          text: "Un reloj de pared. Cuando funcione el sistema de tiempo, sus agujas cambiarán con la hora del juego."
        },
        {
          id: "stairs",
          label: "Escaleras",
          x: 760, y: 290, w: 150, h: 150,
          solid: true,
          kind: "door",
          text: "Las escaleras bajan al recibidor. Ese será el siguiente bloque que construiremos en esta misma rama."
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
    hudObjective.textContent = player.changedClothes
      ? "Objetivo: salir de la habitación"
      : "Objetivo: cambiarse de ropa";
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
