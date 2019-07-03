export declare class Dato {
    label: string;
    value: string;
    constructor(_data?: any);
    /**
     * datoToString
     * @param separator: default ': '
     * @returns
     */
    datoToString(separator?: string): string;
    /**
     * arraysToString
     * @param labels
     * @param values
     * @param separator: default ' '
     * @returns
     */
    static arraysToString(labels: string[], values: string[], separator?: string): string;
    /**
     * concatStrings
     * @param labels
     * @param separator: default ' '
     * @returns
     */
    static concatStrings(labels: string[], separator?: string): string;
    /**
     * Array of strings to Dato object (label only)
     * @param labels
     * @param values
     * @param separator
     * @returns
     */
    static arraysToDato(labels: string[], values: string[], separator?: string): Dato;
}
