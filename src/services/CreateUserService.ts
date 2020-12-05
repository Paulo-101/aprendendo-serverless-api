import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
    email: string;
    password: string;
}


class CreateUserService {
    public async execute({ email, password }: Request): Promise<User> {
        const usersRepository = getRepository(User);

        const checkUserExists = await usersRepository.findOne({
            where: { email },
        });

        if (checkUserExists) {
            throw new AppError('Email already used');
        }

        const hashedPassword = await hash(password, 8);

        const user = usersRepository.create({
            email,
            password: hashedPassword,
        });

        await usersRepository.save(user);

        return user;

    }
}

export default CreateUserService;