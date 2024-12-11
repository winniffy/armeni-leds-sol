// pages/api/chat.ts

import OpenAI from 'openai';
import { NextApiRequest, NextApiResponse } from 'next';
import { getQuote } from '../../src/helpers/pricingHelper';
import { generateShippingLabel, AddressInfo, DeviceInfo } from '../../src/helpers/shippingLabelHelper';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Valid options for device details
const validModels = [
  'iphone 15 pro max',
  'iphone 15 pro',
  'iphone 15',
  'iphone 14 pro max',
  'iphone 14 pro',
  'iphone 14',
  'iphone 13 pro max',
  'iphone 13 pro',
  'iphone 13',
  'iphone 12 pro max',
  'iphone 12 pro',
  'iphone 12',
].sort((a, b) => b.length - a.length);

const validCarriers = ['unlocked', 'at&t', 'verizon', 't-mobile', 'sprint'];
const storageOptions = ['64gb', '128gb', '256gb', '512gb', '1tb'];

// Chat steps
const steps = [
  'greeting',
  'model',
  'carrier',
  'storage',
  'condition',
  'quote',
  'address_name',
  'address_street',
  'address_city',
  'address_state',
  'address_zip',
  'address_phone',
  'address_email',
  'shipping_label',
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { message, threadId, conversationHistory } = req.body;
    const currentStep = getCurrentStep(conversationHistory);
    let deviceInfo = extractDeviceInfo([
      ...(conversationHistory || []),
      { role: 'user', content: message },
    ]);

    let responseMessage = '';
    let nextStep = '';

    // Handle conversation steps
    if (currentStep === 'greeting') {
      responseMessage = 'Hello! I can help you get a quote for your used iPhone. Could you please tell me the model of your iPhone?';
      nextStep = 'model';
    } else if (currentStep === 'model') {
      const matchedModel = validModels.find((model) =>
        message.toLowerCase().includes(model)
      );
      if (matchedModel) {
        deviceInfo.model = matchedModel;
        responseMessage = `Great, you have an ${matchedModel}. Is your iPhone unlocked or locked to a specific carrier? (Unlocked, AT&T, Verizon, T-Mobile, or Sprint)`;
        nextStep = 'carrier';
      } else {
        responseMessage = 'Sorry, I did not recognize that model. Please specify the exact model of your iPhone (e.g., iPhone 15 Pro Max).';
        nextStep = 'model';
      }
    } else if (currentStep === 'carrier') {
      const matchedCarrier = validCarriers.find(carrier =>
        message.toLowerCase().includes(carrier)
      );

      if (matchedCarrier) {
        deviceInfo.carrier = matchedCarrier.charAt(0).toUpperCase() + matchedCarrier.slice(1);
        responseMessage = `Perfect! What's the storage capacity of your ${deviceInfo.model}? (64GB, 128GB, 256GB, 512GB, or 1TB)`;
        nextStep = 'storage';
      } else {
        responseMessage = 'Please specify your carrier (Unlocked, AT&T, Verizon, T-Mobile, or Sprint).';
        nextStep = 'carrier';
      }
    } else if (currentStep === 'storage') {
      const userStorage = message.toLowerCase().replace(/\s+/g, '');
      const matchedStorage = storageOptions.find(storage =>
        userStorage.includes(storage)
      );

      if (matchedStorage) {
        deviceInfo.storage = matchedStorage.toUpperCase();
        responseMessage = `Thanks! Now, what's the condition of your device? Please choose one of the following options:

1. **A/B**: Used condition, fully functional, no aftermarket parts (replaced by Apple is okay).
2. **C**: Cracked screen, but good LCD. No aftermarket parts. A bad button is okay.
3. **D**: Bad LCD (spots, bad touch), aftermarket LCDs, etc.`;
        nextStep = 'condition';
      } else {
        responseMessage = 'Please specify a valid storage capacity (64GB, 128GB, 256GB, 512GB, or 1TB).';
        nextStep = 'storage';
      }
    } else if (currentStep === 'condition') {
      const userCondition = message.toUpperCase().trim();
      if (['A/B', 'A', 'B', 'C', 'D'].includes(userCondition)) {
        const conditionCode = ['A', 'B'].includes(userCondition) ? 'A/B' : userCondition;
        deviceInfo.condition = conditionCode;

        const price = getQuote(
          deviceInfo.model,
          deviceInfo.storage,
          deviceInfo.carrier,
          conditionCode
        );

        if (price !== null) {
          responseMessage = `Based on your device details, we can offer you $${price} for your ${deviceInfo.model} (${deviceInfo.storage}, ${deviceInfo.carrier}, ${conditionCode} condition).

Would you like to proceed with this offer?`;
          nextStep = 'quote';
        } else {
          responseMessage = "I couldn't generate a quote for your device. Could we start over to verify the details?";
          nextStep = 'model';
        }
      } else {
        responseMessage = 'Please specify a valid condition: A/B, C, or D.';
        nextStep = 'condition';
      }
    } else if (currentStep === 'quote') {
      const lastUserMessage = message.trim().toLowerCase();
      if (/yes|proceed|ok|sure/i.test(lastUserMessage)) {
        responseMessage = "Great! To generate your shipping label, I'll need your shipping information. What's your full name?";
        nextStep = 'address_name';
      } else {
        responseMessage = "No problem! Let me know if you have any other questions.";
        nextStep = 'end_conversation';
      }
    } else if (currentStep.startsWith('address_')) {
      const result = await handleAddressFlow(currentStep, message, conversationHistory, deviceInfo);
      responseMessage = result.message;
      nextStep = result.nextStep;
    } else if (currentStep === 'end_conversation') {
      responseMessage = "Thank you for considering our service. Feel free to reach out if you have more questions.";
      nextStep = 'end_conversation';
    } else {
      // If the current step is not recognized, start over
      responseMessage = 'Hello! I can help you get a quote for your used iPhone. Could you please tell me the model of your iPhone?';
      nextStep = 'model';
    }

    // Update conversation history
    const updatedConversationHistory = [
      ...(conversationHistory || []),
      { role: 'user', content: message },
      { role: 'assistant', content: responseMessage },
    ];

    return res.status(200).json({
      response: responseMessage,
      threadId: threadId || null,
      conversationHistory: updatedConversationHistory,
    });
  } catch (error: any) {
    console.error('Error processing request:', error);
    return res.status(500).json({ error: generateErrorMessage('general') });
  }
}

