const GroupService = require("../src/services/group");

GroupService.getPaymentsGraphByGroupId(1).then((paymentGraph) => {
    console.log(JSON.stringify(paymentGraph, getCircularReplacer(), 2));
});

function getCircularReplacer() {
    const seen = new WeakSet();
    return (key, value) => {
        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
                return;
            }
            seen.add(value);
        }
        return value;
    };
}
