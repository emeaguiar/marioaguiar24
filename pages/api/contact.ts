/**
 * Next dependencies
 */
import type { NextApiRequest, NextApiResponse } from 'next';
import Mailgun from 'mailgun.js';
import FormData from 'form-data';

/**
 * Internal dependencies
 */
import {
  MAILGUN_DOMAIN,
  MAILGUN_API_KEY,
  CONTACT_FORM_FROM_EMAIL,
  CONTACT_FORM_TO_EMAIL,
} from '@/lib/data';

const mailgun = new Mailgun(FormData);

const mailgunClient = mailgun.client({
  username: 'api',
  key: MAILGUN_API_KEY,
  url: 'https://api.mailgun.net',
});

async function contact(
  req: NextApiRequest,
  res: NextApiResponse<string | void>
) {
  console.log(req.method);
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { name, email, message } = req.body;

  try {
    await mailgunClient.messages.create(MAILGUN_DOMAIN, {
      from: `${name} <${CONTACT_FORM_FROM_EMAIL}>`,
      to: CONTACT_FORM_TO_EMAIL,
      subject: `Nuevo mensaje de contacto de ${name}`,
      text: message,
      'h:Reply-To': email,
    });

    res.status(200).json({ status: 'ok' } as any);
  } catch (error: unknown) {
    console.error(error);
    res.status(500).end();
  }
}

export default contact;