// Helper functions

function getCurrentStep(conversationHistory: any[]) {
  if (!conversationHistory || conversationHistory.length === 0) {
    return 'greeting';
  }

  const lastAssistantMessage = conversationHistory
    .filter((msg) => msg.role === 'assistant')
    .slice(-1)[0]?.content.toLowerCase() || '';

  // Check for specific prompts to identify the current step
  if (lastAssistantMessage.includes('could you please tell me the model of your iphone')) {
    return 'model';
  } else if (lastAssistantMessage.includes('is your iphone unlocked or locked to a specific carrier')) {
    return 'carrier';
  } else if (lastAssistantMessage.includes('what\'s the storage capacity of your')) {
    return 'storage';
  } else if (lastAssistantMessage.includes('now, what\'s the condition of your device')) {
    return 'condition';
  } else if (lastAssistantMessage.includes('would you like to proceed with this offer')) {
    return 'quote';
  } else if (lastAssistantMessage.includes('what\'s your full name')) {
    return 'address_name';
  } else if (lastAssistantMessage.includes('what\'s your street address')) {
    return 'address_street';
  } else if (lastAssistantMessage.includes('what city are you in')) {
    return 'address_city';
  } else if (lastAssistantMessage.includes('which state')) {
    return 'address_state';
  } else if (lastAssistantMessage.includes('what\'s your zip code')) {
    return 'address_zip';
  } else if (lastAssistantMessage.includes('what\'s your phone number')) {
    return 'address_phone';
  } else if (lastAssistantMessage.includes('what\'s your email for shipping updates')) {
    return 'address_email';
  } else if (lastAssistantMessage.includes('here\'s your shipping label')) {
    return 'shipping_label';
  } else if (lastAssistantMessage.includes('no problem')) {
    return 'end_conversation';
  } else {
    return 'greeting';
  }
}

function extractDeviceInfo(conversationHistory: any[]): DeviceInfo {
  let deviceInfo: DeviceInfo = {
    model: '',
    storage: '',
    carrier: '',
    condition: '',
  };

  conversationHistory.forEach((msg) => {
    if (msg.role === 'user') {
      const content = msg.content.toLowerCase();

      // Extract model
      const matchedModel = validModels.find((model) => content.includes(model));
      if (matchedModel) {
        deviceInfo.model = matchedModel;
      }

      // Extract storage
      const storageMatch = content.match(/(\d+)\s*gb/i);
      if (storageMatch) {
        deviceInfo.storage = storageMatch[1] + 'GB';
      }

      // Extract carrier
      for (const carrier of validCarriers) {
        if (content.includes(carrier)) {
          deviceInfo.carrier = carrier.charAt(0).toUpperCase() + carrier.slice(1);
          break;
        }
      }

      // Extract condition
      if (/\b(a\/b|a|b)\b/i.test(content)) {
        deviceInfo.condition = 'A/B';
      } else if (/\bc\b/i.test(content)) {
        deviceInfo.condition = 'C';
      } else if (/\bd\b/i.test(content)) {
        deviceInfo.condition = 'D';
      }
    }
  });

  return deviceInfo;
}

