const router = require('express').Router()
const Message = require('../models/Message')

// POST - Envoyer un message de contact
router.post('/', async (req, res) => {
  try {
    const message = new Message(req.body)
    const saved = await message.save()
    res.status(201).json({ message: 'Message envoyé avec succès', data: saved })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// GET - Récupérer tous les messages
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find()
    res.json(messages)
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

module.exports = router