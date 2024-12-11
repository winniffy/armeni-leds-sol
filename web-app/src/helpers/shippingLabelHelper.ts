// src/helpers/shippingLabelHelper.ts

import axios from 'axios';

export interface AddressInfo {
  name: string;
  street1: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  phone: string;
}

export interface DeviceInfo {
  model: string;
  storage: string;
  carrier: string;
  condition: string;
  price?: string;
}

export async function generateShippingLabel(
  addressInfo: AddressInfo,
  deviceInfo: DeviceInfo
): Promise<{ labelUrl: string; trackingNumber: string }> {
  const shippoApiKey = process.env.SHIPPO_API_KEY || '';

  try {
    const fromAddress = {
      ...addressInfo,
      country: 'US',
    };

    const toAddress = {
      name: 'ShopRefit, LLC',
      street1: '10945 STATE BRIDGE RD STE 401',
      city: 'ALPHARETTA',
      state: 'GA',
      zip: '30022',
      country: 'US',
      email: 'jeremy@shoprefit.com',
      phone: '404-000-0000', // Replace with your actual business phone
    };

    const parcel = {
      length: '8.7',
      width: '5.4',
      height: '1.7',
      distance_unit: 'in',
      weight: '1',
      mass_unit: 'lb',
    };

    const shipmentResponse = await axios.post(
      'https://api.goshippo.com/shipments/',
      {
        address_from: fromAddress,
        address_to: toAddress,
        parcels: [parcel],
        async: false,
        extra: {
          reference_1: deviceInfo.model || '',
          reference_2: `${deviceInfo.storage || ''} ${deviceInfo.carrier || ''}`,
          reference_3: `Condition: ${deviceInfo.condition || ''} Price: $${deviceInfo.price || '0'}`,
        },
      },
      {
        headers: {
          Authorization: `ShippoToken ${shippoApiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const shipment = shipmentResponse.data;
    const rates = shipment.rates;

    if (!rates?.length) {
      throw new Error('No shipping rates available');
    }

    // Find USPS Priority Mail rate
    const selectedRate = rates.find(
      (rate: any) =>
        rate.provider === 'USPS' && rate.servicelevel.name === 'Priority Mail'
    );

    if (!selectedRate) {
      throw new Error('No USPS Priority Mail rate available');
    }

    const transactionResponse = await axios.post(
      'https://api.goshippo.com/transactions/',
      {
        rate: selectedRate.object_id,
        label_file_type: 'PDF',
        async: false,
      },
      {
        headers: {
          Authorization: `ShippoToken ${shippoApiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const transaction = transactionResponse.data;

    if (transaction.status === 'SUCCESS') {
      return {
        labelUrl: transaction.label_url,
        trackingNumber: transaction.tracking_number,
      };
    } else {
      throw new Error('Error purchasing label');
    }
  } catch (error: any) {
    console.error('Error generating shipping label:', error.response?.data || error.message);
    throw error;
  }
}
