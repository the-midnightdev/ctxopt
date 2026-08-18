export interface AnalysisResult {
    json: {
        bytes: number;
        estimatedTokens: number;
    };
    toon: {
        bytes: number;
        estimatedTokens: number;
    };
    tokenSavingsPercent: number;
    byteSavingsPercent: number;
    recommendation: "json" | "toon";
}
export declare function analyze(data: unknown): AnalysisResult;
