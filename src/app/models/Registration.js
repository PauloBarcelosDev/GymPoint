import Sequelize, {Model} from 'sequelize';
class Registration extends Model{
  static init(sequelize){
    super.init(
      {
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        total_price: Sequelize.FLOAT,
      },
      {
        sequelize,
      }
      );
      return this;
  }
  static associate(models){

    this.belongsTo(models.Students,{ foreignKey : 'students_id', as:'Students'});
    this.belongsTo(models.Plans,{ foreignKey : 'plans_id',as:'Plans'});
  }
}
export default Registration;
