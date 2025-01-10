import React from 'react';
import './globals.scss'
import { lora } from './fonts';

export const metadata = {
  title: 'Borghamns Stenförädling AB',
  description: 'Svensk natursten från våra egna brott',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={lora.variable}>{children}</body>
    </html>
  )
}
