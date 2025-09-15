export default (err, req, res, next) => {
    if(process.env.env === 'DEV') {
        console.log(err);
    }
    res.status(err.statusCode).json(err);
    next();
}

