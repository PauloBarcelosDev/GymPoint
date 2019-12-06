import * as Yup from 'yup';
import Students from '../models/students';
class StudentsController {
  async store(req,res){
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(6),
      idade: Yup.number(),
      peso: Yup.number(),
       altura: Yup.number(),
    });
    if(!(await schema.isValid(req.body))){
      return res.status(400).json({ error: 'falha no Preenchimento dos campos'});
    }
    const studentsExits = await Students.findOne({ where: {email: req.body.email }});
    if(studentsExits){
      return res.status(400).json({error: 'Estudante já cadadastrado! '});
    }

    const { id , name, email,idade,peso,altura, administrator} = await Students.create(req.body);

    return res.json({
      id,
      name,
      email,
      idade,
      peso,
      altura,
      administrator
    });
  }
  async update (req,res){
      const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string(),
      password: Yup.string()
      .when('oldPassword',(oldPassword, field)=>
        oldPassword ? field.required() : field
      ),
      confirmPassword: Yup.string().when('password',(password, field)=>
      password ? field.required().oneOf([Yup.ref('password')]): field
      ),
    });
    if(!(await schema.isValid(req.body))){
      return res.status(400).json({ error: 'Preenchimento invalido'});
    }
    const {email, oldPassword } = req.body;
    const students = await Students.findByPk(req.userId);

    if ( email ==! students.email){
        const studentsExits = await Students.findOne({ where: { email }});
      if(studentsExits){
        return res.status(400).json({error: 'Email já cadadastrado! '});
       }
    }
      if(oldPassword && !(await students.checkPassoword(oldPassword))){
       return res.status(401).json({error: 'Senha antiga digitada incorretamente.'});
      }

    const { id , name,idade,peso,altura, administrator} = await students.update(req.body);

    return res.json({
      id,
      name,
      email,
      idade,
      peso,
      altura,
      administrator
    });
  }
}
export default new StudentsController();
