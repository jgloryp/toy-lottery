/**
 * wins : 과거 당첨번호 엑셀 파싱
 * 
 * wins1 : 1등 (6개 숫자) = 1개
 * wins2 : 2등 (1등 5개 숫자 와 보너스 1개 조합) = 6개
 * wins3 : 3등 (1등 중 5개 숫자 조합) = 6개
 * wins4 : 4등 (1등 중 4개 숫자 조합) = 15개
 * wins5 : 5등 (1등 중 3개 숫자 조합) = 20개
 * 
 * wins12 : 1등+2등 = 7개
 */

'user strict';

let xlsx = require('xlsx');
let path = require('path');
let assert = require('assert');
let co = require('co');
let _ = require('lodash');
let G = require('generatorics');
let moment = require('moment');
let MongoClient = require('mongodb').MongoClient;

var excelPath = path.join(__dirname, 'wins.xlsx');
var headers = [
    'no',
    'date',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven'
];

co(function* () {
    console.time('this');

    let db = yield MongoClient.connect('mongodb://localhost:27017/lottery');

    yield db.dropCollection("wins");
    yield db.dropCollection("wins1");
    yield db.dropCollection("wins12");
    yield db.dropCollection("wins2");
    yield db.dropCollection("wins3");
    yield db.dropCollection("wins4");
    yield db.dropCollection("wins5");

    let wins = yield db.createCollection("wins");
    let wins1 = yield db.createCollection("wins1");
    let wins12 = yield db.createCollection("wins12");
    let wins2 = yield db.createCollection("wins2");
    let wins3 = yield db.createCollection("wins3");
    let wins4 = yield db.createCollection("wins4");
    let wins5 = yield db.createCollection("wins5");

    let items = yield parseXLSX(excelPath, headers);
    for (let item of items) {
        // 당첨번호 이력 저장
        let wins_item = {
            no: parseInt(item.no),
            date: moment(item.date + '.000000', 'YYYY.MM.DD.HHmmss').toDate(),
            first: parseInt(item.one),
            second: parseInt(item.two),
            third: parseInt(item.three),
            fourth: parseInt(item.four),
            fifth: parseInt(item.five),
            sixth: parseInt(item.six),
            bonus: parseInt(item.seven)
        }
        yield wins.insertOne(wins_item);

        // 1등 당첨번호 저장
        let wins1_item = {
            no: parseInt(item.no),
            seq: 1,
            seed: [
                parseInt(item.one),
                parseInt(item.two),
                parseInt(item.three),
                parseInt(item.four),
                parseInt(item.five),
                parseInt(item.six)
            ],
            sum: parseInt(item.one) +
            parseInt(item.two) +
            parseInt(item.three) +
            parseInt(item.four) +
            parseInt(item.five) +
            parseInt(item.six)
        }
        yield wins1.insertOne(wins1_item);
        console.log(wins1_item.no, wins1_item.seq, wins1_item.seed);

        // 2등 당첨번호 저장
        let seeds2 = G.combination([
            parseInt(item.one),
            parseInt(item.two),
            parseInt(item.three),
            parseInt(item.four),
            parseInt(item.five),
            parseInt(item.six),
            parseInt(item.seven)
        ], 6);
        let count2 = 1;
        for (let seed of seeds2) {
            if (_.isEqual(wins1_item.seed, seed)) // 1등은 2등 컴비네이션에 포함되어서 제외
                continue;

            let wins2_item = {
                no: parseInt(item.no),
                seq: count2++,
                seed: seed,
                sum: _.sum(seed)
            };
            yield wins2.insertOne(wins2_item);
            console.log(wins2_item.no, wins2_item.seq, wins2_item.seed);
        }

        // 1등+2등 당첨번호 저장
        let seeds12 = G.combination([
            parseInt(item.one),
            parseInt(item.two),
            parseInt(item.three),
            parseInt(item.four),
            parseInt(item.five),
            parseInt(item.six),
            parseInt(item.seven)
        ], 6);
        let count12 = 1;
        for (let seed of seeds12) {
            // if (_.isEqual(wins1_item.seed, seed)) // 1등은 2등 컴비네이션에 포함되어서 제외
            //     continue;

            let wins12_item = {
                no: parseInt(item.no),
                seq: count12++,
                seed: seed,
                sum: _.sum(seed)
            };
            yield wins12.insertOne(wins12_item);
            console.log(wins12_item.no, wins12_item.seq, wins12_item.seed);
        }

        // 3등 당첨번호 저장
        let seeds3 = G.combination([
            parseInt(item.one),
            parseInt(item.two),
            parseInt(item.three),
            parseInt(item.four),
            parseInt(item.five),
            parseInt(item.six)
        ], 5);
        let count3 = 1;
        for (let seed of seeds3) {
            let wins3_item = {
                no: parseInt(item.no),
                seq: count3++,
                seed: seed
            };
            yield wins3.insertOne(wins3_item);
            console.log(wins3_item.no, wins3_item.seq, wins3_item.seed);
        }

        // 4등 당첨번호 저장
        let seeds4 = G.combination([
            parseInt(item.one),
            parseInt(item.two),
            parseInt(item.three),
            parseInt(item.four),
            parseInt(item.five),
            parseInt(item.six)
        ], 4);
        let count4 = 1;
        for (let seed of seeds4) {
            let wins4_item = {
                no: parseInt(item.no),
                seq: count4++,
                seed: seed
            };
            yield wins4.insertOne(wins4_item);
            console.log(wins4_item.no, wins4_item.seq, wins4_item.seed);
        }

        // 5등 당첨번호 저장
        let seeds5 = G.combination([
            parseInt(item.one),
            parseInt(item.two),
            parseInt(item.three),
            parseInt(item.four),
            parseInt(item.five),
            parseInt(item.six)
        ], 3);
        let count5 = 1;
        for (let seed of seeds5) {
            let wins5_item = {
                no: parseInt(item.no),
                seq: count5++,
                seed: seed
            };
            yield wins5.insertOne(wins5_item);
            console.log(wins5_item.no, wins5_item.seq, wins5_item.seed);
        }
    }

    db.close();

    console.timeEnd('this');
});
/**
 * xlsx 파일로 부터 json 을 파싱하여 리턴
 * 
 *  filePath
 * 
 * 	headers: [
 * 		'code', 			// 계정코드
 * 		'name', 			// 계정명
 * 		'name_ko_KR',		// 계정명(한글)
 * 		'name_en_US',		// 계정명(영어)
 * 	]
 */
function parseXLSX(filePath, headers) {
    let options = {
        header: headers
    };

    let workbook = xlsx.readFile(filePath);
    let results = [];
    for (let i = 0; i < workbook.SheetNames.length; i++) {
        let worksheet = workbook.Sheets[workbook.SheetNames[i]];
        let parsed = xlsx.utils.sheet_to_json(worksheet, options);
        _.forEach(_.drop(parsed), function (target) {  // 첫 번째 행은 헤더 이므로 drop 하여 리턴
            results.push(target);
        });
    }

    return results;
}