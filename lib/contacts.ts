import fs from 'fs';
import path from 'path';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

// In-memory fallback if file system access fails
let inMemoryFallback: ContactMessage[] = [
  {
    id: "welcome-system",
    name: "System Boot",
    email: "system@gurel.dev",
    subject: "Initial Message DB Configuration",
    message: "Data retention subsystem initialized. Submit contact form to append records.",
    createdAt: new Date().toISOString()
  }
];

const DB_FILE = path.join('/tmp', 'contacts-db.json');

// Ensure database file exists
function ensureDb() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(inMemoryFallback, null, 2), 'utf-8');
    }
  } catch (error) {
    console.error('Failed to initialize database file. Falling back to in-memory state.', error);
  }
}

export function getContacts(): ContactMessage[] {
  ensureDb();
  try {
    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(content) as ContactMessage[];
    }
  } catch (error) {
    console.error('Failed to read contacts database file.', error);
  }
  return inMemoryFallback;
}

export function saveContact(
  name: string,
  email: string,
  subject: string,
  message: string
): ContactMessage {
  ensureDb();
  const newContact: ContactMessage = {
    id: 'msg_' + Math.random().toString(36).substring(2, 9),
    name,
    email,
    subject,
    message,
    createdAt: new Date().toISOString(),
  };

  try {
    const list = getContacts();
    list.push(newContact);
    
    // Clear initial item if a real message arrives
    const cleanedList = list.filter((item) => item.id !== 'welcome-system' || list.length <= 1);
    
    fs.writeFileSync(DB_FILE, JSON.stringify(cleanedList, null, 2), 'utf-8');
    
    // Sync memory state
    inMemoryFallback = cleanedList;
    return newContact;
  } catch (error) {
    console.error('Failed to write to contacts database. Saving in memory.', error);
    inMemoryFallback.push(newContact);
    return newContact;
  }
}

export function deleteContact(id: string): boolean {
  ensureDb();
  try {
    const list = getContacts();
    const updated = list.filter((item) => item.id !== id);
    if (list.length === updated.length) return false;
    
    fs.writeFileSync(DB_FILE, JSON.stringify(updated, null, 2), 'utf-8');
    inMemoryFallback = updated;
    return true;
  } catch (error) {
    console.error('Failed to delete contact.', error);
    return false;
  }
}

export function clearAllContacts(): void {
  ensureDb();
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2), 'utf-8');
    inMemoryFallback = [];
  } catch (error) {
    console.error('Failed to clear contacts database.', error);
  }
}
