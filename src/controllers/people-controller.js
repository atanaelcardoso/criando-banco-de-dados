import * as pessoaRepository from '../repositories/people-repository.js';
// const pessoaRepository = require('../repositories/people-repository.js')

// exports.get = async (req, res, next) => {
//   try {
//    var data = await pessoaRepository.get();
//    res.status(200).send(data);
//  } catch (e) {
//    res.status(500).send({
//      message: 'Falha ao processar sua requisicao'
//    });
//  }
// }

exports.selectPessoas = async (req, res, next) => {
  try {
    var data = await pessoaRepository.selectPessoas(req.params.slug);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar sua requisicoa'
    });
  }
}

exports.selectPessoaID = async (req, res, next) => {
  try {
    var data = await pessoaRepository.selectPessoaID(req.params.id)
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar sua requisicoa'
    });
  }
}

exports.insertPessoa = async (req, res, next) => {
  try {
    const data = await pessoaRepository.insertPessoa(req.params.tag)
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar sua requisicoa'
    });
  }
}

exports.insertPessoa = async (req, res, next) => {
  let contract = new validationContract();
  contract.hasMinLen(req.body.title, 3, 'O título de conter pelo menos 3 caracteres');
  contract.hasMinLen(req.body.slug, 3, 'O título de conter pelo menos 3 caracteres');
  contract.hasMinLen(req.body.description, 3, 'O título de conter pelo menos 3 caracteres');

  // se os dados forem inválidos
  if (!contract.isValid()) {
    res.status(400).send(contract.error()).end();
    return;
  }

  try {
    let filename = guind.raw().toString() + '.jpg';
    let rawdata = req.body.image;
    let matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    let type = matches[1];
    let buffer = new Buffer(matches[2], 'base64');

    //{
    //  contentType: type
    //}, function (error, result, response) {
    //  if (error) {
    //    filename = 'default-product.png'
    //  }
    //});
    // await pessoaRepository.create({
    //  title: req.body.title,
    //  slug: req.body.slug,
    //  description: req.body.description,
    //  price: req.body.price,
    //  active: true,
    //  tags: req.body.tags,
    //  image: 'coloca imagem' + filename
    //});  //coloca imagem http
    res.status(201).send({
      message: 'Produto cadasdrado com sucesso'
    });
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar sua requisicao'
    });
  }
};

exports.updatePessoa = async (req, res, next) => {
  try {
    await pessoaRepository.updatePessoa(req.params.id, req.body);
    res.status(200).send({
      message: 'Produto atualizando com sucesso'
    });
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar sua requisicoa'
    });
  }
};

exports.deletePessoa = async (req, res, next) => {
  try {
    await pessoaRepository.deletePessoa(req.body.id);
    res.status(200).send({
      message: 'Produto removido com sucesso'
    });
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao remover o produto'
    });
  }
};