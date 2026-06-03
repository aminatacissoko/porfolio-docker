import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import APropos from './components/APropos'
import Competences from './components/Competences'
import Contact from './components/Contact'
import Dossier from './components/projets/Dossier'

// App est le composant principal — il gère quelle page afficher
function App() {
  // "page" dit quelle page on montre : "accueil" ou "projets"
  const [page, setPage] = useState('accueil')

  return (
    <div className="bg-gray-950 text-white font-sans">
      {/* Navbar reçoit "page" et "setPage" pour naviguer */}
      <Navbar page={page} setPage={setPage} />

      {/* Si page = accueil, on affiche le portfolio */}
      {page === 'accueil' && (
        <>
          <Hero />
          <APropos />
          <Competences />
          <Contact />
        </>
      )}

      {/* Si page = projets, on affiche le gestionnaire de projets */}
      {page === 'projets' && <Dossier />}
    </div>
  )
}

export default App
