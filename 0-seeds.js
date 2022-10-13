/**
 * Seed Generator (45C6 whole combinations = 8,145,060)
 * 
 * seeds : 45C6
 * results : 순차적으로 소거할 조건 처리 이후 최종 seeds
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

    yield db.dropCollection("seeds");
    yield db.dropCollection("results");

    let seeds = yield db.createCollection("seeds");
    let results = yield db.createCollection("results");

    let combinations = G.combination([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45], 6);

    let count = 1;
    for (let seed of combinations) {
        yield seeds.insertOne({ seq: count, seed: seed, sum: _.sum(seed) });
        yield results.insertOne({ seq: count, seed: seed, sum: _.sum(seed) });
        
        console.log(count, seed);

        count++;
    }

    db.close();

    console.timeEnd('this');
});
