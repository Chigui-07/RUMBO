(function () {
  "use strict";

  const VERSION = "0.0.1";
  const storage = window.RumboStorage;

  const screens = Array.from(document.querySelectorAll(".screen"));
  const mainMenu = document.getElementById("main-menu");
  const slotScreen = document.getElementById("slot-screen");
  const optionsScreen = document.getElementById("options-screen");
  const creditsScreen = document.getElementById("credits-screen");
  const gameScreen = document.getElementById("game-screen");

  const continueButton = document.querySelector('[data-action="continue"]');
  const saveSlotsContainer = document.getElementById("save-slots");
  const slotTitle = document.getElementById("slot-title");
  const slotDescription = document.getElementById("slot-description");

  const fullscreenButton = document.getElementById("fullscreen-button");
  const masterVolume = document.getElementById("master-volume");
  const uiScale = document.getElementById("ui-scale");
  const reduceMotion = document.getElementById("reduce-motion");

  const dialogBackdrop = document.getElementById("confirm-dialog");
  const dialogTitle = document.getElementById("dialog-title");
  const dialogMessage = document.getElementById("dialog-message");
  const dialogCancel = document.getElementById("dialog-cancel");
  const dialogConfirm = document.getElementById("dialog-confirm");
  const toast = document.getElementById("toast");
  const versionLabel = document.getElementById("version-label");

  let slotMode = "load";
  let confirmAction = null;
  let toastTimer = null;

  function showScreen(screen) {
    screens.forEach(function (item) {
      item.classList.toggle("screen--active", item === screen);
    });

    window.setTimeout(function () {
      focusFirstAvailable(screen);
    }, 0);
  }

  function showMainMenu() {
    if (window.RumboPrologue && window.RumboPrologue.isRunning()) {
      window.RumboPrologue.stop();
    }

    refreshMainMenu();
    showScreen(mainMenu);
  }

  function refreshMainMenu() {
    continueButton.disabled = !storage.hasAnySave();
    versionLabel.textContent = "v" + VERSION;
  }

  function openSlots(mode) {
    slotMode = mode;

    if (mode === "new") {
      slotTitle.textContent = "Nueva partida";
      slotDescription.textContent = "Elige uno de los tres espacios para comenzar desde el prólogo.";
    } else {
      slotTitle.textContent = "Cargar partida";
      slotDescription.textContent = "Selecciona una partida existente.";
    }

    renderSaveSlots();
    showScreen(slotScreen);
  }

  function renderSaveSlots() {
    const saves = storage.getAllSaves();
    saveSlotsContainer.replaceChildren();

    saves.forEach(function (save, index) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "save-slot";
      button.dataset.slot = String(index);

      if (slotMode === "load" && !save) {
        button.disabled = true;
      }

      const number = document.createElement("span");
      number.className = "save-slot__number";
      number.textContent = "ESPACIO " + (index + 1);

      const info = document.createElement("span");
      const title = document.createElement("span");
      title.className = "save-slot__title";

      const meta = document.createElement("span");
      meta.className = "save-slot__meta";

      const state = document.createElement("span");
      state.className = "save-slot__state";

      if (save) {
        title.textContent = save.location || "Partida de RUMBO";
        meta.textContent = "Día " + (save.day || 1) + " · " + formatDate(save.lastPlayedAt);
        state.textContent = slotMode === "new" ? "Ocupado" : "Cargar";
      } else {
        title.textContent = "Vacío";
        meta.textContent = "Sin datos de partida";
        state.textContent = slotMode === "new" ? "Crear" : "—";
      }

      info.append(title, meta);
      button.append(number, info, state);
      button.addEventListener("click", function () {
        handleSlotSelection(index, save);
      });

      saveSlotsContainer.appendChild(button);
    });
  }

  function handleSlotSelection(index, save) {
    if (slotMode === "load") {
      if (save) {
        loadSave(index);
      }
      return;
    }

    if (!save) {
      startNewGame(index);
      return;
    }

    openConfirm(
      "Reemplazar partida",
      "El espacio " + (index + 1) + " ya contiene una partida. ¿Quieres comenzar de nuevo y reemplazarla?",
      function () {
        storage.overwriteSave(index);
        enterGame(index);
      }
    );
  }

  function startNewGame(index) {
    storage.createSave(index);
    enterGame(index);
  }

  function loadSave(index) {
    storage.touchSave(index);
    enterGame(index);
  }

  function continueLastGame() {
    const slot = storage.getLastPlayedSlot();

    if (slot === null) {
      refreshMainMenu();
      showToast("Todavía no existe una partida para continuar.");
      return;
    }

    loadSave(slot);
  }

  function enterGame(index) {
    const save = storage.touchSave(index);
    if (!save) {
      showToast("No se pudo abrir la partida.");
      return;
    }

    showScreen(gameScreen);

    if (window.RumboPrologue) {
      window.RumboPrologue.start(index);
    } else {
      showToast("No se pudo iniciar el prólogo.");
    }
  }

  function formatDate(isoDate) {
    if (!isoDate) {
      return "Sin fecha";
    }

    const date = new Date(isoDate);
    if (Number.isNaN(date.getTime())) {
      return "Sin fecha";
    }

    return new Intl.DateTimeFormat("es", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }).format(date);
  }

  function openOptions() {
    const settings = storage.getSettings();
    masterVolume.value = String(settings.masterVolume);
    uiScale.value = String(settings.uiScale);
    reduceMotion.checked = Boolean(settings.reduceMotion);
    applySettings(settings);
    showScreen(optionsScreen);
  }

  function saveCurrentSettings() {
    const settings = {
      masterVolume: Number(masterVolume.value),
      uiScale: Number(uiScale.value),
      reduceMotion: reduceMotion.checked
    };

    storage.saveSettings(settings);
    applySettings(settings);
  }

  function applySettings(settings) {
    const normalizedScale = Math.min(115, Math.max(90, Number(settings.uiScale) || 100));
    document.documentElement.style.setProperty("--ui-scale", String(normalizedScale / 100));
    document.body.classList.toggle("reduce-motion", Boolean(settings.reduceMotion));
  }

  async function toggleFullscreen() {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.warn("RUMBO: pantalla completa no disponible", error);
      showToast("El navegador no permitió cambiar a pantalla completa.");
    }
  }

  function openConfirm(title, message, action) {
    dialogTitle.textContent = title;
    dialogMessage.textContent = message;
    confirmAction = action;
    dialogBackdrop.hidden = false;
    dialogCancel.focus();
  }

  function closeConfirm() {
    dialogBackdrop.hidden = true;
    confirmAction = null;
  }

  function confirmDialog() {
    const action = confirmAction;
    closeConfirm();
    if (typeof action === "function") {
      action();
    }
  }

  function exitWebVersion() {
    openConfirm(
      "Salir de RUMBO",
      "¿Quieres cerrar RUMBO? En la versión web el navegador puede impedir que el juego cierre la pestaña por sí mismo.",
      function () {
        window.close();
        window.setTimeout(function () {
          showToast("Puedes cerrar esta pestaña para salir de la versión web.");
        }, 120);
      }
    );
  }

  function showToast(message) {
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("is-visible");

    toastTimer = window.setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 2600);
  }

  function getActiveScreen() {
    return screens.find(function (screen) {
      return screen.classList.contains("screen--active");
    }) || mainMenu;
  }

  function getFocusable(screen) {
    return Array.from(
      screen.querySelectorAll("button:not(:disabled), input:not(:disabled)")
    ).filter(function (element) {
      return element.offsetParent !== null;
    });
  }

  function focusFirstAvailable(screen) {
    const focusable = getFocusable(screen);
    if (focusable.length > 0) {
      focusable[0].focus({ preventScroll: true });
    }
  }

  function moveFocus(direction) {
    if (!dialogBackdrop.hidden) {
      const dialogButtons = [dialogCancel, dialogConfirm];
      const current = dialogButtons.indexOf(document.activeElement);
      const next = current === -1
        ? 0
        : (current + direction + dialogButtons.length) % dialogButtons.length;
      dialogButtons[next].focus();
      return;
    }

    const screen = getActiveScreen();
    const focusable = getFocusable(screen).filter(function (element) {
      return element.type !== "range" && element.type !== "checkbox";
    });

    if (focusable.length === 0) {
      return;
    }

    const current = focusable.indexOf(document.activeElement);
    const next = current === -1
      ? 0
      : (current + direction + focusable.length) % focusable.length;

    focusable[next].focus({ preventScroll: true });
  }

  function handleKeyboard(event) {
    const key = event.key.toLowerCase();
    const activeScreen = getActiveScreen();

    if (activeScreen === gameScreen) {
      if (key === "escape") {
        event.preventDefault();
        showMainMenu();
      }
      return;
    }

    if (key === "arrowdown" || key === "s") {
      if (document.activeElement && document.activeElement.type === "range") {
        return;
      }
      event.preventDefault();
      moveFocus(1);
      return;
    }

    if (key === "arrowup" || key === "w") {
      if (document.activeElement && document.activeElement.type === "range") {
        return;
      }
      event.preventDefault();
      moveFocus(-1);
      return;
    }

    if (key === "e") {
      const active = document.activeElement;
      if (active && active.tagName === "BUTTON" && !active.disabled) {
        event.preventDefault();
        active.click();
      }
      return;
    }

    if (key === "escape") {
      event.preventDefault();

      if (!dialogBackdrop.hidden) {
        closeConfirm();
        return;
      }

      if (activeScreen !== mainMenu) {
        showMainMenu();
      }
    }
  }

  document.addEventListener("click", function (event) {
    const actionButton = event.target.closest("[data-action]");
    if (!actionButton) {
      return;
    }

    const action = actionButton.dataset.action;

    if (action === "continue") {
      continueLastGame();
    } else if (action === "new-game") {
      openSlots("new");
    } else if (action === "load-game") {
      openSlots("load");
    } else if (action === "options") {
      openOptions();
    } else if (action === "credits") {
      showScreen(creditsScreen);
    } else if (action === "exit") {
      exitWebVersion();
    } else if (action === "back-main") {
      showMainMenu();
    }
  });

  masterVolume.addEventListener("input", saveCurrentSettings);
  uiScale.addEventListener("input", saveCurrentSettings);
  reduceMotion.addEventListener("change", saveCurrentSettings);
  fullscreenButton.addEventListener("click", toggleFullscreen);

  dialogCancel.addEventListener("click", closeConfirm);
  dialogConfirm.addEventListener("click", confirmDialog);
  dialogBackdrop.addEventListener("click", function (event) {
    if (event.target === dialogBackdrop) {
      closeConfirm();
    }
  });

  document.addEventListener("keydown", handleKeyboard);

  const initialSettings = storage.getSettings();
  applySettings(initialSettings);
  refreshMainMenu();
  focusFirstAvailable(mainMenu);
})();
