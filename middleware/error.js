// Wrapper function to pass errors to error middleware
export const wrap = fn => (req, res, next, ...args) => fn(req, res, next, ...args).catch(err => next(err, req, res, next, ...args));

// Handler if an unknown endpoint is called
// Must be called last in middleware chain
export function invalidPathHandler(req, res, next) {
    res.status(404);
    return res.send({ error: "Error", message: 'Requested Endpoint not found' });
}


export function errorLogger(err, req, res, next) {
    console.log('❌ ' + new Date().toISOString() + ' - ' + err.name + ": " + err.message);
    // console.log('❌ ' + new Date().toISOString(), err);
    if (next) {
        next(err, req, res, next);
    }
}

export function errorHandling(err, req, res, next) {
    const errorResponse = {
        err: err.name,
        message: err.message
    }

    if (err.body) {
        errorResponse.body = err.body;
    }

    if (err.status) {
        res.status(err.status);
    } else {
        res.status(400);
    }

    return res.send(errorResponse);
}