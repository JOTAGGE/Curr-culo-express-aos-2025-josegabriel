import { Router } from 'express';
import models from '../models';

const router = Router();

// ROTA: Criar Pessoa (POST)
router.post('/', async (req, res) => {
  try {
    const pessoa = await models.Pessoa.create(req.body);
    return res.status(201).json(pessoa);
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
  }
});

// ROTA: Listar todas as Pessoas (GET)
router.get('/', async (req, res) => {
  try {
    const pessoas = await models.Pessoa.findAll();
    return res.status(200).json(pessoas);
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
  }
});

// ROTA: Obter Pessoa por ID (GET)
router.get('/:id', async (req, res) => {
  try {
    const pessoa = await models.Pessoa.findByPk(req.params.id, {
      include: [models.Habilidade, models.Experiencia], // IMPORTANTE: Traz as relações junto
    });
    if (!pessoa) {
      return res.status(404).send('Dossiê do Operador não encontrado.');
    }
    return res.status(200).json(pessoa);
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
  }
});

// ROTA: Atualizar Pessoa (PUT)
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await models.Pessoa.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) {
      return res.status(404).send('Dossiê do Operador não encontrado.');
    }
    const updatedPessoa = await models.Pessoa.findByPk(req.params.id);
    return res.status(200).json(updatedPessoa);
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
  }
});

// ROTA: Eliminar Pessoa (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await models.Pessoa.destroy({
      where: { id: req.params.id },
    });
    if (!deleted) {
      return res.status(404).send('Dossiê do Operador não encontrado.');
    }
    return res.status(204).send(); // Sucesso, sem conteúdo
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
  }
});

export default router;