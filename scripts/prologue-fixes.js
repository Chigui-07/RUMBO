(function () {
  "use strict";

  const storage = window.RumboStorage;
  const prologue = window.RumboPrologue;

  if (!storage || !prologue) {
    return;
  }

  const stage = document.getElementById("prologue-stage");
  const playerElement = document.getElementById("prologue-player");
  const sceneTitle = document.getElementById("prologue-scene-title");

  if (!stage || !playerElement || !sceneTitle) {
    return;
  }

  const SAFE_SPAWNS = {
    "Habitación de Nicolás": { scene: "bedroom", x: 480, y: 285 },
    "Corredor · Segundo piso": { scene: "upstairs-hall", x: 105, y: 270 },
    "Baño · Segundo piso": { scene: "bathroom", x: 120, y: 275 },
    "Habitación de los padres": { scene: "parents-room", x: 120, y: 275 },
    "Recibidor · Planta baja": { scene: "downstairs-foyer", x: 700, y: 470 },
    "Sala · Casa de Nicolás": { scene: "living-room", x: 120, y: 275 },
    "Cocina / comedor · Casa de Nicolás": { scene: "kitchen-dining", x: 120, y: 275 }
  };

  const originalStart = prologue.start.bind(prologue);
  let activeSlot = null;
  let recovering = false;
  let lastSceneChange = 0;

  prologue.start = function (slotIndex) {
    activeSlot = slotIndex;
    originalStart(slotIndex);
    lastSceneChange = Date.now();
    window.setTimeout(checkSpawnCollision, 60);
  };

  function rectanglesOverlap(a, b) {
    return a.left < b.right &&
      a.right > b.left &&
      a.top < b.bottom &&
      a.bottom > b.top;
  }

  function checkSpawnCollision() {
    if (recovering || activeSlot === null || !prologue.isRunning()) {
      return;
    }

    const playerRect = playerElement.getBoundingClientRect();
    const objects = Array.from(stage.querySelectorAll(".scene-object"));
    const trapped = objects.some(function (object) {
      return rectanglesOverlap(playerRect, object.getBoundingClientRect());
    });

    if (trapped) {
      recoverCurrentScene();
    }
  }

  function recoverCurrentScene() {
    const safe = SAFE_SPAWNS[sceneTitle.textContent.trim()];
    if (!safe || activeSlot === null || recovering) {
      return;
    }

    recovering = true;
    prologue.stop();

    const save = storage.getSave(activeSlot);
    const oldState = save && save.prologueState ? save.prologueState : {};

    storage.updateSave(activeSlot, {
      location: sceneTitle.textContent.trim(),
      prologueState: Object.assign({}, oldState, {
        scene: safe.scene,
        x: safe.x,
        y: safe.y
      })
    });

    originalStart(activeSlot);
    lastSceneChange = Date.now();

    window.setTimeout(function () {
      recovering = false;
    }, 120);
  }

  const observer = new MutationObserver(function () {
    lastSceneChange = Date.now();
    window.setTimeout(checkSpawnCollision, 40);
  });

  observer.observe(stage, {
    childList: true,
    subtree: true,
    characterData: true
  });

  document.addEventListener("keydown", function (event) {
    const key = event.key.toLowerCase();
    if (!["w", "a", "s", "d", "arrowup", "arrowleft", "arrowdown", "arrowright"].includes(key)) {
      return;
    }

    if (!prologue.isRunning() || recovering || Date.now() - lastSceneChange > 3000) {
      return;
    }

    const beforeLeft = playerElement.style.left;
    const beforeTop = playerElement.style.top;

    window.setTimeout(function () {
      if (playerElement.style.left === beforeLeft && playerElement.style.top === beforeTop) {
        checkSpawnCollision();
      }
    }, 180);
  });
})();
