const db = require('./db');
const { v4: uuidv4 } = require('uuid');
const normolizeID = require('../utiles/normolize');

const listContacts = async () => {
  return await db.value();
};

const getContactById = async (contactId) => {
  const id = normolizeID(contactId);
  return await db.find({ id }).value();
};

const removeContact = async (contactId) => {
  const id = normolizeID(contactId);

  const [removedContact] = await db.remove({ id }).write();
  return removedContact;
};

const addContact = async (body) => {
  const id = uuidv4();
  const newContact = {
    id,
    ...body,
  };
  await db.push(newContact).write();
  return newContact;
};

const updateContact = async (contactId, body) => {
  const id = normolizeID(contactId);
  const modifiedContact = await db.find({ id }).assign(body).value();
  db.write();
  return modifiedContact.id ? modifiedContact : null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
