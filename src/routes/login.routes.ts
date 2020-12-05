import { Router } from 'express';
import LoginUserService from '../services/AuthenticatedUserService';

const loginRouter = Router();

//Rota de cadastro

loginRouter.post('/', async (request, response) => {
    const { email, password } = request.body;

    const loginUser = new LoginUserService();

    const { user, token } = await loginUser.execute({
        email,
        password,
    });

    const userWithoutPassword = {
        id: user.id,
        email: user.email,
    };

    return response.json({ user: userWithoutPassword, token });




})

export default loginRouter;