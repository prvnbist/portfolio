module.exports = {
    siteMetadata: {
        title: 'Praveen Bisht',
        author: 'Praveen Bisht'
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        'gatsby-plugin-sass', {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'src',
                path: `${__dirname}/src/`
            }
        },
        'gatsby-plugin-sharp',
        `gatsby-transformer-sharp`, {
            resolve: 'gatsby-transformer-remark',
            options: {
                plugins: [
                    'gatsby-remark-relative-images', {
                        resolve: 'gatsby-remark-images',
                        options: {
                            maxWidth: 750,
                            linkImagesToOriginal: false
                        }
                    }, 
                    {
                        resolve: `gatsby-remark-prismjs`,
                        options: {
                          classPrefix: "language-",
                          inlineCodeMarker: null,
                          aliases: {},
                          showLineNumbers: true,
                          noInlineHighlight: false,
                        },
                      },
                    // {
                    //     resolve: `gatsby-remark-vscode`,
                    //     options: {
                    //         colorTheme: {
                    //             defaultTheme: 'Level Up'
                    //         },
                    //         wrapperClassName: '', // Additional class put on 'pre' tag
                    //         injectStyles: true, // Injects (minimal) additional CSS for layout and scrolling
                    //         extensions: [
                    //             {
                    //                 identifier: 'leveluptutorials.theme-levelup',
                    //                 version: '0.1.2'
                    //             }
                    //         ], // Extensions to download from the marketplace to provide more languages and themes
                    //         languageAliases: {}, // Map of custom/unknown language codes to standard/known language codes
                    //         replaceColor: x => x, // Function allowing replacement of a theme color with another. Useful for replacing hex colors with CSS variables.
                    //         getLineClassName: ({ // Function allowing dynamic setting of additional class names on individual lines
                    //             content, //   - the string content of the line
                    //             index, //   - the zero-based index of the line within the code fence
                    //             language, //   - the language specified for the code fence
                    //             codeFenceOptions //   - any options set on the code fence alongside the language (more on this later)
                    //         }) => ''
                    //     }
                    // }
                ]
            }
        }, {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: process.env.TRACK_ID,
                head: true
            }
        }
    ]
}