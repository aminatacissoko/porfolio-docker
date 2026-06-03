// Composant Navbar - barre de navigation principale
// Composant Navbar - barre de navigation principale
// Navbar — barre de navigation en haut de la page
// Reçoit "page" (page actuelle) et "setPage" (pour changer de page)
function Navbar({ page, setPage }) {
  return (
    <header className="bg-gray-900 shadow-lg sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-violet-400">Aminata Cissoko</h1>
        <ul className="flex gap-6 text-sm font-medium">
          <li>
            <button
              onClick={() => setPage('accueil')}
              className={`hover:text-violet-400 transition ${page === 'accueil' ? 'text-violet-400' : ''}`}
            >
              Accueil
            </button>
          </li>
          <li>
            <a href="#apropos" onClick={() => setPage('accueil')} className="hover:text-violet-400 transition">
              À propos
            </a>
          </li>
          <li>
            <a href="#competences" onClick={() => setPage('accueil')} className="hover:text-violet-400 transition">
              Compétences
            </a>
          </li>
          <li>
            <button
              onClick={() => setPage('projets')}
              className={`hover:text-violet-400 transition ${page === 'projets' ? 'text-violet-400' : ''}`}
            >
              Projets
            </button>
          </li>
          <li>
            <a href="#contact" onClick={() => setPage('accueil')} className="hover:text-violet-400 transition">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
