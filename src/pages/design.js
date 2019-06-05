import React, {useState, useEffect} from 'react'
import {Link} from 'gatsby';
import Img from 'react-image';

import Layout from '../components/Layout';
import Loading from '../components/Loading';

export default() => {
    const [shots, setShots] = useState([]);

    useEffect(() => {
        const URL = `https://api.dribbble.com/v2/user/shots?access_token=${process.env.GATSBY_DRIBBBLE_TOKEN}`;
        const getData = async(url) => {
            const res = await fetch(url);
            if (res.status === 200) {
                const parsed = await res.json();
                setShots(parsed);
            }
        }
        getData(URL);
    }, []);
    const meta = {
        title: 'Design | Praveen Bisht',
        description: 'A gallery of all my design work.',
        keywords: 'design, ui, ux, user interface, user experience, figma, photoshop, zeplin, dribb' +
                'ble, uplabs, invision',
        imgUrl: {
            google: '',
            facebook: '',
            twitter: ''
        }
    }
    return (
        <Layout meta={meta}>
            <div className="container">
                <h4 className="page-heading">Explore Designs</h4>
                <div id="shots">
                    {shots.map(shot => <Link to={`/design/${shot.id}`} key={shot.id}>
                        <Img src={shot.images.hidpi} alt={shot.title} loader={<Loading height={'100%'}/>} className="shot"/>
                    </Link>)}
                </div>
            </div>
        </Layout>
    )
};