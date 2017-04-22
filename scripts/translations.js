function initTranslations($translateProvider) {

    $translateProvider.translations('ro', {
        LAYOUT_HEADER_ABOUT: 'Despre mine',
        LAYOUT_HEADER_GALLERY: 'Galerie',
        LAYOUT_HEADER_MUSIC: 'Muzica',
        LAYOUT_HEADER_REPERTOIRE: 'Repertoriu',
        LAYOUT_HEADER_BLOG: 'Blog',
        LAYOUT_HEADER_CONTACT: 'Contact',

        REPERTOIRE_TITLE: "Titlu",
        REPERTOIRE_ARTIST: "Artist",
        REPERTOIRE_FILTER: "Cautare",
        REPERTOIRE_ALL: "Toate",
        REPERTOIRE_W: "Nunta",
        REPERTOIRE_C: "Club"
    });

    $translateProvider.translations('en', {
        LAYOUT_HEADER_ABOUT: 'About me',
        LAYOUT_HEADER_GALLERY: 'Gallery',
        LAYOUT_HEADER_MUSIC: 'Music',
        LAYOUT_HEADER_REPERTOIRE: 'Repertoire',
        LAYOUT_HEADER_BLOG: 'Blog',
        LAYOUT_HEADER_CONTACT: 'Contact',

        REPERTOIRE_TITLE: "Title",
        REPERTOIRE_ARTIST: "Artist",
        REPERTOIRE_FILTER: "Search",
        REPERTOIRE_ALL: "All",
        REPERTOIRE_W: "Weddings",
        REPERTOIRE_C: "Club"
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