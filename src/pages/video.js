import React from 'react'

import Layout from '../components/Layout';

export default() => {
    const [videos,
        setVideos] = React.useState([]);
    React.useEffect(() => {
        const URL = `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_TOKEN}&channelId=${process.env.CHANNEL_ID}&part=snippet,id&order=date&maxResults=50`;

        const fetchVideos = async(url) => {
            const res = await fetch(url);
            const parse = await res.json();
            const videoList = parse.items;
            videoList.pop();
            setVideos(videoList.filter(video => video.id.kind.includes('video')));
        };

        fetchVideos(URL);
    }, []);
    const meta = {
        title: 'Videos | Praveen Bisht',
        description: `I've been posting a lot o videos some tutorials some timelapse for quite a while now. So here's all the videos I've made so far`,
        keywords: 'youtube, video, codepen, programming,html,css,javascript,react',
        imgUrl: {
            google: '',
            facebook: '',
            twitter: ''
        }
    }
    return <Layout meta={meta}>
        <div className="container">
            <h4 className="page-heading">Explore Videos</h4>
            <div id="videos">
                {videos.map(video => <div className="video" key={video.id.videoId}>
                        <a
                            href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                            backgroundImage: `url(${video.snippet.thumbnails.high.url})`
                        }}>a</a>
                    </div>)
                }
            </div>
        </div>
    </Layout>
}
