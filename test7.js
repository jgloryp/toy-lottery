/**
 * results 에서 숫자 합계가 min ~ max 인 것
 */

'user strict';

let assert = require('assert');
let co = require('co');
let _ = require('lodash');
let G = require('generatorics');
let MongoClient = require('mongodb').MongoClient;

co(function* () {
    console.time('this');

    let db = yield MongoClient.connect('mongodb://localhost:27017/lottery');

    let items = db.collection('results').find({ sum: { $gte: 105, $lte: 170 } });

    let count = 1;
    while (yield items.hasNext()) {
        let item = yield items.next();
        console.log(count++, item.seq, item.seed, item.sum);
    }

    db.close();

    console.timeEnd('this');
});
