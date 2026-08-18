import { analyze } from "../src/analyzer.js";

const data = {
    users: [
        { id: 1, name: "Alice", role: "admin" },
        { id: 2, name: "Bob", role: "developer" }
    ]
};

const result = analyze(data);

if (result.json.bytes <= 0) {
    throw new Error("JSON size should be greater than zero");
}

if (result.toon.bytes <= 0) {
    throw new Error("TOON size should be greater than zero");
}

if (result.toon.bytes >= result.json.bytes) {
    throw new Error("Expected TOON to be smaller for this dataset");
}

if (result.byteSavingsPercent <= 0) {
    throw new Error("Expected positive savings");
}
if (result.tokenSavingsPercent > 100) {
    throw new Error("Token savings cannot exceed 100%");
}

if (result.byteSavingsPercent > 100) {
    throw new Error("Byte savings cannot exceed 100%");
}

if (!["json", "toon"].includes(result.recommendation)) {
    throw new Error("Invalid recommendation");
}

console.log("✓ analyzer test passed");
console.log(result);