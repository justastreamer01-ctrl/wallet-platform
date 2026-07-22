import {
  FaInstagram,
  FaXTwitter,
  FaFacebook,
  FaLinkedin,
  FaDiscord,
  FaTelegram,
} from "react-icons/fa6";

export default function SupportPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-black to-slate-900 px-6">

      {/* Background Glows */}
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[150px]" />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-blue-600/10 blur-[150px]" />

      {/* Card */}
      <div className="relative w-full max-w-4xl rounded-[36px] border border-white/10 bg-white/5 p-12 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.6)]">

        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-cyan-500/10 p-5 ring-1 ring-cyan-400/30">
            <FaDiscord className="text-5xl text-cyan-300" />
          </div>
        </div>

        <h1 className="text-center text-5xl font-bold text-white">
          Need Support?
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-center text-lg leading-8 text-gray-300">
          For support, please contact us on these platforms at:
        </p>

        <div className="mt-12 space-y-5">

          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-cyan-400/40 hover:bg-white/10">
            <div className="flex items-center gap-4">
              <FaInstagram className="text-3xl text-pink-400" />
              <span className="text-lg text-white">Instagram</span>
            </div>

            <span className="text-gray-400">@swyftaccessng</span>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-cyan-400/40 hover:bg-white/10">
            <div className="flex items-center gap-4">
              <FaXTwitter className="text-3xl text-white" />
              <span className="text-lg text-white">X (Twitter)</span>
            </div>

            <span className="text-gray-400">@swyftaccessng</span>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-cyan-400/40 hover:bg-white/10">
            <div className="flex items-center gap-4">
              <FaFacebook className="text-3xl text-blue-400" />
              <span className="text-lg text-white">Facebook</span>
            </div>

            <span className="text-gray-400">@swyftaccessng</span>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-cyan-400/40 hover:bg-white/10">
            <div className="flex items-center gap-4">
              <FaLinkedin className="text-3xl text-sky-400" />
              <span className="text-lg text-white">LinkedIn</span>
            </div>

            <span className="text-gray-400">Swyft access</span>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-cyan-400/40 hover:bg-white/10">
            <div className="flex items-center gap-4">
              <span className="text-lg text-white">Email us at</span>
            </div>

            <span className="text-gray-400">yourveryownhuey@gmail.com</span>
          </div>

        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-gray-500">
          Our support team usually replies within <span className="text-cyan-300">24 hours</span>.
        </div>

      </div>

    </main>
  );
}