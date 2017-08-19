const auth = require('basic-auth')

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const user = auth(req);

    context.log(user);

    //TODO: Add support for user lookup!
    if (user.name !== 'admin' || user.pass !== 'password') {
        context.res = {
            status: 401,
            body: 'Unauthorized!'
        };
    }

    else if (req.headers["content-type"] !== 'application/octet-stream') {
        context.res = {
            status: 415,
            body: 'Wrong content-type!'
        };
    }

    else if (parseInt(req.headers['content-length']) <= 0) {
        context.res = {
            status: 411,
            body: 'Content-length to short!'
        };
    }

    else if (req.headers['content-type'] === 'application/octet-stream') {
        context.res = {
            status: 200,
            body: 'ok'
        };
    }
    else {
        context.res = {
            status: 500,
            body: 'Unable to do the event!'
        };
    }
    context.log(context.res.status);
    context.done();
};

function GetEnvironmentVariable(name) {
    return name + ": " + process.env[name];
}