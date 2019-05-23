import React, {useState, useEffect} from 'react'
import {Link} from 'gatsby';

import Layout from '../components/Layout';
import Options from '../components/Options';

export default() => {
    const optionsList = ['All', 'Web', 'App', 'Animation', 'Icons'];
    const [isLoading,
        setIsLoading] = useState(true);
    const [designType,
        setDesignType] = useState('All');
    const [shots,
        setShots] = useState([]);

    const selected = (value) => setDesignType(value);
    useEffect(() => {
        const URL = `https://api.dribbble.com/v2/user/shots?access_token=${process.env.TOKEN}`;
        const getData = async(url) => {
            const fetchData = await fetch(url);
            const convertData = await fetchData.json();
            setShots(convertData);
            setIsLoading(false);
        }
        getData(URL);
    }, []);
    return (
        <Layout>
            <div className="container">
                <h4 className="page-heading">Explore Designs</h4>
                <Options options={optionsList} selected={selected}/>
                <div id="shots">
                    {isLoading
                        ? <div>Loading</div>
                        : shots.map(shot => <Link to={`/design/${shot.id}`} key={shot.id}>
                            <img src={shot.images.hidpi} alt={shot.title} className="shot"/>
                        </Link>)
}
                </div>
            </div>
        </Layout>
    );
}
