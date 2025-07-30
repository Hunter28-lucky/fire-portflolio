import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface ContactFormEmailProps {
  message: string;
  name: string;
  fromEmail: string;
}

const ContactFormEmail = ({
  message,
  name,
  fromEmail,
}: ContactFormEmailProps) => (
  <Html>
    <Head />
    <Preview>New message from your portfolio site</Preview>
    <Body>
      <Container>
        <Section>
          <Heading>You received the following message from the contact form</Heading>
          <Text>{message}</Text>
          <Hr />
          <Text>The sender's name is: {name}</Text>
          <Text>The sender's email is: {fromEmail}</Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default ContactFormEmail;
