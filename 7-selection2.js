/**
 * 과거 X주까지 미출현 숫자 제외
 * 선호 숫자 포함
 * 연속 조합번호 제외 !!!
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
            { seed: { $all: [9,13,27,44] } },              // 반드시 포함될 선호 숫자
            { seed: { $not: { $all: [2] } } },            // 제외
            { seed: { $not: { $all: [25] } } },
            { seed: { $not: { $all: [26] } } },
            { sum: { $gte: 110, $lte: 175 } }             // 숫자 합계는 140~145 사이
        ]
    }

    let serial = [
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 5],
        [5, 6],
        [6, 7],
        [7, 8],
        [8, 9],
        [9, 10],
        [10, 11],
        [11, 12],
        [12, 13],
        [13, 14],
        [14, 15],
        [15, 16],
        [16, 17],
        [17, 18],
        [18, 19],
        [19, 20],
        [20, 21],
        [21, 22],
        [22, 23],
        [23, 24],
        [24, 25],
        [25, 26],
        [26, 27],
        [27, 28],
        [28, 29],
        [29, 30],
        [30, 31],
        [31, 32],
        [32, 33],
        [33, 34],
        [34, 35],
        [35, 36],
        [36, 37],
        [37, 38],
        [38, 39],
        [39, 40],
        [40, 41],
        [41, 42],
        [42, 43],
        [43, 44],
        [44, 45]
    ];

    let norSerial = { $nor: [] };
    for (let item of serial) {
        norSerial.$nor.push({ seed: { $all: item } });
    }
    query.$and.push(norSerial);

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
    console.log(`--------------- ${count}'s Without Serial Number Combinations`)

    db.close();

    console.timeEnd('this');
});