async function handleAddressFlow(
  currentStep: string,
  message: string,
  conversationHistory: any[],
  deviceInfo: DeviceInfo
): Promise<{ message: string; nextStep: string }> {
  const addressFields = [
    'address_name',
    'address_street',
    'address_city',
    'address_state',
    'address_zip',
    'address_phone',
    'address_email',
  ];

  const currentIndex = addressFields.indexOf(currentStep);
  const nextStep = currentIndex < addressFields.length - 1 ? addressFields[currentIndex + 1] : 'shipping_label';

  // Validate current address field and move to next step
  const validation = validateAddressField(currentStep, message);
  if (!validation.isValid) {
    return {
      message: validation.message,
      nextStep: currentStep,
    };
  }

  if (currentStep === 'address_email') {
    try {
      const addressInfo = extractAddressInfo(conversationHistory, message, currentStep);
      if (!validateEmail(message)) {
        return {
          message: 'Please provide a valid email address.',
          nextStep: currentStep,
        };
      }

      const labelData = await generateShippingLabel(addressInfo, deviceInfo);
      return {
        message: `Here's your shipping label: ${labelData.labelUrl}

Instructions:
1. Print the label
2. Attach it to a USPS Small Flat Rate Box
3. Drop off at any USPS location

Need a box? Get one free at your local post office or visit https://store.usps.com/

We've sent confirmation to ${addressInfo.email}. Let us know once you've shipped the device.`,
        nextStep: 'shipping_label',
      };
    } catch (error) {
      console.error('Error generating shipping label:', error);
      return {
        message: 'There was an error generating your shipping label. Please try again.',
        nextStep: currentStep,
      };
    }
  }

  return {
    message: getPromptForStep(nextStep, conversationHistory),
    nextStep,
  };
}

function validateAddressField(step: string, value: string): { isValid: boolean; message: string } {
  switch (step) {
    case 'address_zip':
      return {
        isValid: validateZipCode(value),
        message: 'Please provide a valid ZIP code (e.g., 12345).',
      };
    case 'address_phone':
      return {
        isValid: validatePhone(value),
        message: 'Please provide a valid phone number (e.g., 123-456-7890).',
      };
    case 'address_email':
      return {
        isValid: validateEmail(value),
        message: 'Please provide a valid email address.',
      };
    default:
      return {
        isValid: Boolean(value.trim()),
        message: 'This field cannot be empty.',
      };
  }
}

function getPromptForStep(step: string, conversationHistory: any[]) {
  switch (step) {
    case 'address_name':
      return "What's your full name?";
    case 'address_street':
      return "What's your street address?";
    case 'address_city':
      return 'What city are you in?';
    case 'address_state':
      return 'Which state?';
    case 'address_zip':
      return "What's your ZIP code?";
    case 'address_phone':
      return "What's your phone number?";
    case 'address_email':
      return "What's your email for shipping updates?";
    case 'shipping_label':
      return 'Processing your shipping label...';
    case 'end_conversation':
      return 'No problem! Let us know if you change your mind.';
    default:
      return 'Could you please try that again?';
  }
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateZipCode(zip: string): boolean {
  return /^\d{5}(-\d{4})?$/.test(zip);
}

function validatePhone(phone: string): boolean {
  return /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phone);
}

function extractAddressInfo(conversationHistory: any[], message: string, currentStep: string): AddressInfo {
  const addressInfo: AddressInfo = {
    name: '',
    street1: '',
    city: '',
    state: '',
    zip: '',
    email: '',
    phone: '',
  };

  conversationHistory.forEach((msg, index) => {
    if (msg.role === 'user') {
      const prevMsg = conversationHistory[index - 1];
      if (prevMsg?.role === 'assistant') {
        if (prevMsg.content.includes('full name')) addressInfo.name = msg.content;
        else if (prevMsg.content.includes('street address')) addressInfo.street1 = msg.content;
        else if (prevMsg.content.includes('city')) addressInfo.city = msg.content;
        else if (prevMsg.content.includes('state')) addressInfo.state = msg.content;
        else if (prevMsg.content.includes('ZIP code')) addressInfo.zip = msg.content;
        else if (prevMsg.content.includes('phone number')) addressInfo.phone = msg.content;
        else if (prevMsg.content.includes('email')) addressInfo.email = msg.content;
      }
    }
  });

  // Add current message to appropriate field
  switch (currentStep) {
    case 'address_name':
      addressInfo.name = message;
      break;
    case 'address_street':
      addressInfo.street1 = message;
      break;
    case 'address_city':
      addressInfo.city = message;
      break;
    case 'address_state':
      addressInfo.state = message;
      break;
    case 'address_zip':
      addressInfo.zip = message;
      break;
    case 'address_phone':
      addressInfo.phone = message;
      break;
    case 'address_email':
      addressInfo.email = message;
      break;
  }

  return addressInfo;
}

function generateErrorMessage(error: string): string {
  switch (error) {
    case 'price':
      return "I couldn't generate a quote for your device. Could we start over?";
    case 'shipping':
      return 'There was an error generating your shipping label. Please try again.';
    default:
      return 'Something went wrong. Could you please try again?';
  }
}

