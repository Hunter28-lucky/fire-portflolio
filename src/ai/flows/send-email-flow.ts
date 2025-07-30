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
  const toEmail = process.env.RECIPIENT_EMAIL;

  if (!toEmail) {
    console.error('Recipient email is not configured. Please set RECIPIENT_EMAIL environment variable.');
    return {success: false};
  }
  
  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: toEmail,
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

const prompt = ai.definePrompt({
  name: 'sendEmailPrompt',
  input: {schema: SendEmailInputSchema},
  output: {schema: SendEmailOutputSchema},
  prompt: `You are an email sending assistant. A user has submitted a contact form. 
  Your only job is to acknowledge the request and confirm that it will be sent.
  Do not add any other commentary. Just confirm the action.`,
});


export const sendEmailFlow = ai.defineFlow(
  {
    name: 'sendEmailFlow',
    inputSchema: SendEmailInputSchema,
    outputSchema: SendEmailOutputSchema,
  },
  async input => {
     const llmResponse = await prompt(input);
    if (llmResponse.output?.success) {
      return await sendEmail(input);
    }
    // Fallback in case the LLM fails to respond as expected
    return { success: false };
  },
);
