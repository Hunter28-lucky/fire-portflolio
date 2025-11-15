import { z } from 'zod';

export const SendEmailInputSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  fromEmail: z.string().email({ message: 'Please enter a valid email.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});
export type SendEmailInput = z.infer<typeof SendEmailInputSchema>;

export const SendEmailOutputSchema = z.object({
  success: z.boolean().describe('Whether the email was sent successfully.'),
  error: z.string().optional().describe('Error message if sending failed.'),
});
export type SendEmailOutput = z.infer<typeof SendEmailOutputSchema>;
