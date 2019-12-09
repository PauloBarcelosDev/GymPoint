import Plans from '../models/plans';
import * as Yup from 'yup';

class StudentsController {
 async store (req,res){
   /**
    * Validação dos dados para realizar a alteração
    */
  const schema = Yup.object().shape({
    title: Yup.string().required(),
    duration: Yup.number().required(),
    price: Yup.number(),
  });
  if(!(await schema.isValid(req.body))){
    return res.status(400).json({ error: 'falha no Preenchimento dos campos'});
  }
  const plansExits = await Plans.findOne({ where: {title: req.body.title }});
  if(plansExits){
    return res.status(400).json({error: 'Plano já cadadastrado! '});
  }
/**
 *  Cadastro dos dados no Banco de dados.
 */
  const { id , title, duration ,price } = await Plans.create(req.body);
/**
 * retorno para o usuario.
 */
  return res.json({
    id,
    title,
    duration,
    price,
  });
 }
 async update (req,res){
   /**
    * Validação dos dados para realizar a alteração
    */
   const schema = Yup.object().shape({
    title: Yup.string().required(),
    duration: Yup.number().required(),
    price: Yup.number(),
   });
  if(!(await schema.isValid(req.body))){
    return res.status(400).json({ error: 'falha no Preenchimento dos campos'});
  }
  const plansExits = await Plans.findOne({ where: {title: req.body.title }});
  if(plansExits){
    return res.status(400).json({error: 'Plano já cadadastrado! '});
  }

  /**
   * atualizando os dados no Banco de dados
   */
  const plans = await Plans.findByPk(req.params.id);

  const { id , title, duration ,price } = await plans.update(req.body);
  /**
   * retorno para o usuario.
   */
    return res.json({
     id,
      title,
      duration,
      price,
    });

 }
 async index(req,res){
   const plans = await Plans.findAll({
     attributes: ['title','duration','price'],
   });

   return res.json(plans)
  }
  async delete(req,res){
    const plans = await Plans.findByPk(req.params.id);
    plans.destroy();
    return res.json("Deletado com sucesso!");
  }
}

export default new StudentsController();
