const mongoose = require('mongoose')

const Schema = mongoose.Schema

const wordSchema = new Schema({
  word: { type: String, required: true, unique: true },
  usPhonogram: String,
  ukPhonogram: String,
  translations: [String],
  examType: [String],
  wordforms: [
    {
      _id: { type: Schema.Types.ObjectId, select: false },
      wordform: String,
      value: String
    }
  ],
  sentences: [
    {
      _id: { type: Schema.Types.ObjectId, select: false },
      sentence: String,
      origin: String,
      translation: String,
      source: String
    }
  ],
  phrases: [
    {
      _id: { type: Schema.Types.ObjectId, select: false },
      phrase: String,
      translation: String
    }
  ],
  synonyms: [
    {
      _id: { type: Schema.Types.ObjectId, select: false },
      pos: String,
      translation: String,
      words: [String]
    }
  ],
  language: String
})

const Word = mongoose.model('Word', wordSchema)

module.exports = Word
