import React, {useState} from 'react'

import Layout from '../components/Layout';
import Options from '../components/Options';

export default() => {
    const optionsList = ['All', 'Web', 'App', 'Animation', 'Icons'];
    const [designType, setDesignType] = useState('All');
    let selected = (value) => {
        setDesignType(value);
    }
    return (
        <Layout>
            <div className="container">
                <h4 className="page-heading">Explore Designs</h4>
                <Options options={optionsList} selected={selected}/>
            </div>
        </Layout>
    );
}
