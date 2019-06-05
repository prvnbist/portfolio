import React from 'react'
import {Link} from 'gatsby';
import Img from 'react-image';

import Layout from '../components/Layout';
import Loading from '../components/Loading';

const Shot = (props) => {
    const {title, html_url, images, description, tags} = props.pageContext.shot;
    const meta = {
        title: `${title} | Praveen Bisht`,
        description: description,
        keywords: tags,
        imgUrl: {
            google: images.hidpi,
            facebook: images.hidpi,
            twitter: images.hidpi
        }
    }

    return (
        <Layout meta={meta}>
            <div className="container" id="dribbble-shot">
                <Link to='/design' className="btn btn-outline-light" id="back">Back</Link>
                <div id="shot-heading">
                    <h4 className="page-heading">{title}</h4>
                    <a
                        href={html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary">View on Dribbble</a>
                </div>
                <Img
                    src={images.hidpi}
                    alt={title}
                    id="shot-image"
                    loader={<Loading width={100} heigh={'260px'}/>}
                    />
                <div id="description">
                    <h5 className="caps__heading">Description</h5>
                    <p
                        dangerouslySetInnerHTML={{
                        __html: description
                    }}></p>
                </div>
                <div id="tags">
                    <h5 className="caps__heading">Tags</h5>
                    <ul>
                        {
                            tags.map((tag, index) => <li key={index} className='tag'>{tag}</li>)
                        }
                    </ul>
                </div>

            </div>
        </Layout>
    )
}

export default Shot