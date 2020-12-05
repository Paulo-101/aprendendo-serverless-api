import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

//Rota de cadastro

usersRouter.post('/', async (request, response) => {
    const { email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
        email,
        password,
    });

    //Para não aparecer a senha na requisição

    const userWithoutPassword = {
        id: user.id,
        password: user.password
    };

    return response.json(userWithoutPassword);
})

export default usersRouter;