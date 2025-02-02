import { RankingEvent } from "./ranking.event";
export declare class RankingErrorEvent extends RankingEvent {
    readonly code: number;
    readonly message: string;
    constructor(code: number, message: string);
}
