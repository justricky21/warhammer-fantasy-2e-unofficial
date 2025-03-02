// Import necessary modules
import { WFRP2E } from "./config.js";
import WFRP2EActor from "./actor/actor.js";
import WFRP2ECharacterSheet from "./actor/character-sheet.js";
import WFRP2EItem from "./item/item.js";
import * as Dice from "./dice/dice.js";
import { preloadHandlebarsTemplates } from "./helpers/templates.js";

/* -------------------------------------------- */
/*  Foundry VTT Initialization                  */
/* -------------------------------------------- */

Hooks.once("init", async function () {
  console.log(
    "WFRP2E | Initializing Warhammer Fantasy Roleplay 2nd Edition System"
  );

  // Define custom Document classes
  CONFIG.Actor.documentClass = WFRP2EActor;
  CONFIG.Item.documentClass = WFRP2EItem;

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet(
    "warhammer-fantasy-2e-unofficial",
    WFRP2ECharacterSheet,
    {
      types: ["character"],
      makeDefault: true,
    }
  );

  // Register custom system settings
  game.settings.register(
    "warhammer-fantasy-2e-unofficial",
    "systemMigrationVersion",
    {
      name: "System Migration Version",
      scope: "world",
      config: false,
      type: String,
      default: "",
    }
  );

  // Register system settings and flags here

  // Preload Handlebars templates
  await preloadHandlebarsTemplates();

  // Register Handlebars helpers
  Handlebars.registerHelper("concat", function () {
    let outStr = "";
    for (let arg in arguments) {
      if (typeof arguments[arg] != "object") {
        outStr += arguments[arg];
      }
    }
    return outStr;
  });
});

// Set up hooks
Hooks.once("ready", function () {
  // Migration might be needed when updating system
  // migrateWorld();
});
