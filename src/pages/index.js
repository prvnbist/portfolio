import React from 'react'

import Layout from '../components/Layout';
import Tab from '../components/Tabs';
import '../styles/index.scss';

const Codepen = () => <div>Codepen</div>;
const Github = () => <div>Github</div>;
const Facebook = () => <div>Facebook</div>;

const IndexPage = () => {
    const tabs = ["Codepen", "Github", "Facebook"];
    const tabsContent = [{
        component: <Codepen />
    }, 
    {
        component: <Github />
    },
    {
        component: <Facebook />
    }
    ]
    return <Layout>
        <div>
            <h1>h1</h1>
        <h2>h2</h2>
        <h3>h3</h3>
        <h4>h4</h4>
        <h5>h5</h5>
        <p>This is a paragraph</p>
        <a href="#" className="btn btn-primary">Primary</a>
        <a href="#" className="btn btn-secondary">Secondary</a>
        <br/>
        <a href="#" className="btn btn-danger">Danger</a>
        <a href="#" className="btn btn-success">Success</a>
        <a href="#" className="btn btn-info">Info</a>
        <a href="#" className="btn btn-warning">Warning</a>
        <a href="#" className="btn btn-disabled">Disabled</a>
        <br/>
        <a href="#" className="btn btn-outline-primary">Primary</a>
        <a href="#" className="btn btn-outline-secondary">Secondary</a>
        <a href="#" className="btn btn-outline-danger">Danger</a>
        <a href="#" className="btn btn-outline-success">Success</a>
        <a href="#" className="btn btn-outline-info">Info</a>
        <a href="#" className="btn btn-outline-warning">Warning</a>
        <a href="#" className="btn btn-outline-disabled">Disabled</a>
        <br/>
        <br/>
        <br/></div>
        <Tab tabs={tabs} content={tabsContent}/>
    </Layout>;
}

export default IndexPage