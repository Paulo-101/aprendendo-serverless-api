import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import routes from './routes/index';
import AppError from './errors/AppError';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

export const handler: APIGatewayProxyHandler = async (event, _context) => {
    handler.use(cors());
    handler.use(express.json());
    handler.use(routes);

    handler.use((err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof AppError) {
            return response
                .status(err.statusCode)
                .json({ status: 'Error', message: err.message });
        }

        console.log(err);

        return response
            .status(500)
            .json({ status: 'Error', message: 'Internal Server Error' });
    });
}

