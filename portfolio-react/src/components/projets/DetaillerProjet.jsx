import { useState } from 'react'

// ============================================================
// DetaillerProjet — affiche les détails complets d'un projet
// Reçoit en props :
//   - projet : le projet à afficher
//   - onAnnuler : ferme la vue détail
//   - onEditer : sauvegarde les modifications
// ============================================================
function DetaillerProjet({ projet, onAnnuler, onEditer }) {
  // Mode édition : true = on peut modifier, false = on lit seulement
  const [modeEdition, setModeEdition] = useState(false)

  // Copie du projet pour l'édition — on ne modifie pas l'original directement
  const [projetEdite, setProjetEdite] = useState({ ...projet })

  // Met à jour un champ du projet édité
  function handleChanger(champ, valeur) {
    setProjetEdite(prev => ({ ...prev, [champ]: valeur }))
  }

  // Sauvegarde les modifications
  function handleSauvegarder() {
    const projetFinal = {
      ...projetEdite,
      // On re-transforme les technologies si c'est une string
      technologies: typeof projetEdite.technologies === 'string'
        ? projetEdite.technologies.split(',').map(t => t.trim())
        : projetEdite.technologies
    }
    onEditer(projetFinal)
    setModeEdition(false)
  }

  return (
    <div className="bg-gray-800 rounded-2xl p-8 shadow-xl max-w-2xl mx-auto">

      {/* Icône */}
      <div className="text-center text-6xl mb-6">{projet.icone || "💡"}</div>

      {modeEdition ? (
        // ── MODE ÉDITION ──
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-violet-400 mb-4">Modifier le projet</h2>

          <div>
            <label className="block text-violet-400 font-semibold mb-1">Titre</label>
            <input
              type="text"
              value={projetEdite.titre}
              onChange={(e) => handleChanger('titre', e.target.value)}
              className="w-full bg-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div>
            <label className="block text-violet-400 font-semibold mb-1">Description</label>
            <textarea
              value={projetEdite.description}
              onChange={(e) => handleChanger('description', e.target.value)}
              rows={3}
              className="w-full bg-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div>
            <label className="block text-violet-400 font-semibold mb-1">Technologies (séparées par virgules)</label>
            <input
              type="text"
              value={Array.isArray(projetEdite.technologies) ? projetEdite.technologies.join(', ') : projetEdite.technologies}
              onChange={(e) => handleChanger('technologies', e.target.value)}
              className="w-full bg-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div>
            <label className="block text-violet-400 font-semibold mb-1">Icône</label>
            <input
              type="text"
              value={projetEdite.icone}
              onChange={(e) => handleChanger('icone', e.target.value)}
              className="w-full bg-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div>
            <label className="block text-violet-400 font-semibold mb-1">GitHub</label>
            <input
              type="url"
              value={projetEdite.github}
              onChange={(e) => handleChanger('github', e.target.value)}
              className="w-full bg-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div className="flex gap-4 pt-2">
            <button
              onClick={handleSauvegarder}
              className="flex-1 bg-violet-500 hover:bg-violet-600 text-white font-semibold py-3 rounded-xl transition"
            >
               Sauvegarder
            </button>
            <button
              onClick={() => setModeEdition(false)}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-xl transition"
            >
              Annuler
            </button>
          </div>
        </div>

      ) : (
        // ── MODE LECTURE ──
        <>
          <h2 className="text-3xl font-bold text-violet-400 mb-4">{projet.titre}</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">{projet.description}</p>

          <div className="mb-6">
            <p className="text-violet-400 font-semibold mb-2">Technologies :</p>
            <div className="flex flex-wrap gap-2">
              {projet.technologies.map((tech, index) => (
                <span key={index} className="bg-violet-500/20 text-violet-300 text-sm px-4 py-2 rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {projet.github && (
            <a
              href={projet.github}
              target="_blank"
              rel="noreferrer"
              className="text-violet-400 hover:underline block mb-6"
            >
               Voir sur GitHub
            </a>
          )}

          {/* Boutons Annuler et Éditer */}
          <div className="flex gap-4">
            <button
              onClick={onAnnuler}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-xl transition"
            >
              ← Annuler
            </button>
            <button
              onClick={() => setModeEdition(true)}
              className="flex-1 bg-violet-500 hover:bg-violet-600 text-white font-semibold py-3 rounded-xl transition"
            >
               Éditer
            </button>
          </div>
        </>
      )}

    </div>
  )
}

export default DetaillerProjet
