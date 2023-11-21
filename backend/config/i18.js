const i18n = require('i18n');

i18n.configure({
    locales: ['en', 'pl'],
    defaultLocale: 'pl',
    directory: __dirname + '/locales',
    objectNotation: true,
    updateFiles: false,
    syncFiles: false,
    cookie: 'lang',
});

module.exports = i18n;