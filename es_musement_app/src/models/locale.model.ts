export const LOCALES: Locale[] = [
    {id: "en", name: 'English', icon: "uk-flag"},
    {id: "it", name: 'Italiano', icon: "it-flag"}
];

export interface Locale {
    id: string,
    name: string,
    icon: string,
}
