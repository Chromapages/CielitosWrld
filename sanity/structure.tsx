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
