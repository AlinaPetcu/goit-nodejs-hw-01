// Importăm funcțiile din contacts.js
const contacts = require('./contacts');

// Importăm yargs pentru a parsa argumentele din linia de comandă
const argv = require("yargs").argv;

// Funcția care va invoca metodele din contacts.js în funcție de acțiune
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      // Afișează lista de contacte
      const allContacts = await contacts.listContacts();
      console.log(allContacts);
      break;

    case "get":
      // Obține un contact după ID
      const contact = await contacts.getContactById(id);
      if (contact) {
        console.log(contact);
      } else {
        console.log(`Contact with id=${id} not found.`);
      }
      break;

    case "add":
      // Adaugă un nou contact
      if (name && email && phone) {
        const newContact = await contacts.addContact(name, email, phone);
        console.log('Contact added:', newContact);
      } else {
        console.log('Please provide name, email, and phone to add a new contact.');
      }
      break;

    case "remove":
      // Elimină un contact după ID
      const removeResult = await contacts.removeContact(id);
      if (removeResult) {
        console.log(`Contact with id=${id} removed.`);
      } else {
        console.log(`Contact with id=${id} not found.`);
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

// Apelăm funcția invokeAction cu argumentele primite din linia de comandă
invokeAction(argv);
