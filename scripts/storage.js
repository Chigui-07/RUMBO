(function () {
  "use strict";

  const SAVE_KEY = "rumbo_saves_v1";
  const SETTINGS_KEY = "rumbo_settings_v1";
  const LAST_PLAYED_KEY = "rumbo_last_played_slot";
  const SLOT_COUNT = 3;

  function readJson(key, fallback) {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      console.warn("RUMBO: no se pudo leer localStorage", error);
      return fallback;
    }
  }

  function writeJson(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn("RUMBO: no se pudo escribir localStorage", error);
      return false;
    }
  }

  function getAllSaves() {
    const saves = readJson(SAVE_KEY, []);
    return Array.from({ length: SLOT_COUNT }, function (_, index) {
      return saves[index] || null;
    });
  }

  function saveAll(saves) {
    return writeJson(SAVE_KEY, saves.slice(0, SLOT_COUNT));
  }

  function createSave(slotIndex) {
    const saves = getAllSaves();
    const now = new Date().toISOString();

    const save = {
      slot: slotIndex,
      createdAt: now,
      lastPlayedAt: now,
      day: 1,
      location: "Inicio del prólogo",
      playTimeSeconds: 0,
      version: "0.0.1"
    };

    saves[slotIndex] = save;
    saveAll(saves);
    setLastPlayedSlot(slotIndex);
    return save;
  }

  function overwriteSave(slotIndex) {
    return createSave(slotIndex);
  }

  function getSave(slotIndex) {
    const saves = getAllSaves();
    return saves[slotIndex] || null;
  }

  function touchSave(slotIndex) {
    const saves = getAllSaves();
    const save = saves[slotIndex];
    if (!save) {
      return null;
    }

    save.lastPlayedAt = new Date().toISOString();
    saves[slotIndex] = save;
    saveAll(saves);
    setLastPlayedSlot(slotIndex);
    return save;
  }

  function hasAnySave() {
    return getAllSaves().some(Boolean);
  }

  function setLastPlayedSlot(slotIndex) {
    try {
      window.localStorage.setItem(LAST_PLAYED_KEY, String(slotIndex));
    } catch (error) {
      console.warn("RUMBO: no se pudo guardar la última partida", error);
    }
  }

  function getLastPlayedSlot() {
    const raw = window.localStorage.getItem(LAST_PLAYED_KEY);
    if (raw === null) {
      return null;
    }

    const slot = Number(raw);
    if (!Number.isInteger(slot) || slot < 0 || slot >= SLOT_COUNT) {
      return null;
    }

    return getSave(slot) ? slot : null;
  }

  function getLastPlayedSave() {
    const slot = getLastPlayedSlot();
    return slot === null ? null : getSave(slot);
  }

  function getSettings() {
    return Object.assign(
      {
        masterVolume: 80,
        uiScale: 100,
        reduceMotion: false
      },
      readJson(SETTINGS_KEY, {})
    );
  }

  function saveSettings(settings) {
    return writeJson(SETTINGS_KEY, settings);
  }

  window.RumboStorage = {
    SLOT_COUNT: SLOT_COUNT,
    getAllSaves: getAllSaves,
    getSave: getSave,
    createSave: createSave,
    overwriteSave: overwriteSave,
    touchSave: touchSave,
    hasAnySave: hasAnySave,
    getLastPlayedSlot: getLastPlayedSlot,
    getLastPlayedSave: getLastPlayedSave,
    getSettings: getSettings,
    saveSettings: saveSettings
  };
})();
