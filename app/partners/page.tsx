export default function PartnershipsPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6">

      {/* Background Glow */}
      <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[150px]" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]" />

      {/* Card */}
      <div className="relative w-full max-w-3xl rounded-[32px] border border-white/10 bg-white/5 p-12 text-center backdrop-blur-xl shadow-2xl">

        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/10 text-4xl">
          🤝
        </div>

        <p className="mb-3 text-sm uppercase tracking-[0.35em] text-blue-400">
          Partnerships
        </p>

        <h1 className="text-5xl font-bold text-white">
          Let's Build Something Together
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
          We're always open to discussing meaningful partnerships,
          collaborations, sponsorships, and business opportunities.
        </p>

        <div className="mt-10 rounded-2xl border border-blue-500/20 bg-black/30 p-6">

          <p className="text-gray-400">
            For partnerships, please send an email to
          </p>

          <a
            href="mailto:yourveryownhuey@gmail.com"
            className="mt-3 block text-2xl font-semibold text-blue-400 transition hover:text-cyan-300"
          >
            yourveryownhuey@gmail.com
          </a>

        </div>

        <p className="mt-8 text-sm text-gray-500">
          We aim to respond to partnership enquiries within 2–3 business days.
        </p>

      </div>

    </main>
  );
}