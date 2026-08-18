export function estimateTokens(text) {
    if (text.length === 0) {
        return 0;
    }
    return Math.ceil(text.length / 4);
}
