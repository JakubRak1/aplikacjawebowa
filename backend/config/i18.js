const i18n = require('i18n');

i18n.configure({
    locales: ['en', 'pl'],
    defaultLocale: 'en',
    directory: __dirname + '/locales',
    objectNotation: true,
    updateFiles: false,
    syncFiles: false,
});

module.exports = i18n;