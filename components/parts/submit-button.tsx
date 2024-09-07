'use client'

import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { LoaderCircle as Loading } from 'lucide-react'

export default function SubmitButton() {
  const { pending } = useFormStatus()
  pending ? (
    <Button className="inline-flex items-center gap-2" disabled={pending}>
      <Loading className="animate-spin " />
      Loading
    </Button>
  ) : (
    <Button type="submit">Submit</Button>
  )
}
