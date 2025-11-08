import { Router } from 'express';
import models from '../models';

const router = Router();

// ROTA: Adicionar Experiência a uma Pessoa (POST)
router.post('/', async (req, res) => {
  try {
    const { empresa, cargo, descricao, pessoaId } = req.body;
    if (!pessoaId) {
      return res.status(400).send('Uma experiência deve ser associada a um Operador (pessoaId).');
    }
    const experiencia = await models.Experiencia.create(req.body);
    return res.status(201).json(experiencia);
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
  }
});

// ROTA: Listar todas as Experiências (GET)
router.get('/', async (req, res) => {
  try {
    const experiencias = await models.Experiencia.findAll();
    return res.status(200).json(experiencias);
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
  }
});

// ROTA: Eliminar Experiência (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await models.Experiencia.destroy({
      where: { id: req.params.id },
    });
    if (!deleted) {
      return res.status(404).send('Experiência não encontrada.');
    }
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
  }
});

export default router;