export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-900 px-6 py-20 text-white">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-12 rounded-[32px] border border-white/10 bg-white/5 p-10 backdrop-blur-xl shadow-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Legal
          </p>

          <h1 className="text-5xl font-bold">
            Cookie Policy
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-300">
            This Cookie Policy explains how we use cookies and similar
            technologies to improve your experience while using our website.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 rounded-[32px] border border-white/10 bg-white/5 p-10 backdrop-blur-xl">

          <section>
            <h2 className="mb-3 text-2xl font-semibold">
              What Are Cookies?
            </h2>

            <p className="leading-8 text-gray-300">
              Cookies are small text files stored on your device by your web
              browser. They help websites remember information such as your
              preferences, login status, and browsing activity so that your
              experience is smoother and more personalized.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold">
              How We Use Cookies
            </h2>

            <p className="leading-8 text-gray-300">
              We use cookies to help our website function properly, improve
              performance, remember your preferences, analyze traffic, and
              enhance the overall user experience. Some cookies may also be
              used for security purposes and to help us understand how visitors
              interact with our services.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold">
              Your Consent
            </h2>

            <p className="leading-8 text-gray-300">
              By continuing to browse or use this website, you acknowledge that
              you have read this Cookie Policy and agree to our use of cookies
              as described here. If you do not agree with this policy, you
              should discontinue use of the website or adjust your browser
              settings to limit or disable cookies where possible.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold">
              Managing Cookies
            </h2>

            <p className="leading-8 text-gray-300">
              Most web browsers allow you to control, block, or delete cookies
              through their settings. Please note that disabling certain cookies
              may affect the functionality and performance of some features on
              this website.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold">
              Updates to This Policy
            </h2>

            <p className="leading-8 text-gray-300">
              We may update this Cookie Policy from time to time to reflect
              changes to our practices or applicable laws. Any updates will be
              posted on this page with immediate effect.
            </p>
          </section>

          <div className="mt-10 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-6">
            <p className="text-center text-lg font-medium text-cyan-200">
              By continuing to use this website, you agree to this Cookie
              Policy and our use of cookies.
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}