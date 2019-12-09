import Registration from '../models/Registration';
import Plans from '../models/Plans';
import { addMonths, parseISO} from 'date-fns';
import * as Yup from 'yup';
class registrationController{
  async store(req,res){
    const schema = Yup.object().shape({
     students_id: Yup.number().required(),
     plans_id: Yup.number().required(),
     start_date: Yup.date().required(),
    });
    if(!(await schema.isValid(req.body))){
      return res.status(400).json({ error: ' falha no preenchimento dos dados'});
    }
    const { students_id, plans_id, start_date} = req.body;
    const refplano = await Plans.findOne(
    {
      where:{id: plans_id}
    });
    const end_date = addMonths(parseISO(start_date), refplano.duration);
    const total_price = refplano.duration * refplano.price;
    const registration = await Registration.create({
      students_id,
      plans_id,
      start_date,
      end_date,
      total_price,
    })
    return res.json(registration);
  }
}
export default new registrationController();
