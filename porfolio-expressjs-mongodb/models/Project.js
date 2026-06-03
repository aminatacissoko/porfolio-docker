const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  technologies: [String],
  lienGithub: { type: String },
  lienDemo: { type: String },
}, { timestamps: true })

module.exports = mongoose.model('Project', projectSchema)