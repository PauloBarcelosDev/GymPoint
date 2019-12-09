import Sequelize from 'sequelize';

import databasConfig from '../config/database';
import  Students from '../app/models/students';
import  Plans from '../app/models/plans';

const models = [Students, Plans];
class Database{
    constructor(){
      this.init();
    }
    init(){
      this.connection = new Sequelize(databasConfig);
      models.map(model =>model.init(this.connection));
    }
}
export default new Database();
