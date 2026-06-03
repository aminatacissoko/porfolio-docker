// APropos — section "À propos de moi"
function APropos() {
  return (
    <section id="apropos" className="py-20 bg-gray-900">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">

        {/* Texte de présentation */}
        <div className="flex-1">
          <h2 className="text-4xl font-bold text-violet-400 mb-6">À propos de moi</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-4">
            Je m'appelle <span className="text-violet-400 font-semibold">Aminata Cissoko</span>,
            technicienne en cybersécurité diplômée d'une Licence en Sciences Informatiques
            et Mathématiques, spécialité Cybersécurité, à l'Université Numérique Cheikh Hamidou Kane.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed mb-4">
            Passionnée par la sécurité des systèmes d'information, j'ai acquis des compétences
            solides en audit de sécurité, analyse de vulnérabilités, administration système et réseau,
            ainsi qu'en support technique.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            Sérieuse, motivée et curieuse, je suis ouverte aux opportunités en cybersécurité,
            support IT et administration système. Je suis actuellement une formation{' '}
            <span className="text-violet-400 font-semibold">AWS (Amazon Web Services)</span>{' '}
            pour renforcer mes compétences en cloud computing.
          </p>
        </div>

        {/* Carte d'informations */}
        <div className="flex-1 bg-gray-800 rounded-2xl p-8 shadow-xl">
          <ul className="space-y-4 text-gray-300">
            <li><span className="text-violet-400 font-semibold">Formation :</span> Cybersécurité / AWS Cloud</li>
            <li><span className="text-violet-400 font-semibold">Localisation :</span> Dakar, Sénégal</li>
            <li><span className="text-violet-400 font-semibold">Technologies :</span> HTML, CSS, JavaScript, Tailwind</li>
            <li><span className="text-violet-400 font-semibold">Langues :</span> Français, Wolof, Anglais</li>
            <li><span className="text-violet-400 font-semibold">Objectif :</span> Devenir développeuse web fullstack</li>
            <li>
              <span className="text-violet-400 font-semibold">Certifications : </span>
              <span className="text-violet-300 font-bold text-xl">4+</span>
            </li>
            <li>
              <span className="text-violet-400 font-semibold">Compétences : </span>
              <span className="text-violet-300 font-bold text-xl">10+</span>
            </li>
          </ul>
        </div>

      </div>
    </section>
  )
}

export default APropos
