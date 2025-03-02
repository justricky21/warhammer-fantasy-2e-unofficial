export default class WFRP2EItem extends Item {
  /**
   * Augment the basic Item data model with additional dynamic data.
   */
  prepareData() {
    // As with the actor's data, items are prepared by calling super.prepareData(),
    // and derivatives are now calculated in prepareDerivedData()
    super.prepareData();
  }

  /**
   * Prepare derived data for items
   */
  prepareDerivedData() {
    const itemData = this;
    const systemData = itemData.system;

    if (itemData.type === "trapping") {
      this._prepareTrappingData(systemData);
    } else if (itemData.type === "spell") {
      this._prepareSpellData(systemData);
    }
  }

  /**
   * Prepare trapping type specific data
   */
  _prepareTrappingData(systemData) {
    // Calculate total weight or other derived properties
  }

  /**
   * Prepare spell type specific data
   */
  _prepareSpellData(systemData) {
    // Calculate any spell-specific derivatives
  }
}
