import jwt from 'jsonwebtoken';
import Students from '../models/students';
import authConfig from '../../config/auth';
import * as Yup from 'yup';

class SessionController{

    async store(req,res){

      const {email, password } = req.body;
      const user = await Students.findOne({ where: {email}});

      const schema = Yup.object().shape({
        email: Yup.string().email(),
        password: Yup.string(),
      });
      if(!(await schema.isValid(req.body))){
        return res.status(400).json({ error: 'falha no Preenchimento dos campos'});
      }

      if (!user){
        return res.status(401).json({ error: 'E-mail digitado não existe! '})
      }
      if(!(await user.checkPassoword(password))){
        return res.status(401).json({error: 'Senha invalida'});
      }

      if(!user.administrator){
        return res.status(401).json({error: 'Usuario não é Administrador'});
      }
      const {id, name} = user;
      return res.json({
        user: {
          id,
          name,
          email,

        },
        token: jwt.sign({ id },authConfig.secret,{
          expiresIn: authConfig.expiresIn,
        } ),
      })
    }

}
export default new SessionController();
