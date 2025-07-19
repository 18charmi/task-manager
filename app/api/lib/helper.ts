import jwt from 'jsonwebtoken';
import { StringValue } from 'ms';
const JWT_SECRET = process.env.JWT_SECRET || 'my_dev_secret';

export function generateToken(payload: object, expiresIn: StringValue = '1h') {
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn });

    return token;
}
export function validateToken(token: string) {
    const details = jwt.verify(token, JWT_SECRET);

    return details;
}