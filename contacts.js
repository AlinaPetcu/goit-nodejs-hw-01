const fs = require('fs').promises;
const path = require('path');

// Declara variabila contactsPath și atribuie-i calea către fișierul contacts.json
const contactsPath = path.join(__dirname, 'db','contacts.json');

// Funcția pentru a lista toate contactele
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(data);  // Transformăm stringul JSON în obiecte
  } catch (error) {
    console.error('Eroare la citirea contactelor:', error);
    throw error;
  }
}

// Funcția pentru a obține un contact după ID
async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find(c => c.id === contactId);
    return contact || null;
  } catch (error) {
    console.error(`Eroare la obținerea contactului cu ID-ul ${contactId}:`, error);
    throw error;
  }
}

// Funcția pentru a elimina un contact după ID
async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    
    // Verificăm tipul de date al contactId și îl transformăm în string dacă este necesar
    const contactToRemove = contacts.find(c => c.id === contactId.toString());
    
    if (!contactToRemove) {
      console.error(`Contactul cu ID-ul ${contactId} nu a fost găsit.`);
      return null;  // Returnează null dacă nu există un contact cu acest ID
    }

    // Filtrăm contactele pentru a le păstra pe cele care NU au contactId
    const newContacts = contacts.filter(c => c.id !== contactId.toString());
    
    // Suprascriem fișierul contacts.json cu noua listă
    await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));

    console.log(`Contactul cu ID-ul ${contactId} a fost eliminat.`);
    return contactToRemove;  // Returnăm contactul eliminat (sau true dacă preferi)
  } catch (error) {
    console.error(`Eroare la eliminarea contactului cu ID-ul ${contactId}:`, error);
    throw error;
  }
}


// Funcția pentru a adăuga un contact nou
async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: Date.now().toString(),  // Generăm un ID simplu bazat pe timp
      name,
      email,
      phone
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));  // Salvăm noua listă de contacte
    return newContact;
  } catch (error) {
    console.error('Eroare la adăugarea contactului:', error);
    throw error;
  }
}

// Exportă funcțiile pentru a putea fi folosite în alte fișiere
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
};
