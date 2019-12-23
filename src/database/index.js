import Sequelize from 'sequelize';
import databasConfig from '../config/database';
import  Students from '../app/models/Students';
import  Plans from '../app/models/Plans';
import Registration from'../app/models/Registration';
import Checkin from '../app/models/Checkin';
import Help_order from '../app/models/Help_order';

const models = [Students, Plans, Registration, Checkin,Help_order];
class Database{
    constructor(){
      this.init();
    }
    init(){
      this.connection = new Sequelize(databasConfig);
      models.map(model => model.init(this.connection));
      models.map(model => model.associate && model.associate(this.connection.models));
    }
}
export default new Database();
