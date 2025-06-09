'use client'

import { Suspense } from 'react'
import PaymentVerify from './PaymentVerify'

export default function VerifyPage() {
  return (
    <Suspense fallback={<div>در حال بارگذاری...</div>}>
      <PaymentVerify />
    </Suspense>
  )
}