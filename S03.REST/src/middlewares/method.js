export default (req, res, next) => {
    console.log(`Request Method: ${req.method}`);
    if(req.method === 'DELETE') {
        req.yannick = 'Attention Lapin Rose';
    }
    next();
}