import { useState, useEffect } from 'react'
// Composant Hero - section accueil avec effet machine a ecrire
// Hero — section d'accueil avec effet machine à écrire
function Hero() {
  const [texte, setTexte] = useState('')
  const [indexTexte, setIndexTexte] = useState(0)
  const [indexLettre, setIndexLettre] = useState(0)
  const [enEcriture, setEnEcriture] = useState(true)

  // Liste des textes qui s'écrivent un par un
  const textes = [
    "Aminata Cissoko",
    "Étudiante en Cybersécurité",
    "Passionnée du Cloud AWS",
    "Future IT",
    
  ]

  // useEffect = "fais ça quand le composant apparaît ou quand une valeur change"
  useEffect(() => {
    const texteActuel = textes[indexTexte]

    const timer = setTimeout(() => {
      if (enEcriture) {
        // On ajoute une lettre
        setTexte(texteActuel.substring(0, indexLettre + 1))
        setIndexLettre(prev => prev + 1)

        // Si on a fini d'écrire, on attend 2 secondes puis on efface
        if (indexLettre + 1 === texteActuel.length) {
          setTimeout(() => setEnEcriture(false), 2000)
        }
      } else {
        // On enlève une lettre
        setTexte(texteActuel.substring(0, indexLettre - 1))
        setIndexLettre(prev => prev - 1)

        // Si on a tout effacé, on passe au texte suivant
        if (indexLettre - 1 === 0) {
          setEnEcriture(true)
          setIndexTexte(prev => (prev + 1) % textes.length)
        }
      }
    }, enEcriture ? 100 : 50)

    return () => clearTimeout(timer)
  }, [texte, indexLettre, enEcriture, indexTexte])

  return (
    <section id="hero" className="min-h-screen flex flex-col md:flex-row justify-center items-center text-center md:text-left px-6 gap-12 max-w-6xl mx-auto">
      <div className="flex-1">
        <h2 className="text-5xl font-extrabold text-violet-400 mb-4">
          Bonjour, je suis <span>{texte}</span>
          <span className="animate-pulse text-violet-300">|</span>
        </h2>
        <p className="text-xl text-gray-300 mb-8">Étudiante en cybersécurité et cloud.</p>
      </div>
      <div className="flex-1 flex justify-center">
        <img
          src="/profile.JPG"
          alt="Photo de Aminata"
          className="w-64 h-64 rounded-full object-cover border-4 border-violet-400 shadow-xl"
        />
      </div>
    </section>
  )
}

export default Hero
