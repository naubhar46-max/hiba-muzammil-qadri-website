// Friendly, non-developer dashboard for the Studio's left-hand navigator.
// Everything here only changes how content is FOUND and LABELLED —
// it does not change, move, or delete any existing content.

export const structure = (S) =>
  S.list()
    .title('Hiba Muzammil Qadri — Website Content')
    .items([
      S.listItem()
        .title('🎵 Songs / Naats / Nasheeds')
        .child(S.documentTypeList('musicItem').title('Songs / Naats / Nasheeds')),

      S.listItem()
        .title('🎬 Videos')
        .child(S.documentTypeList('video').title('Videos')),

      S.listItem()
        .title('💿 Albums')
        .child(S.documentTypeList('project').title('Albums')),

      S.listItem()
        .title('📚 Playlists')
        .child(S.documentTypeList('playlist').title('Playlists')),

      S.listItem()
        .title('🤝 Collaborations')
        .child(S.documentTypeList('collaboration').title('Collaborations')),

      S.listItem()
        .title('📸 Gallery')
        .child(S.documentTypeList('galleryItem').title('Gallery')),

      S.listItem()
        .title('📅 Events')
        .child(S.documentTypeList('event').title('Events')),

      S.listItem()
        .title('📰 News')
        .child(S.documentTypeList('newsPost').title('News')),

      S.listItem()
        .title('🌍 Languages')
        .child(S.documentTypeList('language').title('Languages')),

      S.divider(),

      S.listItem()
        .title('⭐ Featured Content')
        .child(
          S.list()
            .title('Featured Content')
            .items([
              S.listItem()
                .title('Featured Songs')
                .child(
                  S.documentList()
                    .title('Featured Songs')
                    .filter('_type == "musicItem" && featured == true'),
                ),
              S.listItem()
                .title('Featured Videos')
                .child(
                  S.documentList()
                    .title('Featured Videos')
                    .filter('_type == "video" && featured == true'),
                ),
            ]),
        ),

      S.divider(),

      S.listItem()
        .title('📱 Social Media')
        .child(
          S.list()
            .title('Social Media')
            .items([
              S.listItem()
                .title('Social Profiles')
                .child(S.documentTypeList('socialLink').title('Social Profiles')),
              S.listItem()
                .title('Music Platforms')
                .child(S.documentTypeList('musicPlatformLink').title('Music Platforms')),
            ]),
        ),

      S.listItem()
        .title('📩 Contact Inquiries')
        .child(S.documentTypeList('inquiry').title('Contact Inquiries')),

      S.divider(),

      S.listItem()
        .title('👤 Artist Profile & Site Settings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings'),
        ),
    ])
