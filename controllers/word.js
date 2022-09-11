/* eslint-disable camelcase */
const request = require('../utils/request')
const { Word } = require('../models')

exports.getSuggestResult = function (req, res, next) {
  const { keyword, number } = req.query

  request({
    method: 'get',
    url: 'https://dict.youdao.com/suggest',
    params: {
      num: number || 5,
      q: keyword,
      doctype: 'json'
    }
  })
    .then(data => {
      res.send(data)
    })
    .catch(err => next(err))
}

exports.getSearchResult = function (req, res, next) {
  const keyword = req.query.keyword?.trim().toLowerCase()

  if (!keyword) {
    return res.send({
      result: { msg: 'error', code: 400 },
      data: null
    })
  }

  Word.findOne({ word: keyword })
    .then(word => {
      if (word) {
        return res.send({
          result: { msg: 'success', code: 200 },
          data: word
        })
      }

      return request({
        method: 'get',
        url: 'https://dict.youdao.com/jsonapi',
        params: {
          q: keyword
        }
      }).then(data => {
        const result = {
          word: keyword,
          examType: [],
          translations: [],
          words: [],
          wordforms: [],
          sentences: [],
          phrases: [],
          synonyms: [],
          language: ''
        }
        const { ec, ce, blng_sents_part, phrs, syno, meta } = data

        if (meta) {
          result.language = meta.guessLanguage
        }

        if (ec) {
          const { exam_type, word } = ec
          if (exam_type) {
            result.examType = exam_type
          }
          if (word) {
            const { usphone, ukphone, trs, wfs } = word[0]
            if (usphone) {
              result.usPhonogram = usphone
            }
            if (usphone) {
              result.ukPhonogram = ukphone
            }
            if (trs) {
              for (const { tr } of trs) {
                result.translations.push(tr[0].l.i[0])
              }
            }
            if (wfs) {
              for (const {
                wf: { name, value }
              } of wfs) {
                result.wordforms.push({
                  wordform: name,
                  value
                })
              }
            }
          }
        }

        if (ce) {
          const { word } = ce
          if (word) {
            const { trs } = word[0]
            if (trs) {
              for (const { tr } of trs) {
                const text = tr[0].l.i[1]['#text']
                const translation = tr[0].l['#tran']
                result.words.push({ text, translation })
              }
            }
          }
        }

        if (blng_sents_part) {
          for (const item of blng_sents_part['sentence-pair']) {
            result.sentences.push({
              sentence: item['sentence-eng'],
              origin: item['sentence'],
              translation: item['sentence-translation'],
              source: item['source']
            })
          }
        }

        if (phrs) {
          for (const {
            phr: { headword, trs }
          } of phrs.phrs) {
            result.phrases.push({
              phrase: headword.l.i,
              translation: trs[0].tr.l.i
            })
          }
        }

        if (syno) {
          for (const {
            syno: { pos, tran, ws }
          } of syno.synos) {
            const words = []
            result.synonyms.push({
              pos,
              translation: tran,
              words
            })
            for (const { w } of ws) {
              words.push(w)
            }
          }
        }

        if (result.language === 'eng' && result.translations.length > 0) {
          const word = new Word(result)
          return word
            .save()
            .then(() =>
              res.send({
                result: { msg: 'success', code: 200 },
                data: word
              })
            )
            .catch(err => next(err))
        }

        return res.send({
          result: { msg: 'success', code: 200 },
          data: result
        })
      })
    })
    .catch(err => next(err))
}
