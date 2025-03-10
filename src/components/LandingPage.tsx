import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Upload, Shield, Zap } from "lucide-react"
import { ModeToggle } from "./toggle-theme"

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="border-b">
                <div className="container flex h-16 items-center justify-between px-4 md:px-6">
                    <div className="flex items-center gap-2 font-bold">
                        <Upload className="h-6 w-6" />
                        <span>DiscoImages</span>
                    </div>
                    <nav className="hidden md:flex gap-6">
                        <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4">
                            Features
                        </Link>
                        <Link href="#how-it-works" className="text-sm font-medium hover:underline underline-offset-4">
                            How It Works
                        </Link>
                        <Link href="#faq" className="text-sm font-medium hover:underline underline-offset-4">
                            FAQ
                        </Link>
                    </nav>
                    <div className="flex gap-4">
                    <ModeToggle/>
                    <Link href="/signin">
                        <Button>
                            Sign In
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                    </div>
                </div>
            </header>
            <main className="flex-1">
                <section className="w-full py-12 md:py-12 lg:py-12 xl:py-12">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="space-y-2">
                                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                        Seamlessly Upload & Store Files via Discord
                                    </h1>
                                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                        Effortlessly upload and store any number of images securely on Discord's CDN. Access your image library from anywhere with ease.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                    <Link href="/signin">
                                        <Button size="lg" className="gap-1.5">
                                            <Image
                                                src="/dicon.png"
                                                width={20}
                                                height={20}
                                                alt="Discord logo"
                                                className="h-5 w-5"
                                            />
                                            Sign in with Discord
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                            <img
                                src="https://discoimg.vercel.app/images/1348718320563781682"
                                width={550}
                                height={550}
                                alt="Hero image showing image upload interface"
                                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                            />
                        </div>
                    </div>
                </section>

                <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Powerful Features</h2>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Everything you need to manage your Files efficiently
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 mt-8">
                            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
                                <div className="rounded-full bg-primary p-3">
                                    <Upload className="h-6 w-6 text-primary-foreground" />
                                </div>
                                <h3 className="text-xl font-bold">Easy Uploads</h3>
                                <p className="text-center text-muted-foreground">
                                    Drag and drop or select Files to upload with a single click
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
                                <div className="rounded-full bg-primary p-3">
                                    <Shield className="h-6 w-6 text-primary-foreground" />
                                </div>
                                <h3 className="text-xl font-bold">Secure Storage</h3>
                                <p className="text-center text-muted-foreground">
                                    Your Files are securely stored on Discord's reliable CDN
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
                                <div className="rounded-full bg-primary p-3">
                                    <Zap className="h-6 w-6 text-primary-foreground" />
                                </div>
                                <h3 className="text-xl font-bold">Fast Access</h3>
                                <p className="text-center text-muted-foreground">Quickly access and share your Files from anywhere</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How It Works</h2>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    A simple three-step process to manage your Files
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
                            <div className="flex flex-col justify-center space-y-4 rounded-lg border p-6 text-center">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                                    <span className="text-2xl font-bold">1</span>
                                </div>
                                <h3 className="text-xl font-bold">Sign in with Discord</h3>
                                <p className="text-muted-foreground">Connect your Discord account with a single click</p>
                            </div>
                            <div className="flex flex-col justify-center space-y-4 rounded-lg border p-6 text-center">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                                    <span className="text-2xl font-bold">2</span>
                                </div>
                                <h3 className="text-xl font-bold">Upload Your Files</h3>
                                <p className="text-muted-foreground">Select or drag and drop Files to upload</p>
                            </div>
                            <div className="flex flex-col justify-center space-y-4 rounded-lg border p-6 text-center">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                                    <span className="text-2xl font-bold">3</span>
                                </div>
                                <h3 className="text-xl font-bold">Access Anywhere</h3>
                                <p className="text-muted-foreground">Your Files are stored and accessible via Discord CDN links</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="cta" className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Get Started?</h2>
                                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Join thousands of users who trust DiscoFiles for their image storage needs
                                </p>
                            </div>
                            <Link href="/signin">
                                <Button size="lg" variant="secondary" className="gap-1.5">
                                    Sign in with Discord
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="border-t">
                <div className="container flex flex-col gap-2 py-6 md:flex-row md:items-center md:justify-between md:py-8">
                    <div className="flex items-center gap-2 font-bold">
                        <Upload className="h-6 w-6" />
                        <span>DiscoFiles</span>
                    </div>
                    <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} DiscoFiles. All rights reserved.</p>
                    <nav className="flex gap-4 sm:gap-6">
                        <Link href="#" className="text-xs hover:underline underline-offset-4">
                            Terms of Service
                        </Link>
                        <Link href="#" className="text-xs hover:underline underline-offset-4">
                            Privacy Policy
                        </Link>
                    </nav>
                </div>
            </footer>
        </div>
    )
}
