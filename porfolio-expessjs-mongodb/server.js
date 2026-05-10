const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connecté avec succès'))
  .catch(err => console.error('Erreur de connexion MongoDB :', err))

// Import des routes
const projectRoutes = require('./routes/projects')
const contactRoutes = require('./routes/contact')

// Utilisation des routes
app.use('/api/projects', projectRoutes)
app.use('/api/contact', contactRoutes)

// Route de test
app.get('/', (req, res) => {
  res.json({ message: 'Serveur Express en marche !' })
})

// Lancement du serveur
app.listen(process.env.PORT, () => {
  console.log(`Serveur lancé sur le port ${process.env.PORT}`)
})