/**
 * 이번 회차 자동 번호를 4등 조합으로 별도 시드 생성
 * (이 번호는 당첨되지 않을 것이므로 7단계에서 제외됨)
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

    yield db.dropCollection("auto");
    let target = yield db.createCollection("auto");

    // 첫 번 째 자동번호
    let seeds1 = G.combination([1, 2, 3, 4, 5, 6], 3);
    let count1 = 1;
    for (let seed of seeds1) {
        let item = {
            no: 1,
            seq: count1++,
            seed: seed
        };
        yield target.insertOne(item);
        console.log(item.no, item.seq, item.seed);

    }

    // 두 번 째 자동번호
    let seeds2 = G.combination([2, 3, 4, 5, 6, 7], 3);
    let count2 = 1;
    for (let seed of seeds2) {
        let item = {
            no: 2,
            seq: count2++,
            seed: seed
        };
        yield target.insertOne(item);
        console.log(item.no, item.seq, item.seed);
    }

    // 세 번 째 자동번호
    let seeds3 = G.combination([3, 4, 5, 6, 7, 8], 3);
    let count3 = 1;
    for (let seed of seeds3) {
        let item = {
            no: 3,
            seq: count3++,
            seed: seed
        };
        yield target.insertOne(item);
        console.log(item.no, item.seq, item.seed);
    }

    // 네 번 째 자동번호
    let seeds4 = G.combination([4, 5, 6, 7, 8, 9], 3);
    let count4 = 1;
    for (let seed of seeds4) {
        let item = {
            no: 4,
            seq: count4++,
            seed: seed
        };
        yield target.insertOne(item);
        console.log(item.no, item.seq, item.seed);
    }

    // 다섯 번 째 자동번호
    let seeds5 = G.combination([5, 6, 7, 8, 9, 10], 3);
    let count5 = 1;
    for (let seed of seeds5) {
        let item = {
            no: 5,
            seq: count5++,
            seed: seed
        };
        yield target.insertOne(item);
        console.log(item.no, item.seq, item.seed);
    }

    db.close();

    console.timeEnd('this');
});
