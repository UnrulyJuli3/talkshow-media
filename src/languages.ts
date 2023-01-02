export type Sheet = {
    id: string;
    first: string;
};

export type Language = {
    locale: string;
    name: string;
    sheet?: Sheet;
};

const Languages: Language[] = [
    {
        locale: "en",
        name: "English"
    },
    {
        locale: "de",
        name: "Deutsch",
        sheet: {
            id: "1MCyze-GF1tA_FGtt8hs_FyxHeBIPLABEQyJ82BNsJ40",
            first: "1432769374"
        }
    },
    {
        locale: "es",
        name: "Espa\u00f1ol"
    },
    {
        locale: "ru",
        name: "Russian"
    }
];

const getLanguage = (locale: string) => Languages.find(lang => lang.locale === locale)!;

export default Languages;
export { getLanguage };