// /src/index.js
import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import models, { sequelize } from './models';
// import routes from './routes'; // Vamos descomentar isso quando tivermos rotas

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/users', routes.user); // Nossas rotas entrarão aqui

const eraseDatabaseOnSync = process.env.ERASE_DATABASE === 'true';

sequelize.sync({ force: eraseDatabaseOnSync }).then(() => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`FORTALEZA PRONTA. Ouvindo ordens na porta ${port}.`);
  });
});

export default app;