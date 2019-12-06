import Sequelize from 'sequelize';

import databasConfig from '../config/database';
import  Students from '../app/models/students'

const models = [Students];
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
