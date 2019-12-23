import Students from '../models/Students';
import * as Yup from 'yup';
import Help_order from '../models/Help_order';
class Help_oderController{
async store(req,res){
  const schema = Yup.object().shape({
    question: Yup.string().required(),
  });
  if(!(await schema.isValid(req.body))){
    return res.status(400).json({ error: ' falha no preenchimento dos dados'});
  }

    const verifyIdStudent = await Students.findOne({
    where: {id:req.params.id}
  });
  if(!verifyIdStudent){
    return res.status(400).json({ error: 'Estudante não encontrado.'});
  }


  const help_order = await Help_order.create({
    students_id: req.params.id,
    question: req.body.question
  });
  return res.json(help_order);
 }
 async index(req,res){
  const verifyIdStudent = await Students.findOne({
    where: {id:req.params.id}
  });
  if(!verifyIdStudent){
    return res.status(400).json({ error: 'Estudante não encontrado.'});
  }
  const verifyHelpOrder = await Help_order.findAll({
    where: {students_id:req.params.id}
  });
  if(verifyHelpOrder == ""){
    return res.status(400).json({ error: 'Nenhuma solicitação encontrada.'});
  }
  return res.json(verifyHelpOrder);
 }
}
export default new Help_oderController();
