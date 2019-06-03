import React from 'react'
import {Helmet} from "react-helmet"
import {Transition, config} from 'react-spring/renderprops'

import Navbar from './Navbar'

const Layout = props => {
    return <Transition
            config={config.slow}
            from={{opacity: 0}}
            enter={{opacity: 1}}
            leave={{opacity: 0}}>
        {() => style => (
            <div style={style}>
                <Helmet>
                    <title>{props.meta.title}</title>
                    <meta name="robots" content="index, follow"/>
                    <meta name="description" content={props.meta.description}/>
                    <meta name="keywords" content={props.meta.keywords}/> {/* Google / Search Engine Tags */}
                    <meta itemProp="name" content='Praveen Bisht'/>
                    <meta itemProp="description" content={props.meta.description}/> {/* <meta itemProp="image" content={props.meta.imgUrl.google} /> */}

                    {/* Facebook Meta Tags */}
                    <meta property="og:url" content={props.meta.websiteUrl}/>
                    <meta property="og:type" content="website"/>
                    <meta property="og:title" content={props.meta.title}/>
                    <meta property="og:description" content={props.meta.description}/> {/* <meta property="og:image" content={props.meta.imgUrl.facebook} /> */}

                    {/* Twitter Meta Tags */}
                    <meta name="twitter:card" content="summary_large_image"/>
                    <meta name="twitter:title" content={props.meta.title}/>
                    <meta name="twitter:site" content="@prvnbist"/>
                    <meta name="twitter:creator" content="@prvnbist"/>
                    <meta name="twitter:description" content={props.meta.description}/> {/* <meta name="twitter:image" content={props.meta.imgUrl.twitter}/> */}
                </Helmet>
                <Navbar/> {props.children}
            </div>
        )}
    </Transition>
}

export default Layout;