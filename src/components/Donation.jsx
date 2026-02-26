export default function Donation() {
  return (
    <section id="donaciones" className="py-20 sm:py-28 px-6 bg-[#0a0a0a]">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-4">
          Donaciones / Apoyo
        </h2>
        <p className="text-sky-400 text-center text-sm uppercase tracking-widest mb-4">
          Apoya el desarrollo del pádel en Honduras
        </p>
        <p className="text-white/70 text-center mb-12">
          Tu contribución ayuda a financiar canchas, equipamiento y torneos para impulsar
          el deporte nacional.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          {/* Bank transfer */}
          <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span>🏦</span> Transferencia bancaria
            </h3>
            <div className="space-y-2 text-white/70 text-sm">
              <p>Banco: <span className="text-white">Banco Ficohsa</span></p>
              <p>Cuenta: <span className="text-white font-mono">XXXX-XXXX-XXXX</span></p>
              <p>Nombre: <span className="text-white">Copa Naciones Pádel</span></p>
              <p>Referencia: <span className="text-white/60">Tu nombre + Donación</span></p>
            </div>
          </div>

          {/* Crypto */}
          <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span>₿</span> Criptomonedas
            </h3>
            <div className="space-y-2 text-white/70 text-sm">
              <p>Bitcoin (BTC):</p>
              <p className="font-mono text-xs break-all text-sky-400/90">
                bc1qxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
              </p>
              <p className="mt-3">USDT (TRC20):</p>
              <p className="font-mono text-xs break-all text-sky-400/90">
                TXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
              </p>
            </div>
          </div>
        </div>

        {/* QR placeholder */}
        <div className="flex justify-center mb-8">
          <div className="w-40 h-40 rounded-xl border-2 border-dashed border-sky-500/30 flex items-center justify-center bg-white/5">
            <span className="text-4xl">📱</span>
          </div>
        </div>

        <div className="text-center">
          <a
            href="#contacto"
            className="inline-block px-8 py-4 bg-sky-500 hover:bg-sky-400 text-white font-semibold rounded-lg transition-colors"
          >
            Donar
          </a>
        </div>
      </div>
    </section>
  )
}
