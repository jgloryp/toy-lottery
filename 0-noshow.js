/**
 * 최근 25주까지 미출현 숫자
 */

'user strict';

let assert = require('assert');
let co = require('co');
let _ = require('lodash');
let G = require('generatorics');
let moment = require('moment');
let MongoClient = require('mongodb').MongoClient;

co(function* () {
    console.time('this');

    let db = yield MongoClient.connect('mongodb://localhost:27017/lottery');
    let wins = db.collection("wins");
    let wins_max = yield wins.findOne({}, { sort: { no: -1 } });

    for (let i = 25; i >= 1; i--) {
        let r = yield wins.find({
            date: {
                $gt: moment(wins_max.date).subtract(i, 'weeks').toDate(),
                $lte: wins_max.date
            }
        }).toArray();

        let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
        for (let item of r) {
            _.pull(numbers, item.first);
            _.pull(numbers, item.second);
            _.pull(numbers, item.third);
            _.pull(numbers, item.fourth);
            _.pull(numbers, item.fifth);
            _.pull(numbers, item.sixth);
            _.pull(numbers, item.bonus);
        }

        console.log(`${numbers} - ${i}주 전부터 현재까지 미출현 숫자`);
    }

    db.close();

    console.timeEnd('this');
});
