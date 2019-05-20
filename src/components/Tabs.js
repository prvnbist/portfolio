import React, {useState} from 'react';

const Tab = ({tabs, content}) => {
    const [activeTab,setActiveTab] = useState(1);
    return (
        <div>
            <ul className="tabs">
            {
                tabs.map((tab, index) => <li 
                        key={index} 
                        className={activeTab === index+1 ? 'active-tab' : null}
                        onClick={e => setActiveTab(index+1)}
                    >{tab}</li>)
            }
            </ul>
            <div className="tab-content">
                { content[activeTab-1].component }
            </div>
        </div>
    );
}

export default Tab;