'use client'

import Link from 'next/link'

  const currentYear = new Date().getFullYear();

export default function HomePage() {
  return (
    
    <div style={{
      margin: 0,
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(135deg,#f5f5f7,#e4e7ec)',
      color: '#05163f',
      minHeight: '100vh'
    }}>

      <header className="flex items-center justify-between px-6 py-4 bg-slate-900">
  <img src="https://i.imgur.com/ZD9WVic.png" alt="Swyft access Logo" className="h-10" />

  <Link href="/login">
          <button style={{
            padding: '10px 22px',
            borderRadius: 999,
            border: 'none',
            cursor: 'pointer',
            background: '#05163f',
            color: '#fff',
            fontWeight: 'bold'
          }}>
            Login
          </button>
        </Link>
</header>

      

      {/* Hero */}
      <div style={{ textAlign: 'center', marginTop: 100, padding: '0 20px' }}>
        <h1 style={{ fontSize: 60, fontWeight: 900, color:'#05163f'}}>
          Reinventing Finance<br />With Intelligence
        </h1>

        <p style={{ marginTop: 20, fontSize: 18, color: '#555', maxWidth: 700, margin: '0 auto' }}>
          A modern financial platform built for speed, security, and customer reward incentives in mind.
        </p>

        <Link href="/register">
          <button style={{
            marginTop: 40,
            padding: '16px 40px',
            borderRadius: 999,
            border: 'none',
            fontSize: 18,
            cursor: 'pointer',
            background: '#05163f',
            color: '#fff',
            fontWeight: 'bold'
          }}>
            Get Started
          </button>
        </Link>
      </div>

      {/* Features */}
      <div style={{
        display: 'flex',
        gap: 30,
        marginTop: 120,
        padding: '0 40px',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>

        {[
          ['Smart wallet', 'Send, receive, and manage money Nationwide in seconds.'],
          ['Phenomenal Reward programs!', 'Earn very exciting monthly rewards with our remarkable leaderboard reward program.'],
          ['Advanced Security', 'Advanced fraud detection powered by adaptive intelligence.'],
          ['Cards', 'Make payments online and offline with cards (coming soon).']
        ].map((f, i) => (
          <div key={i} style={{
            width: 300,
            padding: 30,
            borderRadius: 20,
            background: '#fff',
            border: '1px solid #e0e0e0'
          }}>
            <h3>{f[0]}</h3>
            <p style={{ color: '#666' }}>{f[1]}</p>
          </div>
        ))}

      </div>
<p>  </p>
<p></p>


<footer className="relative mt-32">
  {/* Wave */}
  <div className="absolute -top-24 left-0 w-full overflow-hidden leading-none">
    <svg
      viewBox="0 0 1440 320"
      className="w-full h-24"
      preserveAspectRatio="none"
    >
      <path
        fill="#05163f"
        d="M0,224L80,208C160,192,320,160,480,170.7C640,181,800,235,960,245.3C1120,256,1280,224,1360,208L1440,192L1440,320L0,320Z"
      />
    </svg>
  </div>

  <div className=" text-white">
   

    <div className="mx-auto max-w-7xl px-6 py-12" style={{background: '#05163f'}}>

        {/* Top Section */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4" >

          {/* Account */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Account
            </h3>

            <ul className="space-y-3">
              <li>
                <Link href="/register" className="hover:text-white transition">
                  Sign Up
                </Link>
              </li>

              <li>
                <Link href="/login" className="hover:text-white transition">
                  Login
                </Link>
              </li>

            
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Company
            </h3>

            <ul className="space-y-3">
              <li>
                <Link href="/legal" className="hover:text-white transition">
                  About Us
                </Link>
              </li>

              <li>
                <Link href="/careers" className="hover:text-white transition">
                  Join Our Team
                </Link>
              </li>

              <li>
                <Link href="/partners" className="hover:text-white transition">
                  Partner With Us
                </Link>
              </li>

              
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Support
            </h3>

            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact Information
                </Link>
              </li>

              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Report an Issue
                </Link>
              </li>

              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Help Center
                </Link>
              </li>

              <li>
                <Link href="/faq" className="hover:text-white transition">
                  FAQs
                </Link>
              </li>

              
            </ul>
          </div>

          {/* Download & Legal */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              More
            </h3>

            <ul className="space-y-3">
              <li>
                <Link href="/download" className="hover:text-white transition">
                  Download the App
                </Link>
              </li>

              

              <li>
                <Link href="/legal" className="hover:text-white transition">
                  Terms of Service
                </Link>
              </li>

              <li>
                <Link href="/cookies" className="hover:text-white transition">
                  Cookie Policy
                </Link>
              </li>

              
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="my-8 border-t border-gray-800"></div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">

          <p className="text-sm text-gray-500">
            © {currentYear} Swyft access. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm">
            <Link href="/login" className="hover:text-white transition">
              Login
            </Link>

            <Link href="/legal" className="hover:text-white transition">
              Terms
            </Link>

            <Link href="/register" className="hover:text-white transition">
              Signup
            </Link>

            <Link href="/contact" className="hover:text-white transition">
              Contact us
            </Link>
          </div>

        </div>

      </div>
      </div>
      </footer>
     </div>

  )
}