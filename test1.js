/**
 * 768회까지 총 1등 397 연번이 나타남 (52%)
 * 768회까지 총 1등+2등 5376 조합 중 2765 연번이 나타남 (51.4%)
 * 전체 seed 8145060 조합 중 4306680 연번이 나타남 (52.9%)
 * 
 * 결론 : 연번이 있는 seed 를 선택
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

    let double = [
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

    let query = { $or: [] };
    for (let item of double) {
        query.$or.push({ seed: { $all: item } });
    }
    
    let items = yield db.collection("wins12").find(query).sort({ no: -1 }).toArray();
    for (let item of items) {
        console.log(item.no, item.seed);
    }

    db.close();

    console.log('-----------------------------', items.length, 'rows selected.');
    console.timeEnd('this');
});
