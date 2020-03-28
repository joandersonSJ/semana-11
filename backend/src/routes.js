const express = require('express');
const routes =    express.Router();

//Itens para validação
const { celebrate, Segments, Joi } = require('celebrate');

const OngController =           require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController =   require('./controllers/ProfileController')
const SessionController =   require('./controllers/SessionController')

//Rota de login
routes.post('/sessions',SessionController.create);

//Rotas de listagem e cadastro de ongs 
routes.get('/ongs',                OngController.index);
routes.post('/ongs', celebrate({
  //Como é uma constante do js eu preciso colocar entre colchetes porque a chave é uma variavel
  [ Segments.BODY ]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10).max(11),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2)//Posso substituir por max(2)
  })

}), OngController.create);


routes.get('/profile', celebrate({
  //Essa configuração ignora os outros parametros do headers 
  [ Segments.HEADERS ]: Joi.object({
    authorization: Joi.string().required()
  }).unknown()

}) ,ProfileController.index);


routes.get('/incidents', celebrate({
  [ Segments.QUERY ]: Joi.object().keys({
    page: Joi.number()
  })
}) , IncidentController.index);

routes.post('/incidents',      IncidentController.create);

routes.delete('/incidents/:id', celebrate({
  [ Segments.PARAMS ]: Joi.object().keys({
    id: Joi.number().required()
  })
}),IncidentController.delete);

module.exports = routes;