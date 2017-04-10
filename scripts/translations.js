function initTranslations($translateProvider) {

    $translateProvider.translations('ro', {
        LAYOUT_HEADER_ABOUT: 'Despre mine',
        LAYOUT_HEADER_GALLERY: 'Galerie foto',
        LAYOUT_HEADER_MUSIC: 'Muzica',
        LAYOUT_HEADER_REPERTOIRE: 'Repertoriu',
        LAYOUT_HEADER_BLOG: 'Blog',
        LAYOUT_HEADER_CONTACT: 'Contact'
    });

    $translateProvider.translations('en', {
        LAYOUT_HEADER_ABOUT: 'About me',
        LAYOUT_HEADER_GALLERY: 'Gallery',
        LAYOUT_HEADER_MUSIC: 'Music',
        LAYOUT_HEADER_REPERTOIRE: 'Repertoire',
        LAYOUT_HEADER_BLOG: 'Blog',
        LAYOUT_HEADER_CONTACT: 'Contact'
    });

    var lang = navigator.languages
         ? navigator.languages[0]
         : (navigator.language || navigator.userLanguage);
    if (lang.indexOf('ro') >= 0) {
        $translateProvider.preferredLanguage('ro');
    }
    else {
        $translateProvider.preferredLanguage('en');
    }
};