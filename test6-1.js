/**
 * 과거 당첨번호 1등+2등 조합의 각 숫자 합계 분포
 * 
 * 결론 :
 * 
 *   5 단위 : 
 *  10 단위 : 
 *  15 단위 : 
 *  20 단위 : 
 *  25 단위 : 
 *  30 단위 :
 */

'user strict';

let assert = require('assert');
let co = require('co');
let _ = require('lodash');
let MongoClient = require('mongodb').MongoClient;

co(function* () {
    console.time('this');

    let db = yield MongoClient.connect('mongodb://localhost:27017/lottery');

    let count1 = []; // 5 단위 분포
    for (let i = 0; i <= 43; i++) { count1.push(0); }

    let count2 = []; // 10단위 분포
    for (let i = 0; i <= 22; i++) { count2.push(0); }

    let count3 = []; // 15단위 분포
    for (let i = 0; i <= 15; i++) { count3.push(0); }

    let count4 = []; // 20단위 분포
    for (let i = 0; i <= 13; i++) { count4.push(0); }

    let count5 = []; // 25단위 분포
    for (let i = 0; i <= 10; i++) { count5.push(0); }

    let count6 = []; // 30단위 분포
    for (let i = 0; i <= 8; i++) { count6.push(0); }

    let target = db.collection('wins12').find();
    while (yield target.hasNext()) {
        let item = yield target.next();

        //console.log(`${item.no} ${item.seq} [${item.seed}] = ${_.sum(item.seed)}`);

        if (_.sum(item.seed) > 250) {
            count1[0] += 1;
        } else if (_.sum(item.seed) > 245 && _.sum(item.seed) <= 250) {
            count1[1] += 1
        } else if (_.sum(item.seed) > 240 && _.sum(item.seed) <= 245) {
            count1[2] += 1
        } else if (_.sum(item.seed) > 235 && _.sum(item.seed) <= 240) {
            count1[3] += 1;
        } else if (_.sum(item.seed) > 230 && _.sum(item.seed) <= 235) {
            count1[4] += 1;
        } else if (_.sum(item.seed) > 225 && _.sum(item.seed) <= 230) {
            count1[5] += 1;
        } else if (_.sum(item.seed) > 220 && _.sum(item.seed) <= 225) {
            count1[6] += 1;
        } else if (_.sum(item.seed) > 215 && _.sum(item.seed) <= 220) {
            count1[7] += 1;
        } else if (_.sum(item.seed) > 210 && _.sum(item.seed) <= 215) {
            count1[8] += 1;
        } else if (_.sum(item.seed) > 205 && _.sum(item.seed) <= 210) {
            count1[9] += 1;
        } else if (_.sum(item.seed) > 200 && _.sum(item.seed) <= 205) {
            count1[10] += 1;/////////////////////////////////////////// 205
        } else if (_.sum(item.seed) > 195 && _.sum(item.seed) <= 200) {
            count1[11] += 1;
        } else if (_.sum(item.seed) > 190 && _.sum(item.seed) <= 195) {
            count1[12] += 1;
        } else if (_.sum(item.seed) > 185 && _.sum(item.seed) <= 190) {
            count1[13] += 1;///////////////////////////////////////////////////////// 190
        } else if (_.sum(item.seed) > 180 && _.sum(item.seed) <= 185) {
            count1[14] += 1;
        } else if (_.sum(item.seed) > 175 && _.sum(item.seed) <= 180) {
            count1[15] += 1;
        } else if (_.sum(item.seed) > 170 && _.sum(item.seed) <= 175) {
            count1[16] += 1;
        } else if (_.sum(item.seed) > 165 && _.sum(item.seed) <= 170) {
            count1[17] += 1;
        } else if (_.sum(item.seed) > 160 && _.sum(item.seed) <= 165) {
            count1[18] += 1;
        } else if (_.sum(item.seed) > 155 && _.sum(item.seed) <= 160) {
            count1[19] += 1;
        } else if (_.sum(item.seed) > 150 && _.sum(item.seed) <= 155) {
            count1[20] += 1;-------------------------------------------------------
        } else if (_.sum(item.seed) > 145 && _.sum(item.seed) <= 150) {
            count1[21] += 1;
        } else if (_.sum(item.seed) > 140 && _.sum(item.seed) <= 145) {
            count1[22] += 1;
        } else if (_.sum(item.seed) > 135 && _.sum(item.seed) <= 140) {
            count1[23] += 1;
        } else if (_.sum(item.seed) > 130 && _.sum(item.seed) <= 135) {
            count1[24] += 1;
        } else if (_.sum(item.seed) > 125 && _.sum(item.seed) <= 130) {
            count1[25] += 1;
        } else if (_.sum(item.seed) > 120 && _.sum(item.seed) <= 125) {
            count1[26] += 1;------------------------------------------------------
        } else if (_.sum(item.seed) > 115 && _.sum(item.seed) <= 120) {
            count1[27] += 1;
        } else if (_.sum(item.seed) > 110 && _.sum(item.seed) <= 115) {
            count1[28] += 1;
        } else if (_.sum(item.seed) > 105 && _.sum(item.seed) <= 110) {
            count1[29] += 1;
        } else if (_.sum(item.seed) > 100 && _.sum(item.seed) <= 105) {
            count1[30] += 1;
        } else if (_.sum(item.seed) > 95 && _.sum(item.seed) <= 100) {
            count1[31] += 1;/////////////////////////////////////////////////////////// 95
        } else if (_.sum(item.seed) > 90 && _.sum(item.seed) <= 95) {
            count1[32] += 1;
        } else if (_.sum(item.seed) > 85 && _.sum(item.seed) <= 90) {
            count1[33] += 1;
        } else if (_.sum(item.seed) > 80 && _.sum(item.seed) <= 85) {
            count1[34] += 1;
        } else if (_.sum(item.seed) > 75 && _.sum(item.seed) <= 80) {
            count1[35] += 1;
        } else if (_.sum(item.seed) > 70 && _.sum(item.seed) <= 75) {
            count1[36] += 1;
        } else if (_.sum(item.seed) > 65 && _.sum(item.seed) <= 70) {
            count1[37] += 1;///////////////////////////////////////// 65
        } else if (_.sum(item.seed) > 60 && _.sum(item.seed) <= 65) {
            count1[38] += 1;
        } else if (_.sum(item.seed) > 55 && _.sum(item.seed) <= 60) {
            count1[39] += 1;
        } else if (_.sum(item.seed) > 50 && _.sum(item.seed) <= 55) {
            count1[40] += 1;
        } else if (_.sum(item.seed) > 45 && _.sum(item.seed) <= 50) {
            count1[41] += 1;
        } else if (_.sum(item.seed) > 40 && _.sum(item.seed) <= 45) {
            count1[42] += 1;
        } else if (_.sum(item.seed) <= 40) {
            count1[43] += 1;
        }

        if (_.sum(item.seed) > 250) {
            count2[0] += 1;
        } else if (_.sum(item.seed) > 240 && _.sum(item.seed) <= 250) {
            count2[1] += 1
        } else if (_.sum(item.seed) > 230 && _.sum(item.seed) <= 240) {
            count2[2] += 1;
        } else if (_.sum(item.seed) > 220 && _.sum(item.seed) <= 230) {
            count2[3] += 1;
        } else if (_.sum(item.seed) > 210 && _.sum(item.seed) <= 220) {
            count2[4] += 1;
        } else if (_.sum(item.seed) > 200 && _.sum(item.seed) <= 210) {
            count2[5] += 1; ///////////////////////////////////////////// 210
        } else if (_.sum(item.seed) > 190 && _.sum(item.seed) <= 200) {
            count2[6] += 1;
        } else if (_.sum(item.seed) > 180 && _.sum(item.seed) <= 190) {
            count2[7] += 1;/////////////////////////////////////////////////////////// 190
        } else if (_.sum(item.seed) > 170 && _.sum(item.seed) <= 180) {
            count2[8] += 1; 
        } else if (_.sum(item.seed) > 160 && _.sum(item.seed) <= 170) {
            count2[9] += 1; //
        } else if (_.sum(item.seed) > 150 && _.sum(item.seed) <= 160) {
            count2[10] += 1;
        } else if (_.sum(item.seed) > 140 && _.sum(item.seed) <= 150) {
            count2[11] += 1;
        } else if (_.sum(item.seed) > 130 && _.sum(item.seed) <= 140) {
            count2[12] += 1;
        } else if (_.sum(item.seed) > 120 && _.sum(item.seed) <= 130) {
            count2[13] += 1;
        } else if (_.sum(item.seed) > 110 && _.sum(item.seed) <= 120) {
            count2[14] += 1;
        } else if (_.sum(item.seed) > 100 && _.sum(item.seed) <= 110) {
            count2[15] += 1; 
        } else if (_.sum(item.seed) > 90 && _.sum(item.seed) <= 100) {
            count2[16] += 1;////////////////////////////////////////////////////////// 90
        } else if (_.sum(item.seed) > 80 && _.sum(item.seed) <= 90) {
            count2[17] += 1;
        } else if (_.sum(item.seed) > 70 && _.sum(item.seed) <= 80) {
            count2[18] += 1;///////////////////////////////////////////// 70
        } else if (_.sum(item.seed) > 60 && _.sum(item.seed) <= 70) {
            count2[19] += 1;
        } else if (_.sum(item.seed) > 50 && _.sum(item.seed) <= 60) {
            count2[20] += 1;
        } else if (_.sum(item.seed) > 40 && _.sum(item.seed) <= 50) {
            count2[21] += 1;
        } else if (_.sum(item.seed) <= 40) {
            count2[22] += 1;
        }

        if (_.sum(item.seed) > 250) {
            count3[0] += 1;
        } else if (_.sum(item.seed) > 235 && _.sum(item.seed) <= 250) {
            count3[1] += 1
        } else if (_.sum(item.seed) > 220 && _.sum(item.seed) <= 235) {
            count3[2] += 1
        } else if (_.sum(item.seed) > 205 && _.sum(item.seed) <= 220) {
            count3[3] += 1;
        } else if (_.sum(item.seed) > 190 && _.sum(item.seed) <= 205) {
            count3[4] += 1;///////////////////////////////////////////// 205
        } else if (_.sum(item.seed) > 175 && _.sum(item.seed) <= 190) {
            count3[5] += 1;
        } else if (_.sum(item.seed) > 160 && _.sum(item.seed) <= 175) {
            count3[6] += 1; /////////////////////////////////////////////////////// 175
        } else if (_.sum(item.seed) > 145 && _.sum(item.seed) <= 160) {
            count3[7] += 1;--------------------------------------------------
        } else if (_.sum(item.seed) > 130 && _.sum(item.seed) <= 145) {
            count3[8] += 1;
        } else if (_.sum(item.seed) > 115 && _.sum(item.seed) <= 130) {
            count3[9] += 1;
        } else if (_.sum(item.seed) > 100 && _.sum(item.seed) <= 115) {
            count3[10] += 1; 
        } else if (_.sum(item.seed) > 85 && _.sum(item.seed) <= 100) {
            count3[11] += 1;/////////////////////////////////////////////////////// 85
        } else if (_.sum(item.seed) > 70 && _.sum(item.seed) <= 85) {
            count3[12] += 1;//////////////////////////////////////////// 70
        } else if (_.sum(item.seed) > 55 && _.sum(item.seed) <= 70) {
            count3[13] += 1;
        } else if (_.sum(item.seed) > 40 && _.sum(item.seed) <= 55) {
            count3[14] += 1;
        } else if (_.sum(item.seed) <= 40) {
            count3[15] += 1;
        }

        if (_.sum(item.seed) > 250) {
            count4[0] += 1;
        } else if (_.sum(item.seed) > 230 && _.sum(item.seed) <= 250) {
            count4[1] += 1
        } else if (_.sum(item.seed) > 210 && _.sum(item.seed) <= 230) {
            count4[2] += 1
        } else if (_.sum(item.seed) > 190 && _.sum(item.seed) <= 210) {
            count4[3] += 1;////////////////////////////////////////////// 210
        } else if (_.sum(item.seed) > 170 && _.sum(item.seed) <= 190) {
            count4[4] += 1;////////////////////////////////////////////////////////////// 190
        } else if (_.sum(item.seed) > 150 && _.sum(item.seed) <= 170) {
            count4[5] += 1;
        } else if (_.sum(item.seed) > 130 && _.sum(item.seed) <= 150) {
            count4[6] += 1; 
        } else if (_.sum(item.seed) > 110 && _.sum(item.seed) <= 130) {
            count4[7] += 1;
        } else if (_.sum(item.seed) > 90 && _.sum(item.seed) <= 110) {
            count4[8] += 1;////////////////////////////////////////////////////////////// 90
        } else if (_.sum(item.seed) > 70 && _.sum(item.seed) <= 90) {
            count4[9] += 1;
        } else if (_.sum(item.seed) > 50 && _.sum(item.seed) <= 70) {
            count4[10] += 1;/////////////////////////////////////////// 50
        } else if (_.sum(item.seed) > 30 && _.sum(item.seed) <= 50) {
            count4[11] += 1;
        } else if (_.sum(item.seed) > 10 && _.sum(item.seed) <= 30) {
            count4[12] += 1;
        } else if (_.sum(item.seed) <= 10) {
            count4[13] += 1;
        }

        if (_.sum(item.seed) > 250) {
            count5[0] += 1;
        } else if (_.sum(item.seed) > 225 && _.sum(item.seed) <= 250) {
            count5[1] += 1
        } else if (_.sum(item.seed) > 200 && _.sum(item.seed) <= 225) {
            count5[2] += 1///////////////////////////////////////////// 225
        } else if (_.sum(item.seed) > 175 && _.sum(item.seed) <= 200) {
            count5[3] += 1;////////////////////////////////////////////////////////////// 200
        } else if (_.sum(item.seed) > 150 && _.sum(item.seed) <= 175) {
            count5[4] += 1;
        } else if (_.sum(item.seed) > 125 && _.sum(item.seed) <= 150) {
            count5[5] += 1;
        } else if (_.sum(item.seed) > 100 && _.sum(item.seed) <= 125) {
            count5[6] += 1; 
        } else if (_.sum(item.seed) > 75 && _.sum(item.seed) <= 100) {
            count5[7] += 1;////////////////////////////////////////////////////////////// 75
        } else if (_.sum(item.seed) > 50 && _.sum(item.seed) <= 75) {
            count5[8] += 1;/////////////////////////////////////////// 50
        } else if (_.sum(item.seed) > 25 && _.sum(item.seed) <= 50) {
            count5[9] += 1;
        } else if (_.sum(item.seed) <= 25) {
            count5[10] += 1;
        }

        if (_.sum(item.seed) > 250) {
            count6[0] += 1;
        } else if (_.sum(item.seed) > 220 && _.sum(item.seed) <= 250) {
            count6[1] += 1
        } else if (_.sum(item.seed) > 190 && _.sum(item.seed) <= 220) {
            count6[2] += 1///////////////////////////////////////////// 220
        } else if (_.sum(item.seed) > 160 && _.sum(item.seed) <= 190) {
            count6[3] += 1;/////////////////////////////////////////////////////////// 190
        } else if (_.sum(item.seed) > 130 && _.sum(item.seed) <= 160) {
            count6[4] += 1;
        } else if (_.sum(item.seed) > 100 && _.sum(item.seed) <= 130) {
            count6[5] += 1;/////////////////////////////////////////////////////////// 100
        } else if (_.sum(item.seed) > 70 && _.sum(item.seed) <= 100) {
            count6[6] += 1;/////////////////////////////////////////// 40
        } else if (_.sum(item.seed) > 40 && _.sum(item.seed) <= 70) {
            count6[7] += 1;
        } else if (_.sum(item.seed) <= 40) {
            count6[8] += 1;
        }
    }

    console.log(`05단위 분포 ${count1}`);
    console.log(`10단위 분포 ${count2}`);
    console.log(`15단위 분포 ${count3}`);
    console.log(`20단위 분포 ${count4}`);
    console.log(`25단위 분포 ${count5}`);
    console.log(`30단위 분포 ${count6}`);
    db.close();

    console.timeEnd('this');
});
