'use server';
      
      import {
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
        const fromSender = process.env.SENDER_EMAIL;

        if (!toEmail) {
          console.error('Recipient email is not configured. Please set RECIPIENT_EMAIL environment variable.');
          return {success: false, error: "Recipient email is not configured."};
        }

        if (!fromSender) {
          console.error('Sender email is not configured. Please set SENDER_EMAIL environment variable.');
          return {success: false, error: "Sender email is not configured."};
        }
        
        try {
          await resend.emails.send({
            from: fromSender,
            to: toEmail,
            subject: 'Message from contact form',
            replyTo: fromEmail,
            react: ContactFormEmail({
              message,
              name,
              fromEmail,
            }),
          });
          return {success: true};
        } catch (error) {
          console.error('Error sending email:', error);
          const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
          return {success: false, error: `Failed to send email: ${errorMessage}`};
        }
      }
      
      // Removed Genkit prompt definition as Genkit packages were removed.
