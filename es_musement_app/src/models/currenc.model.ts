export const CURRENCIES: Currency[] = [
    {id: "GBP", name: 'GBP', icon: "£"},
    {id: "EUR", name: 'EUR', icon: "€"}
];

export interface Currency {
    id: string,
    name: string,
    icon: string,
}
