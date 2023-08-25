const MyError = require('../utils/myError');

class Manager {
  constructor(service) {
    this.service = service;
  }

  //* RETRIEVE PRODUCTS
  //* ALL
  getAll = async () => {
    const items = await this.service.get();
    if (items.length) {
      return items;
    } else {
      throw new MyError(200, 'Empty', 'There are no items!');
    }
  };

  //*BY ID
  getById = async (id) => {
    const items = await this.getAll();
    const foundItem = await items.find((item) => item.id === id);
    if (foundItem) {
      const foundIndex = await items.findIndex((item) => item.id === id);
      return { index: foundIndex, item: foundItem };
    } else {
      throw new MyError(
        404,
        'Not Found',
        `Unable to find item with {id: ${id}}`
      );
    }
  };

  //* ADD PRODUCTS
  //* CHECK FOR REQUIRED FIELDS
  validateRequired = async (newItem, requiredFields) => {
    for (const field of requiredFields) {
      if (!newItem[field]) {
        throw new MyError(400, 'Required', `Missing required field: ${field}`);
      }
    }
  };

  //* CHECK FOR DUPLICATED
  validateDuplicated = async (newItem, duplicateValidations) => {
    const items = await this.getAll();
    for (const key of duplicateValidations) {
      const duplicated = items.some((item) => item[key] === newItem[key]);
      if (duplicated) {
        throw new MyError(
          400,
          'Duplicated',
          `The item with {${key}: ${newItem[key]}} already exists!`
        );
      }
    }
  };

  //* VALIDATE UPDATE
  validateUpdate = async (index, update) => {
    const items = await this.getAll();
    const item = items[index];
    // console.log(index);

    if (Object.keys(update).length > 0) {
      const updates = [];
      for (const key of Object.keys(update)) {
        updates.push(item[key] === update[key]);
      }
      if (!updates.includes(false)) {
        throw new MyError(
          200,
          'No Updates',
          `No new updates, item did not have any changes.`
        );
      }
    } else {
      throw new MyError(400, 'Empty', `Cannot read from empty update`);
    }
  };

  //* GENERATE ID
  generateId = async () => {
    const items = await this.getAll();
    let newId = 1;
    if (items.length) {
      const lastId = items[items.length - 1].id;
      newId += lastId;
    }
    return newId;
  };
}

module.exports = Manager;
