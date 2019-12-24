import Help_order from '../models/Help_order';
import Students from '../models/Students';
import * as Yup from 'yup';
import Students from '../models/Students';
import Mail from '../../lib/Mail';
class AswerController{
async store(req,res){
  const schema = Yup.object().shape({
    answer: Yup.string().required(),
  });
  if(!(await schema.isValid(req.body))){
    return res.status(400).json({ error: ' falha no preenchimento dos dados'});
  }
  const help_order = await Help_order.findByPk(req.params.id, {
    include: [{
      model: Students,
      as: 'Students',
      attributes: ['name', 'email']
      }]
  });
  help_order.answer_at = new Date();
  help_order.answer = req.body.answer;

 await help_order.save();

 await Mail.sendMail({
  to: `${help_order.Students.name}<${help_order.Students.email}>`,
  subject: 'Resposta GymPoint Solicitação',
  template: 'help_order',
  context:{
    students: help_order.Students.name,
    question: help_order.question,
    answer: help_order.answer,
  }
 });

  return res.json(help_order);
}
async list(req,res){

}
}
export default new AswerController();
