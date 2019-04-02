const functions = require("firebase-functions");

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
