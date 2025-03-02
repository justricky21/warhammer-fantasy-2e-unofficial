export default class WFRP2ECharacterSheet extends ActorSheet {
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["warhammer-fantasy-2e", "sheet", "actor"],
      template:
        "systems/warhammer-fantasy-2e-unofficial/templates/actor/character-sheet.hbs",
      width: 650,
      height: 720,
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "stats",
        },
      ],
    });
  }

  /** @override */
  getData() {
    // Basic data
    const context = super.getData();

    // Add the actor's data to context.data for easier access, as well as flags
    const actorData = this.actor.toObject(false);

    // Add the actor's data to context.data for easier access
    context.system = actorData.system;
    context.flags = actorData.flags;

    // Prepare character data and items
    if (actorData.type == "character") {
      this._prepareCharacterItems(context);
    }

    // Add roll data for TinyMCE editors
    context.rollData = context.actor.getRollData();

    return context;
  }

  /**
   * Organize and classify Items for Character sheets.
   *
   * @param {Object} actorData The actor to prepare.
   *
   * @return {undefined}
   */
  _prepareCharacterItems(context) {
    // Initialize containers
    const talents = [];
    const abilities = [];
    const trappings = [];
    const spells = [];

    // Organize items by category
    for (let i of context.items) {
      // Append to appropriate arrays
      if (i.type === "talent") {
        talents.push(i);
      } else if (i.type === "ability") {
        abilities.push(i);
      } else if (i.type === "trapping") {
        trappings.push(i);
      } else if (i.type === "spell") {
        spells.push(i);
      }
    }

    // Assign to context
    context.talents = talents;
    context.abilities = abilities;
    context.trappings = trappings;
    context.spells = spells;
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;

    // Add Inventory Item
    html.find(".item-create").click(this._onItemCreate.bind(this));

    // Update Inventory Item
    html.find(".item-edit").click((ev) => {
      const li = $(ev.currentTarget).parents(".item");
      const item = this.actor.items.get(li.data("itemId"));
      item.sheet.render(true);
    });

    // Delete Inventory Item
    html.find(".item-delete").click((ev) => {
      const li = $(ev.currentTarget).parents(".item");
      const itemId = li.data("itemId");
      this.actor.deleteEmbeddedDocuments("Item", [itemId]);
      li.slideUp(200, () => this.render(false));
    });

    // Attribute Rolls
    html.find(".roll-button").click(this._onRollAttribute.bind(this));

    // Other listeners can be added here
  }

  /**
   * Handle attribute rolls
   * @param {Event} event The originating click event
   * @private
   */
  _onRollAttribute(event) {
    event.preventDefault();
    const button = event.currentTarget;
    const attribute = button.dataset.roll;

    this.actor.rollAttribute(attribute);
  }

  /**
   * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset
   * @param {Event} event   The originating click event
   * @private
   */
  _onItemCreate(event) {
    event.preventDefault();
    const header = event.currentTarget;
    // Get the type of item to create.
    const type = header.dataset.type;
    // Initialize a default name.
    const name = `New ${type.capitalize()}`;
    // Prepare the item object.
    const itemData = {
      name: name,
      type: type,
      system: {},
    };
    // Create the item
    return this.actor.createEmbeddedDocuments("Item", [itemData]);
  }
}
