import { Dato } from './dato';
export declare class Standard {
    uid: string;
    rawData: any;
    titolo: Dato;
    sottotitolo: Dato;
    importo: number;
    stato: string;
    icon: string;
    collapsingInfo: Dato[];
    importoVisible: boolean;
    localeNumberFormat: string;
    readonly valuta: string;
    constructor(_data?: any);
    protected generateUID(): void;
    getStandardTitle(): string;
    /**
     * Numero in formato valuta €
     * @param value
     * @param code
     * @returns
     */
    currencyFormat(value: number, code: string): string;
}
