// Competences — section des compétences techniques

// Liste des compétences — c'est un tableau d'objets JavaScript
const competences = [
  {
    titre: "Systèmes d'exploitation",
    items: ["Windows (administration)", "Linux (commandes de base, gestion utilisateurs)"]
  },
  {
    titre: "Réseaux",
    items: ["TCP/IP, DHCP, DNS", "Configuration réseau", "Diagnostic & dépannage réseau"]
  },
  {
    titre: "Cybersécurité",
    items: ["Audit de sécurité des SI", "Découverte de vulnérabilités", "Gestion des incidents", "Analyse de logs", "Notions de SOC"]
  },
  {
    titre: "Virtualisation",
    items: ["VMware", "VirtualBox"]
  },
  {
    titre: "Bases de données",
    items: ["MySQL", "SQL Server"]
  },
  {
    titre: "Développement Web",
    items: ["HTML / CSS", "PHP (bases)", "Tailwind CSS", "JavaScript", "React JS"]
  },
  {
    titre: "Cloud Computing",
    items: ["AWS (en formation)", "Notions de cloud infrastructure"]
  },
  {
    titre: "Outils & Logiciels",
    items: ["Wireshark", "Nmap", "Burp Suite (bases)", "Suite Office", "R Studio"]
  },
  {
    titre: "Certificats",
    items: ["Cisco - Networking Essentials", "TryHackMe - Complete Beginner", "TryHackMe - Jr Penetration Tester", "TryHackMe - SOC Level 1"]
  },
  {
    titre: "Langues",
    items: ["Wolof (langue maternelle)", "Français (avancé)", "Anglais (intermédiaire)"]
  }
]

// CarteCompetence — un seul bloc de compétence
// Reçoit "titre" et "items" en props
function CarteCompetence({ titre, items }) {
  return (
    <div className="bg-gray-800 rounded-2xl p-6 shadow-xl">
      <h3 className="text-violet-400 font-bold text-xl mb-4">{titre}</h3>
      <ul className="text-gray-300 space-y-2">
        {/* On affiche chaque item avec .map() */}
        {items.map((item, index) => (
          <li key={index}>✔ {item}</li>
        ))}
      </ul>
    </div>
  )
}

// Competences — affiche toutes les cartes
function Competences() {
  return (
    <section id="competences" className="py-20 bg-gray-950">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-violet-400 mb-12 text-center">Compétences</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* On crée une CarteCompetence pour chaque compétence */}
          {competences.map((comp, index) => (
            <CarteCompetence key={index} titre={comp.titre} items={comp.items} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Competences
