/**
 * 과거 X주까지 미출현 숫자 제외
 * 선호 숫자 포함
 * 3연속 조합번호 포함 !!!
 * 
 * (noshow 참고하여 미출현 숫자 조절할 것)
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
    let target = db.collection("results");
    let exception = db.collection("auto");

    let query = {
        $and: [
            { seed: { $all: [9,13,27,44] } },             // 반드시 포함될 선호 숫자
            { seed: { $not: { $all: [2] } } },            // 제외
            { seed: { $not: { $all: [25] } } },
            { seed: { $not: { $all: [26] } } },
            { sum: { $gte: 110, $lte: 175 } }             // 숫자 합계는 140~145 사이
        ]
    }

    let serial = [
        [1, 2, 3],
        [2, 3, 4],
        [3, 4, 5],
        [4, 5, 6],
        [5, 6, 7],
        [6, 7, 8],
        [7, 8, 9],
        [8, 9, 10],
        [9, 10, 11],
        [10, 11, 12],
        [11, 12, 13],
        [12, 13, 14],
        [13, 14, 15],
        [14, 15, 16],
        [15, 16, 17],
        [16, 17, 18],
        [17, 18, 19],
        [18, 19, 20],
        [19, 20, 21],
        [20, 21, 22],
        [21, 22, 23],
        [22, 23, 24],
        [23, 24, 25],
        [24, 25, 26],
        [25, 26, 27],
        [26, 27, 28],
        [27, 28, 29],
        [28, 29, 30],
        [29, 30, 31],
        [30, 31, 32],
        [31, 32, 33],
        [32, 33, 34],
        [33, 34, 35],
        [34, 35, 36],
        [35, 36, 37],
        [36, 37, 38],
        [37, 38, 39],
        [38, 39, 40],
        [39, 40, 41],
        [40, 41, 42],
        [41, 42, 43],
        [42, 43, 44],
        [43, 44, 45]
    ];

    let orSerial = { $or: [] };
    for (let item of serial) {
        orSerial.$or.push({ seed: { $all: item } });
    }
    query.$and.push(orSerial);

    let count = 0;
    let items = target.find(query);
    while (yield items.hasNext()) {
        let item = yield items.next();

        let howMatch = 0;
        let cons = G.combination(item.seed, 3);
        for (let con of cons) {
            howMatch += yield exception.count({ seed: con });
        }
        if (howMatch > 0) {
            // console.log(`NO : ${count++}, SEED : [${item.seed} ], SUM : ${item.sum} ------ ${howMatch}'s Duplicated in Auto Seeds`);
            continue;
        }

        count++;

        console.log(`NO : ${count}, SEED : [${item.seed} ], SUM : ${item.sum}`);
    }
    console.log(`--------------- ${count}'s Within Serial Number Combinations`)

    db.close();

    console.timeEnd('this');
});
