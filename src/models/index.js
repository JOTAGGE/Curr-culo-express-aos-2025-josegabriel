// /src/models/index.js
import Sequelize from 'sequelize';

const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  omitNull: true
});

const models = {
  // Nossas unidades de combate (Pessoa, Habilidade, etc.) entrarão aqui
};

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };
export default models;