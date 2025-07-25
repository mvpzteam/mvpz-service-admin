import { GalleryVerticalEnd } from "lucide-react"

import { LoginForm } from '@/components/login-form'
import { Avatar } from "@radix-ui/react-avatar"
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6  p-6 md:p-10 bg-black">
      <div className="flex w-full max-w-sm flex-col gap-6">
      
        <LoginForm />
      </div>
    </div>
  )
}
