import type { VercelRequest, VercelResponse } from '@vercel/node';

const BREVO_API_KEY = process.env.BREVO_API_KEY || '';
const BREVO_API_URL = 'https://api.brevo.com/v3';
const LIST_ID = 8;
const PIX_TEMPLATE_ID = 13;
const CARD_TEMPLATE_ID = 14;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, firstName, lastName, phone, quantity, paymentMethod, installments } = req.body;
    
    // Debug log
    console.log('Brevo API - Dados recebidos:', { paymentMethod, installments, quantity });

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

    // 2. Send confirmation email with correct template based on payment method
    const templateId = paymentMethod === 'pix' ? PIX_TEMPLATE_ID : CARD_TEMPLATE_ID;
    
    const emailResponse = await fetch(`${BREVO_API_URL}/smtp/email`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': BREVO_API_KEY
      },
      body: JSON.stringify({
        templateId,
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
          QUANTITY: (quantity || 1).toString(),
          TOTAL_NIGHTS: ((quantity || 1) * 6).toString(),
          TOTAL_VALUE: paymentMethod === 'credit_card' 
            ? `R$ ${((quantity || 1) * 2800 * 1.10).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
            : `R$ ${((quantity || 1) * 2800).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
          PAYMENT_METHOD_LABEL: paymentMethod === 'pix' ? 'PIX' : 'Cartão de Crédito',
          INSTALLMENTS: paymentMethod === 'credit_card' 
            ? `${installments || 1}x de R$ ${(((quantity || 1) * 2800 * 1.10) / (installments || 1)).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
            : 'À vista'
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
