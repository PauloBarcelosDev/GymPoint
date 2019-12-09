import Registration from '../models/Registration';
import Plans from '../models/Plans';
import Students from '../models/Students';
import { addMonths, parseISO, format } from 'date-fns';
import * as Yup from 'yup';
import Mail from '../../lib/Mail';
import  pt  from 'date-fns/locale/pt';
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
    const checkStudent = await Registration.findOne({
      where:{students_id: students_id}
    });
    if(checkStudent){
      return res.status(400).json({ error: ' O estudante já esta matriculado! '});
    }
    const refplano = await Plans.findOne(
    {
      where:{id: plans_id},
    });
    const refstudent = await Students.findOne({
      where:{id: students_id},
    });
    const end_date = addMonths(parseISO(start_date), refplano.duration);
    const total_price = refplano.duration * refplano.price;
    const registration = await Registration.create({
      students_id,
      plans_id,
      start_date,
      end_date,
      total_price,
    });
     await Mail.sendMail({
      to: `${refstudent.name}<${refstudent.email}>` ,
      subject: 'Matricula Realizada',
      template: 'registration',
      context:{
        students: refstudent.name,
        plan: refplano.title,
        start_date:  format (parseISO(start_date), "'dia' dd ' mes ' MMMM ' ano 'yyyy'",{
          locale: pt,
        }),
        end_date: format (end_date, "'dia' dd ' mes ' MMMM ' ano 'yyyy'",{
          locale: pt,
        }),
        plan_valor: refplano.price,
        total_valor: total_price,
      },
    });


    return res.json(registration);
  }
}
export default new registrationController();
