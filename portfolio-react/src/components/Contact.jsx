// Contact — section de contact
function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-900">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-violet-400 mb-12">Contactez-moi</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-gray-800 rounded-2xl p-6">
            <p className="text-3xl mb-3"></p>
            <p className="text-violet-400 font-semibold mb-2">Email</p>
            <a href="mailto:aminataci20@gmail.com" className="text-gray-300 text-sm hover:text-violet-400 transition">
              aminataci20@gmail.com
            </a>
          </div>

          <div className="bg-gray-800 rounded-2xl p-6">
            <p className="text-3xl mb-3"></p>
            <p className="text-violet-400 font-semibold mb-2">Téléphone</p>
            <a href="tel:+221776085881" className="text-gray-300 text-sm hover:text-violet-400 transition">
              +221 77 608 58 81
            </a>
          </div>

          <div className="bg-gray-800 rounded-2xl p-6">
            <p className="text-3xl mb-3"></p>
            <p className="text-violet-400 font-semibold mb-2">LinkedIn</p>
            <a
              href="https://www.linkedin.com/in/aminata-cissokho-5182861a9"
              target="_blank"
              rel="noreferrer"
              className="text-gray-300 text-sm hover:text-violet-400 transition"
            >
              Voir mon profil
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Contact
