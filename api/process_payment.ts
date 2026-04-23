export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch(e) {}
  }
  const { formData, giftTitle } = body;

  try {
    const accessToken = process.env.Access_Token || process.env.ACCESS_TOKEN || process.env.VITE_ACCESS_TOKEN || 'APP_USR-7013854181977717-092923-a159f81ca97aee2a02b4e8d26fdfc972-2012023199';

    const response = await fetch('https://api.mercadopago.com/v1/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'X-Idempotency-Key': Date.now().toString() + Math.random().toString(36).substring(2)
      },
      body: JSON.stringify({
        ...formData,
        description: 'Presente de Casamento - ' + (giftTitle || 'Lista de Presentes')
      })
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error processing payment:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
