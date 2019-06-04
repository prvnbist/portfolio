import React, {useState, useEffect} from 'react'
import {Link} from 'gatsby';

import Layout from '../components/Layout';
import Loading from '../components/Loading';

export default() => {
    const [isLoading,
        setIsLoading] = useState(true);
    const [shots,
        setShots] = useState([]);

    useEffect(() => {
        const URL = `https://api.dribbble.com/v2/user/shots?access_token=${process.env.GATSBY_DRIBBBLE_TOKEN}`;
        const getData = async(url) => {
            const fetchData = await fetch(url);
            const convertData = await fetchData.json();
            setShots(convertData);
            setIsLoading(false);
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

                {isLoading
                    ? <Loading width={100} height={'450px'}/>
                    : (
                        <div id="shots">
                            {shots.map(shot => <Link to={`/design/${shot.id}`} key={shot.id}>
                                <img src={shot.images.hidpi} alt={shot.title} className="shot"/>
                            </Link>)}
                        </div>
                    )}
            </div>
        </Layout>
    )
};