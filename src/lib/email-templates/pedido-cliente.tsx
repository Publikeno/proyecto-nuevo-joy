import React from 'react'
import { Body, Container, Head, Heading, Hr, Html, Preview, Section, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  nombre?: string
  productos?: string
  total?: string
  conEnvio?: boolean
}

const Email = ({ nombre, productos, total, conEnvio }: Props) => (
  <Html lang="es" dir="ltr">
    <Head />
    <Preview>Gracias por tu compra en XUUMIEL — recibimos tu pedido</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>¡Gracias por tu compra!</Heading>
        <Text style={text}>{nombre ? `Hola ${nombre},` : 'Hola,'}</Text>
        <Text style={text}>
          Recibimos tu pedido en XUUMIEL. Estos son los productos:
        </Text>
        <Section style={box}>
          <Text style={items}>{productos ?? 'Tu pedido'}</Text>
          <Hr style={hr} />
          <Text style={totalText}>Total pagado: {total ?? ''}</Text>
        </Section>
        <Text style={text}>
          {conEnvio
            ? 'Te contactaremos para confirmar el envío a tu domicilio.'
            : 'Te contactaremos para coordinar la entrega de tu pedido.'}
        </Text>
        <Text style={muted}>
          Si tienes alguna duda, responde a este correo o escríbenos por WhatsApp.
        </Text>
        <Text style={muted}>XUUMIEL · Miel melipona y productos artesanales de Quintana Roo</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: 'Confirmamos tu pedido en XUUMIEL',
  displayName: 'Confirmación de pedido (cliente)',
  previewData: {
    nombre: 'María',
    productos: 'Miel Melipona Beecheii · 10 ml × 1\nJabón de tepezcohuite · 100 g × 2',
    total: '$330 MXN',
    conEnvio: true,
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px 25px', maxWidth: '560px' }
const heading = { color: '#3d2b1f', fontSize: '24px' }
const text = { color: '#3d2b1f', fontSize: '15px', lineHeight: '22px' }
const box = { backgroundColor: '#faf6ef', borderRadius: '8px', padding: '16px' }
const items = { color: '#3d2b1f', fontSize: '15px', whiteSpace: 'pre-line' as const, margin: '0' }
const hr = { borderColor: '#e5d9c5', margin: '12px 0' }
const totalText = { color: '#3d2b1f', fontSize: '16px', fontWeight: 'bold' as const, margin: '0' }
const muted = { color: '#8a7a68', fontSize: '13px', lineHeight: '20px' }
