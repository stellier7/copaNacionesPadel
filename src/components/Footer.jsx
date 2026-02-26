export default function Footer() {
  return (
    <footer className="py-12 px-6 bg-[#0a0a0a] border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <div className="flex items-center gap-2">
            <img
              src="/logo-copa-naciones.png"
              alt="Copa Naciones Pádel"
              className="w-10 h-10 object-contain"
            />
            <span className="text-white font-semibold">Copa Naciones Pádel</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-white/60 hover:text-sky-400 transition text-sm">
              Términos y condiciones
            </a>
            <a href="#" className="text-white/60 hover:text-sky-400 transition text-sm">
              Política de privacidad
            </a>
            <a href="#" className="text-white/60 hover:text-sky-400 transition text-sm">
              Redes sociales
            </a>
          </div>
        </div>
        <div className="text-center text-white/50 text-sm">
          © {new Date().getFullYear()} Copa Naciones Pádel. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}
