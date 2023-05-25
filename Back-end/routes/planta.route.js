const express = require('express');
const app = express();
const plantaRoutes = express.Router();

let Planta = require('../model/Planta');

// api to add planta
plantaRoutes.route('/add').post(function (req, res) {
  let planta = new Planta(req.body);
  planta.save()
  .then(planta => {
    res.status(200).json({'status': 'success','mssg': 'planta added successfully'});
  })
  .catch(err => {
    res.status(409).send({'status': 'failure','mssg': 'unable to save to database'});
  });
});

// api to get plantas
plantaRoutes.route('/').get(function (req, res) {
  Planta.find(function (err, plantas){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','plantas': plantas});
    }
  });
});

// api to get planta
plantaRoutes.route('/planta/:id').get(function (req, res) {
  let id = req.params.id;
  Planta.findById(id, function (err, planta){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','planta': planta});
    }
  });
});

// api to update route
plantaRoutes.route('/update/:id').put(function (req, res) {
    Planta.findById(req.params.id, function(err, planta) {
    if (!planta){
      res.status(400).send({'status': 'failure','mssg': 'Unable to find data'});
    } else {
        planta.nome = req.body.nome;
        planta.especie = req.body.especie;
        planta.regiao = req.body.regiao;
        planta.descricao = req.body.descricao;

        planta.save().then(business => {
          res.status(200).json({'status': 'success','mssg': 'Update complete'});
      })
    }
  });
});

// api for delete
plantaRoutes.route('/delete/:id').delete(function (req, res) {
  Planta.findByIdAndRemove({_id: req.params.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','mssg': 'Delete successfully'});
    }
  });
});

module.exports = plantaRoutes;