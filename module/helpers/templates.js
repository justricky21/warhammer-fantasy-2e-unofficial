/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 */
export const preloadHandlebarsTemplates = async function () {
  // Define template paths to load
  const templatePaths = [
    // Actor Sheet Partials
    "systems/warhammer-fantasy-2e-unofficial/templates/actor/character-sheet.hbs",

    // Add more templates as needed
  ];

  // Load the template parts
  return loadTemplates(templatePaths);
};
