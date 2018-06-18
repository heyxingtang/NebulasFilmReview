'use strict';

const Nebulas = require("nebulas");
const Account = Nebulas.Account;
const neb = new Nebulas.Neb(new Nebulas.HttpRequest("https://testnet.nebulas.io"));
const api = neb.api;
const NebPay = require("nebpay.js");
const nebPay = new NebPay();
const contractAddress = "n1s1xEHZcMydu7EaQ3aQVhP3VG8E61ibsjX";

function isInteger(x) {
    return (typeof x === 'number') && (x % 1 === 0);
}

function getAccountNonce(addr, callback) {
    api.getAccountState(addr).then(function (state) {
        callback(null, state['nonce'] - 0);
    }).catch(function (err) {
        console.log("error in get account nonce:" + err.message);
    });
}

function listener(resp) {
    console.log('==================================');
    console.log("resp: " + JSON.stringify(resp));

}

function addReview(id, content, callback) {
    if (isInteger(id - 0)) {
        callback(new Error("Illegal movie id"));
    }

    if (content.length > 128) {
        callback(new Error("Review exceed limit length"));
    }

    let serialNumber = nebPay.call(contractAddress, 0, "addReview", [id, content], {
        listener: listener,
    });

    callback(null, serialNumber);

}

// api.getAccountState("n1Ja9ptL1f2YAM3CkJ5Nxj2A9SRfJYRiPXp").then(function (state) {
//     console.log(state);
// }).catch(function (err) {
//     console.log(err);
// });
//
// api.getNebState().then(function (state) {
//     console.log(state);
// }).catch(function (err) {
//     console.log("error in getNebState" + err.message);
// });
// getAccountNonce("n1Ja9ptL1f2YAM3CkJ5Nxj2A9SRfJYRiPXp", function (err, nonce) {
//     if (err) {
//         console.log('err in call getAccountNonce:' + err.message);
//         return;
//     }
//     console.log(nonce);
// });

addReview("123456", "hhhhhhhhhhhhhhhhh", function (err, serialNumber) {
    if (err) {
        console.log('err in call addreview:' + err.message);
        return;
    }

    nebPay.queryPayInfo(serialNumber).then(function (resp) {
        console.log(resp);
    }).catch(function (err) {
        console.log(err);
    });
})
