import { CustomerData } from '../types';
import { formatCurrency, UNIT_PRICE, CREDIT_CARD_SURCHARGE } from '../constants';

/**
 * Simulates sending an email to the hotel reservation system.
 * In a real application, this would call a backend API endpoint.
 * 
 * SECURITY WARNING: In production, never send raw credit card details via email.
 * This is implemented strictly for the requested prototype behavior.
 */
export const sendOrderEmail = async (data: CustomerData): Promise<void> => {
  const baseTotal = data.quantity * UNIT_PRICE;
  const totalWithTax = baseTotal * (1 + CREDIT_CARD_SURCHARGE);
  const finalPrice = data.paymentMethod === 'credit_card' ? totalWithTax : baseTotal;

  // Format the email body
  const emailBody = `
==================================================================
NOVA RESERVA - SOLAR SEM LIMITES
==================================================================

DADOS DO CLIENTE
----------------
Nome Completo: ${data.firstName} ${data.lastName}
CPF: ${data.cpf}
Email: ${data.email}
Telefone (WhatsApp): ${data.phone}
Endereço: ${data.address}
Cidade/UF: ${data.city} / ${data.state}
CEP: ${data.zipCode}

RESUMO DO PEDIDO
----------------
Produto: Solar sem Limites
Quantidade de Pacotes: ${data.quantity}
Total de Diárias: ${data.quantity * 6}
Valor Total: ${formatCurrency(finalPrice)}

FORMA DE PAGAMENTO
------------------
Método: ${data.paymentMethod === 'pix' ? 'PIX / Transferência Bancária' : 'Cartão de Crédito'}

${data.paymentMethod === 'credit_card' ? `
DADOS DO CARTÃO (SECURE TRANSMISSION)
-------------------------------------
Número do Cartão: ${data.cardNumber}
Titular (Como no cartão): ${data.cardHolder}
Validade: ${data.cardExpiryMonth}/${data.cardExpiryYear}
CVV: ${data.cardCvv}
Parcelamento: ${data.installments}x
` : ''}

COMENTÁRIOS ADICIONAIS
----------------------
${data.comments || 'Nenhum comentário.'}

==================================================================
Email gerado automaticamente pelo sistema de Checkout.
Destinatário: reserva@hotelsolar.tur.br
==================================================================
  `;

  // Simulate network delay and sending
  console.group('%c📨 ENVIANDO EMAIL DE RESERVA...', 'color: #D4AF37; font-weight: bold; font-size: 14px;');
  console.log('%cPara: reserva@hotelsolar.tur.br', 'font-weight: bold;');
  console.log(emailBody);
  console.groupEnd();

  // Simulate API latency
  await new Promise(resolve => setTimeout(resolve, 800));
};