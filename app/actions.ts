'use strict';
'use server';

import { saveContact, getContacts, clearAllContacts, type ContactMessage } from '../lib/contacts';

export interface ActionResponse {
  success: boolean;
  message: string;
  errors?: {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  };
  contact?: ContactMessage;
}

// Server action for handling contact form submission
export async function submitContactForm(formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<ActionResponse> {
  // Simple safety guard to mimic high-end real-world servers
  const { name, email, subject, message } = formData;
  
  // Real-time server diagnostics
  const errors: ActionResponse['errors'] = {};

  if (!name || name.trim().length === 0) {
    errors.name = 'Full name is required';
  } else if (name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || email.trim().length === 0) {
    errors.email = 'Email address is required';
  } else if (!emailRegex.test(email)) {
    errors.email = 'Please provide a valid email address';
  }

  if (!subject || subject.trim().length === 0) {
    errors.subject = 'Subject is required';
  } else if (subject.trim().length < 3) {
    errors.subject = 'Subject must be at least 3 characters';
  }

  if (!message || message.trim().length === 0) {
    errors.message = 'Message body is required';
  } else if (message.trim().length < 10) {
    errors.message = 'Please write a descriptive message (at least 10 characters)';
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: 'Validation failed. Please correct input values.',
      errors,
    };
  }

  try {
    const contact = saveContact(
      name.trim(),
      email.trim(),
      subject.trim(),
      message.trim()
    );

    return {
      success: true,
      message: 'Transmission successful. Your message has been saved into the system datastore.',
      contact,
    };
  } catch (error) {
    console.error('Server Action Error Saving Message:', error);
    return {
      success: false,
      message: 'Internal server error occurred when appending database logs.',
    };
  }
}

// Admin server actions for Terminal emulations
export async function getStoredContacts(): Promise<ContactMessage[]> {
  try {
    return getContacts();
  } catch (error) {
    console.error('Failed to get stored contacts', error);
    return [];
  }
}

export async function clearStoredContacts(): Promise<string> {
  try {
    clearAllContacts();
    return 'Database cleared successfully.';
  } catch (e) {
    return 'Error: Failed to wipe datastore.';
  }
}
