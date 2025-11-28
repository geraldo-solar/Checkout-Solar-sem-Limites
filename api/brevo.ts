import type { VercelRequest, VercelResponse } from '@vercel/node';

const BREVO_API_KEY = process.env.BREVO_API_KEY || '';
const BREVO_API_URL = 'https://api.brevo.com/v3';
const LIST_ID = 8;
const TEMPLATE_ID = 12;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, firstName, lastName, phone, quantity, paymentMethod } = req.body;

    // Validate required fields
    if (!email || !firstName || !lastName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // 1. Create/Update contact in Brevo
    const contactResponse = await fetch(`${BREVO_API_URL}/contacts`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': BREVO_API_KEY
      },
      body: JSON.stringify({
        email,
        attributes: {
          FIRSTNAME: firstName,
          LASTNAME: lastName,
          SMS: phone || '',
          QUANTITY: quantity || 1,
          PAYMENT_METHOD: paymentMethod || 'N/A'
        },
        listIds: [LIST_ID],
        updateEnabled: true
      })
    });

    if (!contactResponse.ok && contactResponse.status !== 204) {
      const errorData = await contactResponse.json();
      console.error('Error creating contact:', errorData);
      // Continue even if contact creation fails
    }

    // 2. Send confirmation email
    const emailResponse = await fetch(`${BREVO_API_URL}/smtp/email`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': BREVO_API_KEY
      },
      body: JSON.stringify({
        templateId: TEMPLATE_ID,
        to: [
          {
            email,
            name: `${firstName} ${lastName}`
          }
        ],
        params: {
          FIRSTNAME: firstName,
          LASTNAME: lastName,
          EMAIL: email,
          SMS: phone || 'Não informado',
          QUANTITY: (quantity || 1).toString()
        }
      })
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.json();
      console.error('Error sending email:', errorData);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to send email',
        details: errorData 
      });
    }

    const emailData = await emailResponse.json();
    
    return res.status(200).json({ 
      success: true, 
      messageId: emailData.messageId 
    });

  } catch (error) {
    console.error('Brevo API error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
}
