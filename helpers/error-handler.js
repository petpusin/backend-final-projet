function errorHandler(err,req,res,next) {
    if(err.name === 'UnauthorizedError'){
       return res.status(500).json({massage: "The user is not autherized"});

    }
    if (err.name === 'ValidtionError') {
        return res.status(401).json({massage: err});
    }

    return res.status(500).json(err);
}

module.exports = errorHandler;
