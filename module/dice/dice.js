/**
 * A helper class for building and evaluating dice rolls for the WFRP2e system
 */

/**
 * Roll an attribute test
 * @param {number} target        The target number (attribute value)
 * @param {string} rollName      Name of the roll for the chat message
 * @return {Promise<Roll>}       A Promise which resolves to the Roll instance
 */
export async function rollAttributeTest(target, rollName) {
  // Create a roll against the target number
  const roll = await new Roll("1d100").evaluate({ async: true });

  // Determine success/failure
  const isSuccess = roll.total <= target;
  const margin = Math.floor((target - roll.total) / 10);

  // Create the chat message
  const messageData = {
    flavor: rollName,
    speaker: ChatMessage.getSpeaker(),
    content: `
      <div class="wfrp2e-roll">
        <div class="roll-result ${isSuccess ? "success" : "failure"}">
          <span class="result-label">${isSuccess ? "Success" : "Failure"}</span>
          <span class="dice-total">${
            roll.total
          }</span> vs <span class="target-number">${target}</span>
        </div>
        <div class="roll-margin">
          Margin of ${isSuccess ? "Success" : "Failure"}: ${Math.abs(margin)}
        </div>
      </div>
    `,
  };

  await ChatMessage.create(messageData);

  return roll;
}
