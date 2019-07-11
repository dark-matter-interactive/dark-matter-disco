const axios = require('axios');
const youtube_api_key = process.env.YOUTUBE_API_KEY || require('../../config').youtube_api_key;

// Make call to YouTube API to search for videos based on user input from Audio component
const youTubeSearch = (query) => {
    return axios.get('https://www.googleapis.com/youtube/v3/search/', {
        params: {
            key: youtube_api_key,
            q: query,
            part: 'snippet',
            type: 'video',
            videoEmbeddable: true,
            maxResults: 5,
        }
    }).then((res) => {
        return res.data
    }).catch(err => console.error(err));
}

module.exports = {
    youTubeSearch,
}
