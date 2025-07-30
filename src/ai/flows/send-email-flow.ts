'use server';

/**
 * @fileOverview This file defines a Genkit flow for sending an email from the contact form.
 * - sendEmail - A function that processes and "sends" the email.
 */

import {ai} from '@/ai/genkit';
import { SendEmailInputSchema, SendEmailOutputSchema, type SendEmailInput, type SendEmailOutput } from '@/types/email';

export async function sendEmail(input: SendEmailInput): Promise<SendEmailOutput> {
  return sendEmailFlow(input);
}

const prompt = ai.definePrompt({
  name: 'sendEmailPrompt',
  input: {schema: SendEmailInputSchema},
  output: {schema: SendEmailOutputSchema},
  prompt: `You are a mailer agent for a portfolio website. A user is sending an email. Your task is to process the request and confirm its successful handling.

From: {{name}} <{{fromEmail}}>
To: krrishyogi18@gmail.com
Message:
{{{message}}}

Acknowledge that you have processed the message by responding with 'success: true'. Do not add any other text or explanations. Your entire response should be the JSON object.`,
});

const sendEmailFlow = ai.defineFlow(
  {
    name: 'sendEmailFlow',
    inputSchema: SendEmailInputSchema,
    outputSchema: SendEmailOutputSchema,
  },
  async input => {
    // In a real application, you would integrate with an email sending service
    // like SendGrid, Resend, or AWS SES here.
    // For this prototype, we'll just use the AI to format and confirm the request.
    const {output} = await prompt(input);

    // We can add more logic here, like saving the message to a database.
    
    return output || { success: false };
  }
);
