/* eslint-disable import/no-named-as-default-member */
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEng from "./en/translation.json";

void i18n.use(LanguageDetector).init({
	fallbackLng: "en", // use en if detected lng is not available

	keySeparator: false, // we do not use keys in form messages.welcome

	interpolation: {
		escapeValue: false, // react already safes from xss
	},

	resources: {
		en: {
			translations: translationEng,
		},
	},
	// have a common namespace used around the full app
	ns: ["translations"],
	defaultNS: "translations",
});

export default i18n;
