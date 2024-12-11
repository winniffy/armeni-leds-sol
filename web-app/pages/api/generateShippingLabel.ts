// pages/api/generateShippingLabel.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { generateShippingLabel, AddressInfo, DeviceInfo } from '../../src/helpers/shippingLabelHelper';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { addressInfo, deviceInfo } = req.body;

    if (!addressInfo || !deviceInfo) {
      res.status(400).json({ error: 'Address or device information is missing' });
      return;
    }

    const labelData = await generateShippingLabel(addressInfo, deviceInfo);

    res.status(200).json({
      labelUrl: labelData.labelUrl,
      trackingNumber: labelData.trackingNumber,
    });
  } catch (error: any) {
    console.error('Error generating shipping label:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Error generating shipping label',
      detail: error.response?.data?.detail || error.message,
    });
  }
}


