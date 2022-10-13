/**
 * 기존 X등 조합이 seeds 에서 몇 개 인가?
 * 
 * 결론 : 768회차 까지 x 개
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

    let count = 1;
    let items = yield db.collection("wins4").find().toArray();
    for (let item of items) {
        let target = db.collection("seeds").find({ seed: { $all: item.seed } });
        while (yield target.hasNext()) {
            let target_item = yield target.next();

            console.log(`${count} ${item.no} ${item.seq} ${item.seed} --- ${target_item.seq} ${target_item.seed}`);

            count++;
        }
    }



    db.close();

    console.timeEnd('this');
});
