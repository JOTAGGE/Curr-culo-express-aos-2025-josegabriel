import routes from './routes';
//import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import models, { sequelize } from './models';


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/users', routes.user); // Nossas rotas entrarão aqui

const eraseDatabaseOnSync = process.env.ERASE_DATABASE === 'true';

app.use('/pessoa', routes.pessoa);
app.use('/habilidade', routes.habilidade);
app.use('/experiencia', routes.experiencia);

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  // **INÍCIO DO PROTOCOLO DE SEMEADURA**
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
  // **FIM DO PROTOCOLO DE SEMEADURA**

  // Inicia o servidor DEPOIS que a semeadura estiver completa
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`FORTALEZA PRONTA. Ouvindo ordens na porta ${port}.`);
  });
});

export default app;