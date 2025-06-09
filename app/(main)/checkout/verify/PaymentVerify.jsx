'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

// کامپوننت اصلی را در Suspense بپیچید
function PaymentVerifyContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isVerifying, setIsVerifying] = useState(true)

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const orderId = searchParams.get('orderId')
        const trackId = searchParams.get('trackId')
        const success = searchParams.get('success') === '1'

        if (!orderId || !trackId) {
          router.replace('/checkout/canceled')
          return
        }

        const res = await fetch('/api/callback', {
          method: 'POST',
          body: JSON.stringify({ success, orderId, trackId }),
        })

        if (res.ok) {
          if (success) {
            // اصلاح خطای پارامترهای URL (استفاده از & به جای ?)
            router.replace(`/checkout/success?orderId=${orderId}&trackId=${trackId}`)
          } else {
            router.replace('/checkout/canceled')
          }
        } else {
          router.replace('/checkout/canceled')
        }
      } finally {
        setIsVerifying(false)
      }
    }

    verifyPayment()
  }, [router, searchParams])

  return <p className="text-center mt-20">در حال بررسی وضعیت پرداخت...</p>
}

// کامپوننت اصلی با Suspense
export default function PaymentVerify() {
  return (
    <Suspense fallback={<div>در حال بارگذاری...</div>}>
      <PaymentVerifyContent />
    </Suspense>
  )
}