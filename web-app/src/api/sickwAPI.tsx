// src/api/sickwAPI.ts

import axios from 'axios';

// Define multiple actions for interacting with Sickw API

export const getIMEIInfo = async (imei: string, service: string): Promise<unknown> => {
  console.log(`Initiating IMEI request for IMEI: ${imei}, Service: ${service}`);
  return await makeSickwRequest('json', imei, service);
};

// Helper function for making Sickw requests
async function makeSickwRequest(format: string, imeiOrOrderId: string, service: string, action: string = ''): Promise<unknown> {
  try {
    const apiKey = process.env.NEXT_PUBLIC_SICKW_API_KEY;

    if (!apiKey) {
      throw new Error('API key not found in environment variables. Please set NEXT_PUBLIC_SICKW_API_KEY.');
    }

    console.log(`Sending request to Sickw API. Params: format=${format}, imeiOrOrderId=${imeiOrOrderId}, service=${service}, action=${action}`);

    const response = await axios.get(`https://sickw.com/api.php`, {
      params: {
        format,
        key: apiKey,
        imei: imeiOrOrderId,
        service,
        action,
      },
      timeout: 30000, // Set a timeout of 30 seconds to prevent hanging requests
    });

    if (response.status !== 200) {
      throw new Error(`Sickw API returned non-200 status code: ${response.status}`);
    }

    console.log('Sickw API response:', response.data);
    return response.data;

  } catch (error: any) {
    if (error.response) {
      console.error(`Error from Sickw API: Status ${error.response.status} - ${error.response.data}`);
    } else {
      console.error('Error with Sickw request:', error.message);
    }
    throw new Error('Sickw API request failed. Please check the console for details.');
  }
}

