import { useState, useEffect } from 'react'
import Projet from './Projet'
import AjouterProjet from './AjouterProjet'
import DetaillerProjet from './DetaillerProjet'

// URL de notre fausse API (json-server)
const API_URL = 'http://localhost:5000/api/projects'

// ============================================================
// Dossier — composant principal qui gère TOUTE la liste des projets
// Il est responsable de :
//   - Charger les projets depuis l'API
//   - Ajouter un projet
//   - Supprimer un projet
//   - Afficher les détails d'un projet
//   - Éditer un projet
// ============================================================
function Dossier() {
  // Liste des projets chargés depuis l'API
  const [projets, setProjets] = useState([])

  // true = on montre le formulaire d'ajout
  const [afficherFormulaire, setAfficherFormulaire] = useState(false)

  // Le projet sélectionné pour voir ses détails (null = aucun)
  const [projetSelectionne, setProjetSelectionne] = useState(null)

  // Message de notification (succès ou erreur)
  const [notification, setNotification] = useState(null)

  // Filtre par technologie
  const [filtre, setFiltre] = useState('Tous')

  // ── Charger les projets au démarrage ──
  // useEffect avec [] = "fais ça UNE SEULE FOIS quand le composant apparaît"
  useEffect(() => {
    chargerProjets()
  }, [])

  // Charge tous les projets depuis json-server
  async function chargerProjets() {
    try {
      const reponse = await fetch(API_URL)
      const data = await reponse.json()
      setProjets(data)
    } catch (erreur) {
      afficherNotif(' Impossible de charger les projets. Lance json-server !', 'erreur')
    }
  }

  // Ajoute un nouveau projet via l'API
  async function handleAjouter(nouveauProjet) {
    try {
      const reponse = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nouveauProjet)
      })
      const projetCree = await reponse.json()
      setProjets(prev => [...prev, projetCree])
      setAfficherFormulaire(false)
      afficherNotif(' Projet ajouté avec succès !')
    } catch (erreur) {
      afficherNotif(' Erreur lors de l\'ajout du projet.', 'erreur')
    }
  }

  // Supprime un projet via l'API
  async function handleSupprimer(id) {
  if (!confirm('Supprimer ce projet ?')) return
  try {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    setProjets(prev => prev.filter(p => p._id !== id))
    afficherNotif('🗑 Projet supprimé.')
  } catch (erreur) {
    afficherNotif(' Erreur lors de la suppression.', 'erreur')
  }
}

  // Édite un projet via l'API
  async function handleEditer(projetModifie) {
    try {
      const reponse = await fetch(`${API_URL}/${projetModifie.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projetModifie)
      })
      const projetMisAJour = await reponse.json()
      // On remplace l'ancien projet par le nouveau dans la liste
      setProjets(prev => prev.map(p => p.id === projetMisAJour.id ? projetMisAJour : p))
      setProjetSelectionne(projetMisAJour)
      afficherNotif(' Projet modifié avec succès !')
    } catch (erreur) {
      afficherNotif(' Erreur lors de la modification.', 'erreur')
    }
  }

  // Affiche une notification temporaire
  function afficherNotif(message, type = 'succes') {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  // Toutes les technologies disponibles pour le filtre
  const toutesTechs = ['Tous', ...new Set(projets.flatMap(p => p.technologies))]

  // Projets filtrés selon la technologie choisie
  const projetsFiltres = filtre === 'Tous'
    ? projets
    : projets.filter(p => p.technologies.map(t => t.toLowerCase()).includes(filtre.toLowerCase()))

  // ── AFFICHAGE ──

  // Si un projet est sélectionné, on affiche ses détails
  if (projetSelectionne) {
    return (
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <DetaillerProjet
            projet={projetSelectionne}
            onAnnuler={() => setProjetSelectionne(null)}
            onEditer={handleEditer}
          />
        </div>
      </section>
    )
  }

  // Si le formulaire est ouvert, on l'affiche
  if (afficherFormulaire) {
    return (
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <AjouterProjet
            onAjouter={handleAjouter}
            onAnnuler={() => setAfficherFormulaire(false)}
          />
        </div>
      </section>
    )
  }

  // Sinon on affiche la liste des projets
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* En-tête */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold text-violet-400">Mes Projets</h2>
          <button
            onClick={() => setAfficherFormulaire(true)}
            className="bg-violet-500 hover:bg-violet-600 text-white font-semibold px-6 py-3 rounded-xl transition"
          >
            + Ajouter un projet
          </button>
        </div>

        {/* Filtres par technologie */}
        <div className="flex flex-wrap gap-2 mb-8">
          {toutesTechs.map((tech, index) => (
            <button
              key={index}
              onClick={() => setFiltre(tech)}
              className={`px-4 py-1 rounded-full text-sm transition ${
                filtre === tech
                  ? 'bg-violet-500 text-white font-semibold'
                  : 'bg-gray-700 text-gray-300 hover:bg-violet-500/30'
              }`}
            >
              {tech}
            </button>
          ))}
        </div>

        {/* Liste des projets */}
        {projetsFiltres.length === 0 ? (
          <div className="text-center text-gray-400 py-20">
            <p className="text-5xl mb-4"></p>
            <p className="text-xl">Aucun projet pour l'instant.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projetsFiltres.map(projet => (
              <Projet
                key={projet._id}
                projet={projet}
                onSupprimer={handleSupprimer}
                onCliquerTitre={setProjetSelectionne}
              />
            ))}
          </div>
        )}

      </div>

      {/* Notification toast */}
      {notification && (
        <div className={`fixed bottom-6 right-6 ${
          notification.type === 'erreur' ? 'bg-red-500' : 'bg-violet-500'
        } text-white px-6 py-3 rounded-2xl shadow-2xl z-50 text-sm font-semibold`}>
          {notification.message}
        </div>
      )}

    </section>
  )
}

export default Dossier
