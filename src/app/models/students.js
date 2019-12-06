import Sequelize, {Model} from 'sequelize';
import bcrypt from 'bcryptjs';


class Students extends Model{
  static init(sequelize){
    super.init({
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.VIRTUAL,
      password_hash: Sequelize.STRING,
      administrator: Sequelize.BOOLEAN,
      idade:Sequelize.INTEGER,
      peso: Sequelize.FLOAT,
      altura: Sequelize.INTEGER
    },{
      sequelize,

    });
    this.addHook('beforeSave',  async students =>{
      if(students.administrator == true){
        if ( students.password){
          students.password_hash = await bcrypt.hash(students.password, 8);
        }
      }
    });
    return this;
  }
 checkPassoword(password){
   return bcrypt.compare(password, this.password_hash);
 }


}

export default Students;
