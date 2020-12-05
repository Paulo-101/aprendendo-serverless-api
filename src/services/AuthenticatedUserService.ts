import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}


class LoginUserService {
    public async execute({ email, password }: Request): Promise<Response> {
        const loginRepository = getRepository(User);

        const login = await loginRepository.findOne({ where: { email } });

        if (!login) {
            throw new AppError('Alguma informação incorreta', 401);
        }

        const passwordMatched = await compare(password, login.password);

        if (!passwordMatched) {
            throw new AppError('Alguma informação incorreta', 401);
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: login.id,
            expiresIn,
        });
        return {
            user: login,
            token,
        };

    }
}

export default LoginUserService;