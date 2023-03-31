import Navbar from '@/components/Navbar'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <Navbar />
        <main className='max-w-max mx-auto'>
          {children}
        </main>
      </body>
    </html>
  )
}
