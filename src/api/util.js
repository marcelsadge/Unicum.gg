export function wn8Formula(avg_dmg, avg_spots, avg_frags, avg_def, avg_wr, 
        expDamage, expSpot, expFrag, expDef, expWinRate) {
    const DAMAGEr   = avg_dmg / expDamage;
    const SPOTr     = avg_spots / expSpot;
    const FRAGr     = avg_frags / expFrag;
    const DEFr      = avg_def / expDef;
    const WINr      = avg_wr / expWinRate;

    const WINc     = Math.max(0, (WINr - 0.71) / (1 - 0.71));
    const DAMAGEc  = Math.max(0, (DAMAGEr - 0.22) / (1 - 0.22));
    const FRAGc    = Math.max(0, Math.min(DAMAGEr + 0.2, (FRAGr - 0.12) / (1 - 0.12)));
    const SPOTc    = Math.max(0, Math.min(DAMAGEr + 0.1, (SPOTr - 0.38) / (1 - 0.38)));
    const DEFc     = Math.max(0, Math.min(DAMAGEr + 0.1, (DEFr - 0.1) / (1 - 0.1)));

    const WN8 =
        980 * DAMAGEc +
        210 * DAMAGEc * FRAGc +
        155 * FRAGc * SPOTc +
        75 * DEFc * FRAGc +
        145 * Math.min(1.8, WINc);
    return WN8;
}
