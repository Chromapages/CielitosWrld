import {StructureBuilder} from 'sanity/structure'
import {
  HomeIcon,
  ImageIcon,
  DocumentIcon,
  ImagesIcon,
  CogIcon,
} from '@sanity/icons'

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title("Cielito's Wrld")
    .items([
      // HOME - Quick actions
      S.listItem()
        .title('Home')
        .icon(HomeIcon)
        .child(
          S.component()
            .component(() => (
              <div
                style={{
                  padding: '2rem',
                  fontFamily: 'Inter, sans-serif',
                  maxWidth: '800px',
                  margin: '0 auto',
                }}
              >
                <h1
                  style={{
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    marginBottom: '0.5rem',
                    color: '#371d13',
                  }}
                >
                  Welcome Back! ✨
                </h1>
                <p
                  style={{
                    fontSize: '1.1rem',
                    color: '#5d3c2a',
                    marginBottom: '2.5rem',
                    lineHeight: '1.6',
                  }}
                >
                  Create and manage your photography work and blog posts in seconds.
                </p>

                {/* Quick Create Buttons */}
                <div
                  style={{
                    display: 'grid',
                    gap: '1rem',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    marginBottom: '3rem',
                  }}
                >
                  <a
                    href="/studio/intent/create/template=post;type=post/"
                    style={{
                      padding: '2rem',
                      background: 'linear-gradient(135deg, #822c01 0%, #b33a16 100%)',
                      color: 'white',
                      borderRadius: '12px',
                      textDecoration: 'none',
                      fontWeight: '600',
                      fontSize: '1.2rem',
                      textAlign: 'center',
                      boxShadow: '0 4px 6px rgba(130, 44, 1, 0.25)',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      minHeight: '100px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = '0 8px 12px rgba(130, 44, 1, 0.3)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = '0 4px 6px rgba(130, 44, 1, 0.25)'
                    }}
                  >
                    ✍️ Create Blog Post
                  </a>
                  <a
                    href="/studio/intent/create/template=galleryAsset;type=galleryAsset/"
                    style={{
                      padding: '2rem',
                      background: 'linear-gradient(135deg, #2c3325 0%, #515e47 100%)',
                      color: 'white',
                      borderRadius: '12px',
                      textDecoration: 'none',
                      fontWeight: '600',
                      fontSize: '1.2rem',
                      textAlign: 'center',
                      boxShadow: '0 4px 6px rgba(44, 51, 37, 0.25)',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      minHeight: '100px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = '0 8px 12px rgba(44, 51, 37, 0.3)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = '0 4px 6px rgba(44, 51, 37, 0.25)'
                    }}
                  >
                    🖼️ Add Gallery Asset
                  </a>
                </div>

                {/* Quick Guide */}
                <div
                  style={{
                    background: '#f8f9f6',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: '1px solid #dde2d1',
                  }}
                >
                  <h2
                    style={{
                      fontSize: '1.3rem',
                      fontWeight: 'bold',
                      marginBottom: '1rem',
                      color: '#371d13',
                    }}
                  >
                    📱 Quick Start (60 seconds)
                  </h2>
                  <ol
                    style={{
                      lineHeight: '2',
                      fontSize: '1rem',
                      color: '#5d3c2a',
                      paddingLeft: '1.5rem',
                    }}
                  >
                    <li>Click a button above to create content</li>
                    <li>Add a title and tap "Generate" for the URL</li>
                    <li>Upload your main image (drag & drop works!)</li>
                    <li>Write a short excerpt (2-3 sentences)</li>
                    <li>Add your content in the body</li>
                    <li>Hit the orange "Publish" button</li>
                    <li>Your content goes live in ~60 seconds! 🎉</li>
                  </ol>
                </div>

                {/* Tips */}
                <div
                  style={{
                    marginTop: '2rem',
                    padding: '1.5rem',
                    background: '#fef6f0',
                    borderRadius: '12px',
                    border: '1px solid #fad1bb',
                  }}
                >
                  <h3 style={{fontWeight: 'bold', marginBottom: '0.75rem', color: '#822c01'}}>
                    💡 Pro Tips:
                  </h3>
                  <ul style={{lineHeight: '1.8', color: '#5d3c2a', paddingLeft: '1.5rem'}}>
                    <li>
                      <strong>Images:</strong> Use at least 1600px wide for best quality
                    </li>
                    <li>
                      <strong>Alt Text:</strong> Always describe your images (helps with accessibility
                      & SEO)
                    </li>
                    <li>
                      <strong>Mobile Editing:</strong> Everything works on your phone—edit on the go!
                    </li>
                    <li>
                      <strong>Drafts:</strong> Work saves automatically. Publish when ready.
                    </li>
                  </ul>
                </div>
              </div>
            ))
            .title('Home')
        ),

      S.divider(),

      // GALLERY ASSETS - Direct access to uploaded media
      S.listItem()
        .title('Gallery Assets')
        .icon(ImagesIcon)
        .child(
          S.documentList()
            .title('Gallery Assets')
            .filter('_type == "galleryAsset"')
            .defaultOrdering([
              {field: 'category', direction: 'asc'},
              {field: '_createdAt', direction: 'desc'},
            ])
            .menuItems([
              S.menuItem()
                .title('All Assets')
                .action(() => null)
                .icon(ImagesIcon),
              S.menuItem()
                .title('Photos Only')
                .action(() => null)
                .icon(ImageIcon),
              S.menuItem()
                .title('Featured Assets')
                .action(() => null)
                .icon(ImagesIcon),
            ])
        ),

      S.divider(),


      // BLOG - Flat list
      S.listItem()
        .title('Blog')
        .icon(DocumentIcon)
        .child(
          S.documentList()
            .title('Blog Posts')
            .filter('_type == "post" && (!defined(archived) || archived != true)')
            .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
        ),

      S.divider(),

      // SETTINGS - Moved to bottom, less prominent
      S.listItem()
        .title('Settings')
        .icon(CogIcon)
        .child(
          S.document().schemaType('siteSettings').documentId('siteSettings').title('Site Settings')
        ),
    ])

export default deskStructure
