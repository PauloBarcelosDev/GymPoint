import Checkin from '../models/Checkin';
import {endOfWeek ,startOfWeek} from 'date-fns';
import { Op } from 'sequelize';
class CheckinsControllers{
async store(req,res){
  const students_id = req.params.id;
  const verifychekin = await Checkin.findAll({
    where:{
      students_id,
      created_at:{
        [Op.between]: [startOfWeek(new Date()), endOfWeek(new Date())],
      },
    }
  })
  if(verifychekin.length > 5){
    return res.status(401).json({ error: ' Somente é possivel realizar 5 checkins na semana'});
  }
  const checkins = await Checkin.create({
    students_id
  });

  return res.json(checkins);
}
async index(req,res){
  const verifychekin = await Checkin.findAll({
    where:{
      students_id: req.params.id,
    }
  });
  return res.json(verifychekin);
}
}
export default new CheckinsControllers();
