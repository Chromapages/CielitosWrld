import type { StructureResolver } from 'sanity/structure'
import {
  HomeIcon,
  CogIcon,
  DocumentIcon,
  DocumentsIcon,
  ImagesIcon,
  UserIcon,
  StarIcon,
  UsersIcon,
  CommentIcon,
  MenuIcon,
  ImageIcon,
  EnvelopeIcon,
} from '@sanity/icons'

/**
 * Sanity Studio Desk Structure
 * Organized for Cielito's Wrld photography portfolio
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Cielito's Wrld")
    .items([
      // ─────────────────────────────────────────────────────────────────────
      // 🏠 Home Dashboard
      // ─────────────────────────────────────────────────────────────────────
      S.listItem()
        .title('Home')
        .icon(HomeIcon)
        .child(
          S.component()
            .component(() => (
              <div
                style= {{
              padding: '2rem',
              fontFamily: 'Inter, sans-serif',
              maxWidth: '800px',
              margin: '0 auto',
            }}
              >
  <h1 style={ { fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#371d13' } }>
    Welcome Back! ✨
</h1>
  < p style = {{ fontSize: '1.1rem', color: '#5d3c2a', marginBottom: '2.5rem', lineHeight: '1.6' }}>
    Create and manage your photography work and blog posts.
                </p>

      < div style = {{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', marginBottom: '2rem' }}>
        <a
                    href="/studio/intent/create/template=post;type=post/"
style = {{
  padding: '1.5rem',
    background: 'linear-gradient(135deg, #822c01 0%, #b33a16 100%)',
      color: 'white',
        borderRadius: '12px',
          textDecoration: 'none',
            fontWeight: '600',
              fontSize: '1.1rem',
                textAlign: 'center',
                  display: 'flex',
                    alignItems: 'center',
                      justifyContent: 'center',
                        minHeight: '80px',
                    }}
                  >
                    ✍️ Create Blog Post
  </a>
  < a
href = "/studio/intent/create/template=galleryAsset;type=galleryAsset/"
style = {{
  padding: '1.5rem',
    background: 'linear-gradient(135deg, #2c3325 0%, #515e47 100%)',
      color: 'white',
        borderRadius: '12px',
          textDecoration: 'none',
            fontWeight: '600',
              fontSize: '1.1rem',
                textAlign: 'center',
                  display: 'flex',
                    alignItems: 'center',
                      justifyContent: 'center',
                        minHeight: '80px',
                    }}
                  >
                    🖼️ Add Gallery Asset
  </a>
  </div>

  < div style = {{ background: '#f8f9f6', padding: '1.5rem', borderRadius: '12px', border: '1px solid #dde2d1' }}>
    <h3 style={ { fontWeight: 'bold', marginBottom: '0.75rem', color: '#371d13' } }>📱 Quick Start </h3>
      < ol style = {{ lineHeight: '1.8', color: '#5d3c2a', paddingLeft: '1.5rem', margin: 0 }}>
        <li>Click a button above to create content </li>
          < li > Add title and click "Generate" for URL </li>
            < li > Upload your image(drag & drop works) </li>
            < li > Hit "Publish" — live in ~60 seconds! 🎉</li>
              </ol>
              </div>
              </div>
            ))
            .title('Home')
        ),

S.divider(),

  // ─────────────────────────────────────────────────────────────────────
  // 🏠 Homepage Sections
  // ─────────────────────────────────────────────────────────────────────
  S.listItem()
    .title('Homepage')
    .icon(HomeIcon)
    .child(
      S.list()
        .title('Homepage Sections')
        .items([
          S.listItem()
            .title('Hero & Settings')
            .icon(HomeIcon)
            .child(
              S.document()
                .schemaType('homePage')
                .documentId('homePage')
                .title('Homepage Hero & Settings')
            ),
          S.listItem()
            .title('About Section')
            .icon(UserIcon)
            .child(
              S.documentList()
                .title('About Section')
                .filter('_type == "homeAbout"')
                .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
            ),
          S.listItem()
            .title('Testimonials')
            .icon(StarIcon)
            .child(
              S.documentList()
                .title('Testimonials')
                .filter('_type == "homeTestimonials"')
                .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
            ),
          S.listItem()
            .title('Collaborations')
            .icon(UsersIcon)
            .child(
              S.documentList()
                .title('Collaborations')
                .filter('_type == "homeCollaborations"')
                .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
            ),
        ])
    ),

  // ─────────────────────────────────────────────────────────────────────
  // 📄 Page Settings
  // ─────────────────────────────────────────────────────────────────────
  S.listItem()
    .title('Pages')
    .icon(DocumentsIcon)
    .child(
      S.list()
        .title('Page Settings')
        .items([
          S.listItem()
            .title('Blog Page')
            .icon(DocumentIcon)
            .child(
              S.document()
                .schemaType('blogPage')
                .documentId('blogPage')
                .title('Blog Page Settings')
            ),
          S.listItem()
            .title('Gallery Page')
            .icon(ImagesIcon)
            .child(
              S.document()
                .schemaType('galleryPage')
                .documentId('galleryPage')
                .title('Gallery Page Settings')
            ),
          S.listItem()
            .title('Contact Page')
            .icon(EnvelopeIcon)
            .child(
              S.document()
                .schemaType('contactPage')
                .documentId('contactPage')
                .title('Contact Page Settings')
            ),
        ])
    ),

  S.divider(),

  // ─────────────────────────────────────────────────────────────────────
  // 📝 Content
  // ─────────────────────────────────────────────────────────────────────
  S.listItem()
    .title('Blog Posts')
    .icon(DocumentIcon)
    .child(
      S.documentList()
        .title('Blog Posts')
        .filter('_type == "post" && (!defined(archived) || archived != true)')
        .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
    ),

  S.listItem()
    .title('Gallery Assets')
    .icon(ImagesIcon)
    .child(
      S.documentList()
        .title('Gallery Assets')
        .filter('_type == "galleryAsset"')
        .defaultOrdering([
          { field: 'category', direction: 'asc' },
          { field: '_createdAt', direction: 'desc' },
        ])
    ),

  S.listItem()
    .title('Comments')
    .icon(CommentIcon)
    .child(
      S.documentList()
        .title('Comments')
        .filter('_type == "comment"')
        .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
    ),

  S.divider(),

  // ─────────────────────────────────────────────────────────────────────
  // ⚙️ Settings
  // ─────────────────────────────────────────────────────────────────────
  S.listItem()
    .title('Settings')
    .icon(CogIcon)
    .child(
      S.list()
        .title('Settings')
        .items([
          S.listItem()
            .title('Site Settings')
            .icon(CogIcon)
            .child(
              S.document()
                .schemaType('siteSettings')
                .documentId('siteSettings')
                .title('Site Settings')
            ),
          S.listItem()
            .title('Navigation')
            .icon(MenuIcon)
            .child(
              S.documentList()
                .title('Navigation')
                .filter('_type == "navigation"')
                .defaultOrdering([{ field: 'navId', direction: 'asc' }])
            ),
        ])
    ),
    ])
