const getHabilidadeModel = (sequelize, { DataTypes }) => {
  const Habilidade = sequelize.define('habilidade', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    proficiencia: {
      type: DataTypes.ENUM('Básico', 'Intermediário', 'Avançado'),
      defaultValue: 'Básico', // Disciplina. Se não for informado, assume o básico.
    },
  });

  // Definição da Relação: Uma Habilidade pertence a UM Operador.
  Habilidade.associate = (models) => {
    Habilidade.belongsTo(models.Pessoa);
  };

  return Habilidade;
};

export default getHabilidadeModel;