// /src/routes/habilidade.js
import { Router } from 'express';
import models from '../models';

const router = Router();

// ROTA: Adicionar Habilidade a uma Pessoa (POST)
router.post('/', async (req, res) => {
  try {
    // **ANÁLISE TÁTICA:**
    // O 'pessoaId' é crucial. Ele forja a corrente do relacionamento.
    // Uma habilidade não pode existir no vácuo. Ela pertence a um Operador.
    const { nome, proficiencia, pessoaId } = req.body;
    if (!pessoaId) {
      return res.status(400).send('Uma habilidade deve ser associada a um Operador (pessoaId).');
    }
    const habilidade = await models.Habilidade.create({ nome, proficiencia, pessoaId });
    return res.status(201).json(habilidade);
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
  }
});

// ROTA: Listar todas as Habilidades (GET)
router.get('/', async (req, res) => {
  try {
    const habilidades = await models.Habilidade.findAll();
    return res.status(200).json(habilidades);
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
  }
});

// ROTA: Eliminar Habilidade (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await models.Habilidade.destroy({
      where: { id: req.params.id },
    });
    if (!deleted) {
      return res.status(404).send('Habilidade não encontrada.');
    }
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
  }
});

export default router;