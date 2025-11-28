/**
 * Serviço de integração com Brevo (Sendinblue)
 * Cadastra contatos e envia e-mails automaticamente
 */

const BREVO_API_KEY = import.meta.env.VITE_BREVO_API_KEY || '';
const BREVO_API_URL = 'https://api.brevo.com/v3';
const LIST_ID = 8; // ID da lista "Clientes Solar sem Limites"
const TEMPLATE_ID = 12; // ID do template de confirmação

interface ContactData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  quantity: number;
  paymentMethod: string;
}

/**
 * Adiciona contato à lista do Brevo e envia e-mail de confirmação
 */
export async function addContactAndSendEmail(contactData: ContactData): Promise<boolean> {
  try {
    // 1. Criar/Atualizar contato
    const contactCreated = await createOrUpdateContact(contactData);
    
    if (!contactCreated) {
      console.error('Falha ao criar contato no Brevo');
      return false;
    }

    // 2. Enviar e-mail de confirmação
    const emailSent = await sendConfirmationEmail(contactData);
    
    if (!emailSent) {
      console.error('Falha ao enviar e-mail via Brevo');
      return false;
    }

    console.log('✅ Contato cadastrado e e-mail enviado com sucesso!');
    return true;
  } catch (error) {
    console.error('Erro na integração com Brevo:', error);
    return false;
  }
}

/**
 * Cria ou atualiza contato no Brevo
 */
async function createOrUpdateContact(contactData: ContactData): Promise<boolean> {
  try {
    const response = await fetch(`${BREVO_API_URL}/contacts`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': BREVO_API_KEY
      },
      body: JSON.stringify({
        email: contactData.email,
        attributes: {
          FIRSTNAME: contactData.firstName,
          LASTNAME: contactData.lastName,
          SMS: contactData.phone,
          QUANTITY: contactData.quantity,
          PAYMENT_METHOD: contactData.paymentMethod
        },
        listIds: [LIST_ID],
        updateEnabled: true // Atualiza se já existir
      })
    });

    if (response.ok || response.status === 204) {
      console.log('✅ Contato criado/atualizado no Brevo');
      
      // Adicionar tag ao contato
      await addTagToContact(contactData.email);
      
      return true;
    } else {
      const errorData = await response.json();
      console.error('Erro ao criar contato:', errorData);
      return false;
    }
  } catch (error) {
    console.error('Erro ao criar contato no Brevo:', error);
    return false;
  }
}

/**
 * Adiciona tag "cliente Solar Sem Limites" ao contato
 */
async function addTagToContact(email: string): Promise<boolean> {
  try {
    const response = await fetch(`${BREVO_API_URL}/contacts/${encodeURIComponent(email)}`, {
      method: 'PUT',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': BREVO_API_KEY
      },
      body: JSON.stringify({
        attributes: {
          TAGS: ['cliente Solar Sem Limites']
        }
      })
    });

    if (response.ok || response.status === 204) {
      console.log('✅ Tag adicionada ao contato');
      return true;
    } else {
      console.error('Erro ao adicionar tag');
      return false;
    }
  } catch (error) {
    console.error('Erro ao adicionar tag:', error);
    return false;
  }
}

/**
 * Envia e-mail de confirmação usando template do Brevo
 */
async function sendConfirmationEmail(contactData: ContactData): Promise<boolean> {
  try {
    const response = await fetch(`${BREVO_API_URL}/smtp/email`, {
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
            email: contactData.email,
            name: `${contactData.firstName} ${contactData.lastName}`
          }
        ],
        params: {
          FIRSTNAME: contactData.firstName,
          LASTNAME: contactData.lastName,
          EMAIL: contactData.email,
          SMS: contactData.phone,
          QUANTITY: contactData.quantity.toString()
        }
      })
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ E-mail enviado com sucesso! Message ID:', data.messageId);
      return true;
    } else {
      const errorData = await response.json();
      console.error('Erro ao enviar e-mail:', errorData);
      return false;
    }
  } catch (error) {
    console.error('Erro ao enviar e-mail via Brevo:', error);
    return false;
  }
}
