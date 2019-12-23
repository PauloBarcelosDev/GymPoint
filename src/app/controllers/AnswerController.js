import Help_order from '../models/Help_order';
import * as Yup from 'yup';
class AswerController{
async store(req,res){
  const schema = Yup.object().shape({
    answer: Yup.string().required(),
  });
  if(!(await schema.isValid(req.body))){
    return res.status(400).json({ error: ' falha no preenchimento dos dados'});
  }
  const help_order = await Help_order.findByPk(req.params.id);
  help_order.answer_at = new Date();
  help_order.answer = req.body.answer;

 await help_order.save();

  return res.json(help_order);
}
async list(req,res){

}
}
export default new AswerController();
