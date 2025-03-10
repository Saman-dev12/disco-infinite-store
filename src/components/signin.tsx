"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Upload, ArrowLeft } from "lucide-react"
import { signIn } from "next-auth/react"

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8">
          <Button variant="ghost" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <div className="flex justify-center">
              <Upload className="h-10 w-10" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">Welcome to DiscoFiles</h1>
            <p className="text-sm text-muted-foreground">Sign in with your Discord account to continue</p>
          </div>
          <div className="grid gap-6">
            <Button className="flex items-center justify-center gap-2 bg-[#5865F2] hover:bg-[#4752c4]" onClick={()=> signIn("discord")
            }>
              <Image
                src="/dicon.png"
                width={24}
                height={24}
                alt="Discord logo"
                className="h-5 w-5 mix-blend-color-burn "
              />
              Sign in with Discord
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            <p className="text-muted-foreground">
              By signing in, you agree to our{" "}
              <Link href="#" className="underline underline-offset-4 hover:text-primary">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="underline underline-offset-4 hover:text-primary">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

