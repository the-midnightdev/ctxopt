import { encode } from "@toon-format/toon";
import { estimateTokens } from "./tokenizer.js";
export function analyze(data) {
    const json = JSON.stringify(data);
    const jsonSize = Buffer.byteLength(json, "utf8");
    const toon = encode(data);
    const toonSize = Buffer.byteLength(toon, "utf8");
    const jsonTokens = estimateTokens(json);
    const toonTokens = estimateTokens(toon);
    const tokenSavingsPercent = jsonTokens === 0 ? 0 : ((jsonTokens - toonTokens) / jsonTokens) * 100;
    const byteSavingsPercent = jsonSize === 0 ? 0 : ((jsonSize - toonSize) / jsonSize) * 100;
    const recommendation = toonTokens < jsonTokens ? "toon" : "json";
    return {
        json: {
            bytes: jsonSize,
            estimatedTokens: jsonTokens,
        },
        toon: {
            bytes: toonSize,
            estimatedTokens: toonTokens,
        },
        tokenSavingsPercent,
        byteSavingsPercent,
        recommendation,
    };
}
