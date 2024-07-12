const GroupService = require("../src/services/group");
const UserService = require("../src/services/user");

// GroupService.getPaymentsGraphByGroupId(1).then((paymentGraph) => {
//     console.log(JSON.stringify(paymentGraph, getCircularReplacer(), 2));
// });

// function getCircularReplacer() {
//     const seen = new WeakSet();
//     return (key, value) => {
//         if (typeof value === "object" && value !== null) {
//             if (seen.has(value)) {
//                 return;
//             }
//             seen.add(value);
//         }
//         return value;
//     };
// }

UserService.decodeJWTToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ3NjMxODI4LTU5OTktNGQ0MS04YmYzLWNiYzhjZWRmMWEzNiIsImVtYWlsIjoiYWxleDJAZ21haWwuY29tIiwiaWF0IjoxNzIwNzgzNTM5LCJleHAiOjE3MjA3ODcxMzl9.-e2kjP4s5s5J4wHnhAw5_Dfkis7hp_qPX7PQ4MTU-sU", "61deb99f7cbb03c8b2d12fb67fb922147995643507dae1e98fe55af503210551");
