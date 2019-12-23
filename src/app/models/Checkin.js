import Sequelize, {Model} from 'sequelize';
class Checkin extends Model{
  static init(sequelize){
    super.init(
      {

      },
      {
        sequelize,
      }
      );
      return this;
  }
  static associate(models){

    this.belongsTo(models.Students,{ foreignKey : 'students_id', as:'Students'});

  }
}
export default Checkin;
