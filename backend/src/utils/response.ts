export const success = (res: any, data:  any = null , message: string ='')=>{
return res.json({
    success: true,
    message,
    data,
});
};


export const failure = (res: any , message: string="" , status:number =400) => {
    return res.status(status).json({
        success: false,
        message,
    });
};