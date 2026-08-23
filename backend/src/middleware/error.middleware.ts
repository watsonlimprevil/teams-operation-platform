import {Request , Response , NextFunction}  from 'express';

export const errorMiddleware =(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) =>{
    console.error('ERROR:', err);

    const status = err.status || 500;
    const message = err.message || 'Interenal server error';

    res.status(status).json({
        success: false,
        message,
    });
};