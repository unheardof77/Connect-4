import jwt from 'jsonwebtoken';

import { signTokenProp } from './types';

import * as dotenv from 'dotenv'
dotenv.config()

const secret:any = process.env.SECRET;
const expiration = process.env.EXPIRATION;

export const authMiddleware = function ({ req }:any) {
    let token = req.headers.authorization;

    if (req.headers.authorization) {
        token = token.split(' ').pop().trim();
    };

    if (!token) {
        return req;
    };

    try {
        const   {data}:any   = jwt.verify(token, secret, { maxAge: expiration });
        console.log(data);
        req.user = data;
    } catch {
        console.log('Invalid token');
    };

    return req;
};

export const signToken = function ({ username, friends, _id }:signTokenProp): string {
    const payload = { username, friends, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};