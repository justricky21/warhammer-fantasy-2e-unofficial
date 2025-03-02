export default class WFRP2EActor extends Actor {
  /**
   * Augment the basic actor data with additional dynamic data.
   */
  prepareData() {
    // Prepare data for the actor. Calling the super version of this executes
    // the following, in order: prepareBaseData(), prepareEmbeddedDocuments() (including active effects),
    // prepareDerivedData().
    super.prepareData();
  }

  /**
   * Prepare the actor's base data
   */
  prepareBaseData() {
    // Data modifications in this step happen before active effects have been applied
    const actorData = this;
    const systemData = actorData.system;

    // Make sure to use the correct path for attributes in V12
    if (this.type === "character") {
      // Initialize character data
    }
  }

  /**
   * Apply active effects then prepare derived data
   */
  prepareDerivedData() {
    const actorData = this;
    const systemData = actorData.system;

    // Calculate derived attributes here, for example:
    // - Wound modifiers based on Toughness
    // - Attack modifiers based on skills
    // etc.
  }

  /**
   * Roll an attribute test
   * @param {string} attributeName The name of the attribute to roll
   * @return {Promise<Roll>}      A Promise which resolves to the Roll instance
   */
  async rollAttribute(attributeName) {
    const attribute = this.system[attributeName];
    if (!attribute) return null;

    const roll = await new Roll("1d100").evaluate({ async: true });

    // Determine success/failure
    const isSuccess = roll.total <= attribute.value;
    const margin = Math.floor((attribute.value - roll.total) / 10);

    // Prepare chat data
    const messageData = {
      speaker: ChatMessage.getSpeaker({ actor: this }),
      flavor: `${this.name} makes a ${
        CONFIG.WFRP2E.attributes[attributeName] || attributeName
      } test.`,
      content: `
        <div class="wfrp2e-roll">
          <div class="roll-result ${isSuccess ? "success" : "failure"}">
            <span class="result-label">${
              isSuccess ? "Success" : "Failure"
            }</span>
            <span class="dice-total">${
              roll.total
            }</span> vs <span class="target-number">${attribute.value}</span>
          </div>
          <div class="roll-margin">
            Margin of ${isSuccess ? "Success" : "Failure"}: ${Math.abs(margin)}
          </div>
        </div>
      `,
    };

    // Create the chat message
    await ChatMessage.create(messageData);

    return roll;
  }
}
