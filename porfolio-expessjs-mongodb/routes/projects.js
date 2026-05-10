const router = require('express').Router()
const Project = require('../models/Project')

// GET - Récupérer tous les projets
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find()
    res.json(projects)
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

// POST - Créer un nouveau projet
router.post('/', async (req, res) => {
  try {
    const project = new Project(req.body)
    const saved = await project.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// DELETE - Supprimer un projet
router.delete('/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id)
    res.json({ message: 'Projet supprimé avec succès' })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

module.exports = router