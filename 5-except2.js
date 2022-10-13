/**
 * target 에서 과거 2등 조합 제거
 * 
 * 예상 : 0 개 삭제
 */

'user strict';

let assert = require('assert');
let co = require('co');
let _ = require('lodash');
let MongoClient = require('mongodb').MongoClient;

co(function* () {
    console.time('this');

    let db = yield MongoClient.connect('mongodb://localhost:27017/lottery');
    let target = db.collection('results');

    // target 에서 과거 2등 조합 제거
    // let items = yield db.collection("wins2").find().sort({ no: -1 }).toArray();
    let items = yield db.collection("wins2").find({ no: { $eq: 784 } }).sort({ seq: 1 }).toArray();
    for (let item of items) {
        let r = yield target.deleteMany({ seed: { $all: item.seed } });
        console.log(`NO:${item.no}, SEQ:${item.seq}, [${item.seed}] - ${r.result.n} rows deleted in target seeds (except wins2)`);
    }

    db.close();

    console.timeEnd('this');
});
