/**
 * 4등 조합이 다른 회차 1등+2등 당첨 이력 확인
 * 
 * 결론 : 회차 당 약 10회 정도는 4등 조합이 다른 회차 1등 또는 2등 당첨 (제외)
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

    let wins4_max = yield db.collection("wins4").findOne({}, { sort: { no: -1, seq: -1 } })
    for (let no = 1; no <= wins4_max.no; no++) {
        let wins4_items = yield db.collection("wins4").find({ no: no }).sort({ seq: 1 }).toArray();

        let query = {
            no: { $ne: no },
            $or: []
        };
        for (let item of wins4_items) {
            query.$or.push({ seed: { $all: item.seed } });
        }

        // let wins12_cursor = db.collection("wins12").find(query);
        // while (yield wins12_cursor.hasNext()) {
        //     let item = yield wins12_cursor.next();

        //     console.log(no, item.no, item.seq, item.seed);
        // }
        let wins12_count = yield db.collection("wins12").count(query);
        console.log(no, wins12_count);

    }

    db.close();

    console.timeEnd('this');
});
