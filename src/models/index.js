import Sequelize from 'sequelize';
import getPessoaModel from './pessoa';
import getHabilidadeModel from './habilidade';
import getExperienciaModel from './experiencia';

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
  Pessoa: getPessoaModel(sequelize, Sequelize),
  Habilidade: getHabilidadeModel(sequelize, Sequelize),
  Experiencia: getExperienciaModel(sequelize, Sequelize),
};

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };
export default models;