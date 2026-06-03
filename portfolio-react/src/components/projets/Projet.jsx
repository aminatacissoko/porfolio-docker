// ============================================================
// Projet — affiche UN seul projet sous forme de carte
// Reçoit en props :
//   - projet : l'objet projet à afficher
//   - onSupprimer : fonction à appeler quand on clique "Supprimer"
//   - onCliquerTitre : fonction à appeler quand on clique sur le titre
// ============================================================
function Projet({ projet, onSupprimer, onCliquerTitre }) {
  return (
    <div className="bg-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-violet-500/20 transition">

      {/* Icône du projet */}
      <div className="bg-violet-500/20 rounded-xl p-4 mb-4 text-center text-4xl">
        {projet.icone || ""}
      </div>

      {/* Titre cliquable — quand on clique, on voit les détails */}
      <h3
        onClick={() => onCliquerTitre(projet)}
        className="text-violet-400 font-bold text-xl mb-2 cursor-pointer hover:underline"
      >
        {projet.titre}
      </h3>

      {/* Description courte */}
      <p className="text-gray-300 text-sm mb-4">{projet.description}</p>

      {/* Technologies sous forme de badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        {projet.technologies.map((tech, index) => (
          <span key={index} className="bg-violet-500/20 text-violet-300 text-xs px-3 py-1 rounded-full">
            {tech}
          </span>
        ))}
      </div>

      {/* Lien GitHub si disponible */}
      {projet.github && (
        <a href={projet.github} target="_blank" rel="noreferrer" className="text-xs text-violet-400 hover:underline block mb-2">
          Voir sur GitHub →
        </a>
      )}

      {/* Bouton Supprimer */}
      <button
        onClick={() => onSupprimer(projet._id)}
        className="mt-2 text-xs text-red-400 hover:text-red-300 transition float-right"
      >
        🗑 Supprimer
      </button>

    </div>
  )
}

export default Projet
