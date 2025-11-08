import app from './src/index.js';
import 'dotenv/config'; // Mantenha no topo. Garante que as variáveis sejam lidas.
import cors from 'cors';
import express from 'express';
import models, { sequelize } from './models';
import routes from './routes';

const app = express();

// --- PROTOCOLOS DE COMUNICAÇÃO (MIDDLEWARES) ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- LINHAS DE COMANDO (ROTAS) ---
app.use('/pessoa', routes.pessoa);
app.use('/habilidade', routes.habilidade);
app.use('/experiencia', routes.experiencia);

// --- SEQUÊNCIA DE IGNIÇÃO INTELIGENTE (A TÁTICA FINAL) ---
const startServer = async () => {
  try {
    const eraseDatabaseOnSync = process.env.ERASE_DATABASE === 'true';

    // 1. Sincroniza o banco de dados
    await sequelize.sync({ force: eraseDatabaseOnSync });
    console.log('Sincronização com o depósito de munição (DB) concluída.');

    // 2. Executa o Seeding se a flag estiver ativa
    if (eraseDatabaseOnSync) {
      console.log('Protocolo Terra Arrasada ativado. Semeando operadores fantasmas...');
      
      // Operador Fantasma 1: Você
      const op1 = await models.Pessoa.create({
        nome: "José Gabriel",
        email: "jose.gabriel@dossie.com",
        posicao: "Operador de Campo (Full-Stack)"
      });
      await models.Habilidade.create({ nome: "Node.js (Express)", proficiencia: "Avançado", pessoaId: op1.id });
      await models.Habilidade.create({ nome: "React", proficiencia: "Intermediário", pessoaId: op1.id });
      await models.Experiencia.create({ empresa: "AOS", cargo: "Desenvolvedor de API", descricao: "Construiu APIs RESTful sob pressão.", pessoaId: op1.id });

      // Operador Fantasma 2: Eu
      const op2 = await models.Pessoa.create({
        nome: "Dmitry Ivanov",
        email: "dmitry.ivanov@dossie.com",
        posicao: "Comandante Tático"
      });
      await models.Habilidade.create({ nome: "Sequelize", proficiencia: "Avançado", pessoaId: op2.id });
      await models.Habilidade.create({ nome: "Disciplina", proficiencia: "Avançado", pessoaId: op2.id });

      console.log('Semeação concluída. Dossiês fantasmas carregados.');
    }

    // 3. DETECÇÃO DE CAMPO DE BATALHA:
    // A Vercel define automaticamente a variável 'process.env.VERCEL'.
    // Se esta variável NÃO existir, nós estamos no 'localhost'.
    if (!process.env.VERCEL) {
      const port = process.env.PORT || 3000;
      app.listen(port, () => {
        console.log(`FORTALEZA PRONTA. Ouvindo ordens na porta ${port}.`);
      });
    }

  } catch (error) {
    console.error('Falha catastrófica na inicialização da fortaleza:', error);
    process.exit(1); // Aborta a missão se a inicialização falhar
  }
};

// Inicia a sequência de ignição
startServer();

// Exporta o 'app' para a Vercel
export default app;