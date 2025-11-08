const getExperienciaModel = (sequelize, { DataTypes }) => {
  const Experiencia = sequelize.define('experiencia', {
    empresa: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cargo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT, // Permite descrições de missão mais longas
    },
  });

  // Definição da Relação: Uma Experiência pertence a UM Operador.
  Experiencia.associate = (models) => {
    Experiencia.belongsTo(models.Pessoa);
  };

  return Experiencia;
};

export default getExperienciaModel;