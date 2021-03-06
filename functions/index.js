const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require('cors')({
    origin: true
});
admin.initializeApp(functions.config().firebase);

/*
exports.countNameChanges = functions.firestore
    .document("companies/{userId}")
    .onUpdate((change, context) => {
        // Retrieve the current and previous value
        const data = change.after.data();
        const previousData = change.before.data();

        // We'll only update if the name has changed.
        // This is crucial to prevent infinite loops.
        if (data.fname == previousData.fname) return null;

        // Retrieve the current count of name changes
        let count = data.name_change_count;
        if (!count) {
            count = 0;
        }

        // Then return a promise of a set operation to update the count
        return change.after.ref.set(
            {
                name_change_count: count + 1
            },
            { merge: true }
        );
    });
    */
exports.syncTruckOrder = functions.firestore
    .document('/ordered-trucks/{companyID}/ordered-trucks/{truckID}')
    .onWrite((change, context) => {
        // discard the DELETE event

        if (!change.after.exists) {
            return null;
        }

        let companyID = context.params.companyID;
        let truckID = context.params.truckID;

        return admin.firestore().doc(`drivers/${truckID}/orders/${companyID}`)
            .set(change.after.data())
    });

// exports.syncTruckOrderInverse = functions.firestore
//     .document('drivers/{truckID}/orders/{companyID}')
//     .onWrite((change, context) => {
//         let companyID = context.params.companyID;
//         let truckID = context.params.truckID;

//         return admin.firestore().doc(`/ordered-trucks/${companyID}/ordered-trucks/${truckID}`)
//         .set(change.after.data())
//     });


// REMOVED: because inverse function tend to make infinite loops

// exports.syncTripWithDriverTripInverse = functions.firestore
//     .document('drivers/{driverID}/trips/{companyID}')
//     .onWrite((change, context) => {
//         let companyID = context.params.companyID;
//         let driverID = context.params.driverID;

//         return admin.firestore().collection(`/trips`)
//             .where('driverID', '==', driverID)
//             .where('companyID', '==', companyID)
//             .limit(1).get()
//             .then(querySnap => {
//             querySnap.forEach(doc => {
//                 let tripID = doc.id;
//                 admin.firestore().doc(`/trips/${tripID}`).set(change.after.data(), {merge: true});
//             });
//         })
//         // .set(change.after.data(), {merge: true});
//     });

exports.syncTripWithDriverTrip = functions.firestore
    .document('trips/{tripID}')
    .onWrite((change, context) => {
        // discard DELETE event
        if (!change.after.exists) {
            return null;
        }

        let data = change.after.data();
        let driverID = data.driverID;
        let companyID = data.companyID;

        return admin.firestore().doc(`/drivers/${driverID}/trips/${companyID}`)
            .set(change.after.data());
    });

exports.sendNewOrderRequest = functions.firestore
    .document("/order-requests/{companyId}/order-requests/{truckId}")
    .onCreate((snap, context) => {
        let newOrder = snap.data();
        let truck = newOrder.truck;
        let companyId = context.params.companyId;
        let warehouse = newOrder.warehouse;

        return loadUsers(truck.uid, companyId).then(
            ({ truckTokenID, companyData }) => {
                let token = truckTokenID;
                let companyName = companyData.name;

                let payload = {
                    /* notification: {
                        title: "Firebase Notification",
                        body: `You have new order on ${newOrder.date} at ${
                            newOrder.time
                            }`,
                        sound: "default",
                        badge: "1"
                    }, */
                    data: {
                        title: "Firebase Notification",
                        lat: `${warehouse.latitude}`,
                        lng: `${warehouse.longitude}`,
                        date: `${newOrder.date}`,
                        time: `${newOrder.time}`,
                        customerName: companyName,
                        customerId: companyId,
                        sound: "default",
                        badge: "1"
                    }
                };
                return admin.messaging().sendToDevice(token, payload);
            }
        );
    });

function loadUsers(truckID, companyID) {
    return new Promise((resolve, reject) => {
        let dbRef = admin.firestore().doc(`/tokens/${truckID}`);
        dbRef.get().then(
            snap => {
                let data = snap.data();
                resolve(data.token);
            },
            err => {
                reject(err);
            }
        );
    }).then(truckTokenID => {
        return loadCustomer(truckTokenID, companyID);
    });
}
function loadCustomer(truckTokenID, companyID) {
    return new Promise((resolve, reject) => {
        let dbRef = admin.firestore().doc(`users/${companyID}`);
        dbRef.get().then(
            company => {
                const res = { truckTokenID, companyData: company.data() };
                resolve(res);
            },
            err => {
                reject(err);
            }
        );
    });
}

// not used
exports.getTripStats = functions.https.onRequest((req, res) => {
    const customerID = req.query.customerID;


    admin.firestore().collection('completed-trips').where('customerID', '==', customerID)
        .where('')

    cors(req, res, () => {
        res.send({
            'status': 200,
            'data': 'asdf' + req.query.nma
        });

    });
})

// exports.calculateTotalVolume = functions.firestore
//     .document("ordered-trucks/{userId}")
//     .onUpdate((change, context) => {
//         const truck = change.after.data();
//         const previousTruck = change.before.data();

//         console.log(JSON.stringify(change));

//         // let totalVolume = 0;

//         // if (!truck.orders) {
//         //     totalVolume = 0;
//         // } else {
//         //     Object.values(truck.orders).forEach(order => {
//         //         totalVolume += parseFloat(order["volume"]);
//         //     });
//         // }

//         // if (truck.totalVolume == previousData.totalVolume) return null;

//         // // Then return a promise of a set operation to update the count
//         // return change.after.ref.set(
//         //     {
//         //         [``]: count + 1
//         //     },
//         //     { merge: true }
//         // );
//     });
