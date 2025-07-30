'use server';

import {ai} from '@/ai/genkit';
import {
  SendEmailInputSchema,
  SendEmailOutputSchema,
  type SendEmailInput,
  type SendEmailOutput,
} from '@/types/email';
import resend from '@/lib/resend';
import ContactFormEmail from '@/components/emails/contact-form';

export async function sendEmail(
  input: SendEmailInput,
): Promise<SendEmailOutput> {
  const {fromEmail, name, message} = input;
  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'krrishyogi18@gmail.com',
      subject: 'Message from contact form',
      reply_to: fromEmail,
      react: ContactFormEmail({
        message,
        name,
        fromEmail,
      }),
    });
    return {success: true};
  } catch (error) {
    console.error('Error sending email:', error);
    return {success: false};
  }
}

export const sendEmailFlow = ai.defineFlow(
  {
    name: 'sendEmailFlow',
    inputSchema: SendEmailInputSchema,
    outputSchema: SendEmailOutputSchema,
  },
  async input => {
    return await sendEmail(input);
  },
);
