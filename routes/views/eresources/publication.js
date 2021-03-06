var keystone = require('keystone');

exports = module.exports = function(req, res) {
  var view = new keystone.View(req, res);
  var locals = res.locals;
  locals.section = 'eresources';

  locals.data = {

  }

  locals.redirect = '/eresources'
  locals.breadcrumbs = [
    { text: 'E Resources', link: '/eresources'},
    // { text: 'Publications', link: '/eresources/publications'},
  ]

  var pubId = req.params.publication

  view.query('publication', keystone.list('Publication').model.findOne({_id: pubId}).populate('industry sector commodity publicationLine'));

  view.render('eresources/publication');

}