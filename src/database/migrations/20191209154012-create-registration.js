module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('registrations', {
      id: {
        type: Sequelize.INTEGER,
        allowNULL: false,
        autoIncrement: true,
        primaryKey: true,
      },
students_id:{
  type: Sequelize.INTEGER,
  references: { model: 'students', key: 'id'},
  onUpdate: 'CASCADE ',
  onDelete: 'SET NULL',
  allowNull: true,
},
plans_id: {
  type: Sequelize.INTEGER,
  references: { model: 'plans', key: 'id'},
  onUpdate: 'CASCADE ',
  onDelete: 'SET NULL',
  allowNull: true,
},
start_date: {
  allowNull: false,
  type: Sequelize.DATE,
},
end_date: {
  allowNull: false,
  type: Sequelize.DATE,
},
total_price:{
  type: Sequelize.FLOAT,
  allowNull: false,
},
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('registrations');
  },
};
