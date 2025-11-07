// /src/models/pessoa.js

// Esta função define o modelo para o Sequelize
const getPessoaModel = (sequelize, { DataTypes }) => {
  const Pessoa = sequelize.define('pessoa', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false, // Um soldado sem nome não existe
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Cada operador é único
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    posicao: {
      type: DataTypes.STRING,
      allowNull: false, // A patente ou cargo do operador
    },
  });

  // Definição dos Relacionamentos (A Cadeia de Comando)
  Pessoa.associate = (models) => {
    // Um Operador (Pessoa) tem Muitas Habilidades
    Pessoa.hasMany(models.Habilidade, { onDelete: 'CASCADE' });
    // Um Operador (Pessoa) tem Muitas Experiências
    Pessoa.hasMany(models.Experiencia, { onDelete: 'CASCADE' });
  };

  return Pessoa;
};

export default getPessoaModel;