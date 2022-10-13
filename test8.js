/**
 * 과거 1등+2등 당첨 번호 중에서 숫자 합계가 min ~ max 인 것
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

    let items = db.collection('wins12').aggregate()
        .project({
            no: 1,
            seq: 1,
            seed: 1,
            seedSummary: { $sum: "$seed" }
        })
        .match({
            seedSummary: { $gte: 100, $lte: 175}
        });

    let count = 1;
    while (yield items.hasNext()) {
        let item = yield items.next();
        console.log(count++, item.no, item.seq, item.seed, item.seedSummary);
    }

    db.close();

    console.timeEnd('this');
});
