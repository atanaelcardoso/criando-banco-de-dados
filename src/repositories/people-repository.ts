import { Request, Response } from 'express';
import { openDb } from '../configDB';

export async function createTable() {
  openDb().then(db => {
    db.exec('CREATE TABLE IF NOT EXISTS Pessoa ( id INTEGER PRIMARY KEY, nome TEXT, idate INTEGER)');
  });
};

export async function selectPessoas(req: Request, res: Response) {
  openDb().then(db => {
    db.all('SELECT * FROM pessoa')
      .then(pessoas => res.json(pessoas))
  });
};

export async function selectPessoaID(req: Request, res: Response) {
  let id = req.body.id;
  openDb().then(db => {
    db.get('SELECT * FROM pessoa WHERE id=?', [id])
      .then(pessoa => res.json(pessoa));
  });
};

export async function insertPessoa(req: Request, res: Response) {
  let pessoa = req.body;
  openDb().then(db => {
    db.run('INSERT INTO Pessoa (name, idade) VALUES (?,?)', [pessoa.nome, pessoa.idade]);
  });
  res.json({
    "statusCode": 200
  })
};

export async function updatePessoa(req: Request, res: Response) {
  let pessoa = req.body;
  openDb().then(db => {
    db.run('UPDATE Pessoa SET nome=? idade=? WHERE id=? ', [pessoa.nome, pessoa.idade, pessoa.id]);
  });
  res.json({
    "statusCode": 200
  })
};

export async function deletePessoa(req: Request, res: Response) {
  let id = req.body.id;
  openDb().then(db => {
    db.get('DELETE FROM pessoa WHERE id=?', [id])
      .then(res => res)
  });
  res.json({
    "statusCode": 200
  })
};
