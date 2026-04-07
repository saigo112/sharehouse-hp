import { createClient } from 'microcms-js-sdk';

export async function getLPData() {
  const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
  const apiKey = process.env.MICROCMS_API_KEY;

  if (!serviceDomain || !apiKey) {
    console.error('Environment variables MICROCMS_SERVICE_DOMAIN or MICROCMS_API_KEY are missing.');
    return null;
  }
  
  try {
    console.log(`Connecting to microCMS: ${serviceDomain}.microcms.io`);
    console.log(`API Key length: ${apiKey.length}`);

    const client = createClient({
      serviceDomain,
      apiKey,
    });

    const data = await client.get({
      endpoint: 'shared_house',
    });
    console.log('Successfully fetched data from microCMS');
    return data;
  } catch (error) {
     console.error('Error fetching LP data from microCMS:', error);
     return null;
  }
}
