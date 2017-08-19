const fs = require('fs');
const mbus = require('./index');

let context = {
    log: (x) => console.log(x),
    res: (x) => console.log(x),
    done: (x) => {
        const that = this;
        console.log('Function completed', that)
    }
}
fs.readFile('./event.json', { encoding: 'utf-8' }, (err, req) => {
    if (err) {
        throw new Error(err);
    }

    const event = JSON.parse(req);

    fs.readFile('./data.csv', (err, buff) => {
        if (err) {
            throw new Error(err);
        }
        event.body = buff;
        
        mbus(context, event);
    });
});
