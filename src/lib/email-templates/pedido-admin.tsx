import React from 'react'
import { Body, Container, Head, Heading, Hr, Html, Preview, Section, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  cliente?: string
  correo?: string
  telefono?: string
  direccion?: string
  productos?: string
  total?: string
  conEnvio?: boolean
}

const Email = ({ cliente, correo, telefono, direccion, productos, total, conEnvio }: Props) => (
  <Html lang="es" dir="ltr">
    <Head />
    <Preview>Nuevo pedido recibido en XUUMIEL</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>Nuevo pedido recibido</Heading>
        <Section style={box}>
          <Text style={text}><strong>Cliente:</strong> {cliente ?? '—'}</Text>
          <Text style={text}><strong>Correo:</strong> {correo ?? '—'}</Text>
          <Text style={text}><strong>Teléfono:</strong> {telefono ?? '—'}</Text>
          {conEnvio ? (
            <Text style={text}><strong>Dirección de envío:</strong> {direccion ?? '—'}</Text>
          ) : (
            <Text style={text}><strong>Entrega:</strong> Recoge en tienda (sin envío)</Text>
          )}
          <Hr style={hr} />
          <Text style={items}>{productos ?? '—'}</Text>
          <Hr style={hr} />
          <Text style={totalText}>Total: {total ?? ''}</Text>
        </Section>
        <Text style={muted}>Este correo se generó automáticamente al completarse un pago en xuumiel.com.</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: (d: Record<string, any>) => `Nuevo pedido XUUMIEL · ${d['total'] ?? ''}`,
  displayName: 'Aviso de nuevo pedido (admin)',
  to: 'admin@xuumiel.com',
  previewData: {
    cliente: 'María Pérez',
    correo: 'maria@example.com',
    telefono: '+52 998 000 0000',
    direccion: 'Calle 1 #123, Cancún, Q. Roo, 77500',
    productos: 'Miel Melipona Beecheii · 10 ml × 1\nJabón de tepezcohuite · 100 g × 2',
    total: '$330 MXN',
    conEnvio: true,
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px 25px', maxWidth: '560px' }
const heading = { color: '#3d2b1f', fontSize: '24px' }
const text = { color: '#3d2b1f', fontSize: '15px', lineHeight: '22px', margin: '4px 0' }
const box = { backgroundColor: '#faf6ef', borderRadius: '8px', padding: '16px' }
const items = { color: '#3d2b1f', fontSize: '15px', whiteSpace: 'pre-line' as const, margin: '0' }
const hr = { borderColor: '#e5d9c5', margin: '12px 0' }
const totalText = { color: '#3d2b1f', fontSize: '16px', fontWeight: 'bold' as const, margin: '0' }
const muted = { color: '#8a7a68', fontSize: '13px', lineHeight: '20px' }
