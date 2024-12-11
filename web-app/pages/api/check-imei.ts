// pages/api/check-imei.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { getIMEIInfo } from '../../src/api/sickwAPI';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { imei, service } = req.query;

  if (!imei || !service) {
    return res.status(400).json({ error: 'IMEI and service are required parameters.' });
  }

  try {
    console.log(`API request received for IMEI: ${imei}, Service: ${service}`);
    const imeiInfo = await getIMEIInfo(imei as string, service as string);
    return res.status(200).json(imeiInfo);
  } catch (error) {
    console.error('Error fetching IMEI information:', error);
    return res.status(500).json({ error: 'Failed to fetch IMEI information from Sickw API.' });
  }
}
