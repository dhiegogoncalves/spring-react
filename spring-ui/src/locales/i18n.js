import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import spanishTranslation from './es-PY';
import portugueseTranslation from './pt-BR';

let language = window.navigator.language.slice(0, 2);

if (language !== 'pt' || 'es') language = 'pt';

const resources = {
	es: {
		translation: spanishTranslation,
	},
	pt: {
		translation: portugueseTranslation,
	},
};

i18n.use(initReactI18next).init({
	resources,
	lng: language,
	keySeparator: true,
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
export { language };
