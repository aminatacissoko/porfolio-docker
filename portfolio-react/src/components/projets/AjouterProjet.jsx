import { useState } from 'react'

// ============================================================
// AjouterProjet — formulaire pour ajouter un nouveau projet
// Reçoit en props :
//   - onAjouter : fonction à appeler avec le nouveau projet
//   - onAnnuler : fonction à appeler quand on annule
// ============================================================
function AjouterProjet({ onAjouter, onAnnuler }) {
  // État local du formulaire — chaque champ a sa propre valeur
  const [titre, setTitre] = useState('')
  const [description, setDescription] = useState('')
  const [technologies, setTechnologies] = useState('')
  const [icone, setIcone] = useState('💡')
  const [github, setGithub] = useState('')
  const [erreur, setErreur] = useState('')

  // Appelé quand on soumet le formulaire
  function handleSoumettre(e) {
    e.preventDefault() // Empêche le rechargement de la page

    // Vérification des champs obligatoires
    if (!titre || !description || !technologies) {
      setErreur('Veuillez remplir tous les champs obligatoires.')
      return
    }

    // On crée l'objet projet
    const nouveauProjet = {
      titre,
      description,
      // On transforme "HTML, CSS, React" en ["HTML", "CSS", "React"]
      technologies: technologies.split(',').map(t => t.trim()).filter(t => t.length > 0),
      icone,
      github
    }

    // On appelle la fonction du composant parent
    onAjouter(nouveauProjet)
  }

  return (
    <div className="bg-gray-800 rounded-2xl p-8 shadow-xl max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-violet-400 mb-6">Ajouter un projet</h2>

      {/* Message d'erreur si champs vides */}
      {erreur && (
        <div className="bg-red-500/20 text-red-300 px-4 py-3 rounded-xl mb-4 text-sm">
          {erreur}
        </div>
      )}

      <div className="space-y-4">

        {/* Titre */}
        <div>
          <label className="block text-violet-400 font-semibold mb-1">Titre *</label>
          <input
            type="text"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            placeholder="Ex: Audit de Sécurité"
            className="w-full bg-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-violet-400 font-semibold mb-1">Description *</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Décrivez votre projet..."
            rows={3}
            className="w-full bg-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>

        {/* Technologies */}
        <div>
          <label className="block text-violet-400 font-semibold mb-1">Technologies * (séparées par des virgules)</label>
          <input
            type="text"
            value={technologies}
            onChange={(e) => setTechnologies(e.target.value)}
            placeholder="Ex: React, Tailwind, Node.js"
            className="w-full bg-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>

        {/* Icône */}
        <div>
          <label className="block text-violet-400 font-semibold mb-1">Icône (emoji)</label>
          <input
            type="text"
            value={icone}
            onChange={(e) => setIcone(e.target.value)}
            placeholder="Ex: 🔒"
            className="w-full bg-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>

        {/* GitHub */}
        <div>
          <label className="block text-violet-400 font-semibold mb-1">Lien GitHub (optionnel)</label>
          <input
            type="url"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            placeholder="https://github.com/..."
            className="w-full bg-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>

        {/* Boutons */}
        <div className="flex gap-4 pt-2">
          <button
            onClick={handleSoumettre}
            className="flex-1 bg-violet-500 hover:bg-violet-600 text-white font-semibold py-3 rounded-xl transition"
          >
            ✅ Ajouter le projet
          </button>
          <button
            onClick={onAnnuler}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-xl transition"
          >
            ❌ Annuler
          </button>
        </div>

      </div>
    </div>
  )
}

export default AjouterProjet
