import type { GatsbyConfig } from "gatsby"

const config: GatsbyConfig = {
  pathPrefix: `/m-landings`,
  trailingSlash: `never`,
  siteMetadata: {
    title: `Bilbet online betting`,
    description: "Sportsbook BilBet - trusted betting site in India. We offer a large selection of events, high odds and generous bonuses. Join us!",
    author: "Bilbet",
    siteUrl: `https://bilbet.com/m-landings`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-gatsby-cloud`,
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/favicon.png',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/locales`,
        name: `locale`
      }
    },
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        localeJsonSourceName: `locale`,
        languages: [`en`, `hi`, `uz`, `ru`, `bn`],
        defaultLanguage: `en`,
        redirect: false,
        siteUrl: `https://bilbet.com/m-landings`,
        i18nextOptions: {
          interpolation: {
            escapeValue: false 
          },
          keySeparator: ".",
          nsSeparator: false,
        },
        pages: [
          {
            matchPath: '/:lang?/pr-landings/(.*)',
            getLanguageFromPath: true,
          },
        ]
      }
    }
  ],
}

export default config
