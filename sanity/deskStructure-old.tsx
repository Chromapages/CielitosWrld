import {StructureBuilder} from 'sanity/structure'
import {
  HomeIcon,
  DocumentIcon,
  ImageIcon,
  CogIcon,
  PlusIcon,
  EyeOpenIcon,
  StarIcon,
} from '@sanity/icons'

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Cielitos Wrld Studio')
    .items([
      // Home / Quick Start
      S.listItem()
        .title('Home')
        .icon(HomeIcon)
        .child(
          S.component()
            .component(() => {
              return (
                <div style={{padding: '2rem'}}>
                  <h1 style={{fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem'}}>
                    Welcome to Cielitos Wrld Studio
                  </h1>
                  <p style={{marginBottom: '2rem', fontSize: '1.1rem', color: '#666'}}>
                    Create and manage your photography portfolio and blog posts in under 60 seconds.
                  </p>

                  <div
                    style={{
                      display: 'grid',
                      gap: '1rem',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                      marginBottom: '2rem',
                    }}
                  >
                    <a
                      href="/studio/desk/post;new"
                      style={{
                        padding: '1.5rem',
                        background: '#822c01',
                        color: 'white',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        fontWeight: '600',
                      }}
                    >
                      + New Blog Post
                    </a>
                    <a
                      href="/studio/desk/work;new"
                      style={{
                        padding: '1.5rem',
                        background: '#2c3325',
                        color: 'white',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        fontWeight: '600',
                      }}
                    >
                      + New Work
                    </a>
                  </div>

                  <h2 style={{fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem'}}>
                    Quick Start Guide
                  </h2>
                  <ol style={{lineHeight: '2', fontSize: '1rem'}}>
                    <li>Click "+ New Blog Post" or "+ New Work" above</li>
                    <li>Add a title and upload a cover/hero image</li>
                    <li>Write your excerpt and body content</li>
                    <li>Click "Publish" when ready</li>
                    <li>
                      Your content appears on the site within 60 seconds (automatic refresh)
                    </li>
                  </ol>

                  <div
                    style={{
                      marginTop: '2rem',
                      padding: '1rem',
                      background: '#f0f2ea',
                      borderRadius: '8px',
                    }}
                  >
                    <h3 style={{fontWeight: 'bold', marginBottom: '0.5rem'}}>Image tips:</h3>
                    <ul style={{lineHeight: '1.8'}}>
                      <li>Hero/Cover images: minimum 1600px wide recommended</li>
                      <li>Always add alt text for accessibility</li>
                      <li>Use hotspot/crop to focus on the subject</li>
                    </ul>
                  </div>
                </div>
              )
            })
            .title('Home')
        ),

      S.divider(),

      // Works Section
      S.listItem()
        .title('Works')
        .icon(ImageIcon)
        .child(
          S.list()
            .title('Works')
            .items([
              S.listItem()
                .title('New Work')
                .icon(PlusIcon)
                .child(
                  S.documentTypeList('work')
                    .title('Create New Work')
                    .filter('_type == "work" && _id == "drafts.new-work"')
                    .child((documentId) =>
                      S.document()
                        .documentId(documentId)
                        .schemaType('work')
                        .title('New Work')
                    )
                ),
              S.listItem()
                .title('All Works')
                .icon(DocumentIcon)
                .child(
                  S.documentList()
                    .title('All Works')
                    .filter('_type == "work" && !defined(archived) || archived != true')
                    .defaultOrdering([{field: 'order', direction: 'asc'}])
                ),
              S.listItem()
                .title('Featured Works')
                .icon(StarIcon)
                .child(
                  S.documentList()
                    .title('Featured Works')
                    .filter(
                      '_type == "work" && featured == true && (!defined(archived) || archived != true)'
                    )
                    .defaultOrdering([{field: 'order', direction: 'asc'}])
                ),
              S.listItem()
                .title('Archived Works')
                .child(
                  S.documentList()
                    .title('Archived Works')
                    .filter('_type == "work" && archived == true')
                ),
            ])
        ),

      // Blog Section
      S.listItem()
        .title('Blog')
        .icon(DocumentIcon)
        .child(
          S.list()
            .title('Blog')
            .items([
              S.listItem()
                .title('New Post')
                .icon(PlusIcon)
                .child(
                  S.documentTypeList('post')
                    .title('Create New Post')
                    .filter('_type == "post" && _id == "drafts.new-post"')
                    .child((documentId) =>
                      S.document()
                        .documentId(documentId)
                        .schemaType('post')
                        .title('New Post')
                    )
                ),
              S.listItem()
                .title('Drafts')
                .icon(DocumentIcon)
                .child(
                  S.documentList()
                    .title('Draft Posts')
                    .filter('_type == "post" && !defined(_publishedAt)')
                    .defaultOrdering([{field: '_createdAt', direction: 'desc'}])
                ),
              S.listItem()
                .title('Published')
                .icon(EyeOpenIcon)
                .child(
                  S.documentList()
                    .title('Published Posts')
                    .filter('_type == "post" && defined(_publishedAt) && (!defined(archived) || archived != true)')
                    .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
                ),
              S.listItem()
                .title('Archived Posts')
                .child(
                  S.documentList()
                    .title('Archived Posts')
                    .filter('_type == "post" && archived == true')
                ),
            ])
        ),

      S.divider(),

      // Site Settings (singleton)
      S.listItem()
        .title('Site Settings')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings')
        ),

      S.divider(),

      // Media Library
      S.listItem()
        .title('Media Library')
        .icon(ImageIcon)
        .child(
          S.documentTypeList('sanity.imageAsset')
            .title('Images')
            .filter('_type == "sanity.imageAsset"')
        ),
    ])

export default deskStructure
