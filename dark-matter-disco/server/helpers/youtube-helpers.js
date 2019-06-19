const axios = require('axios');
const { youtube_api_key } = require('../../config');


const youTubeSearch = (query) => {
    return axios.get('https://www.googleapis.com/youtube/v3/search/', {
        params: {
            key: youtube_api_key,
            q: query,
            part: 'snippet',
            type: 'video',
            videoEmbeddable: true,
        }
    }).then((res) => {
        console.log(res)
        return res.data
    }).catch(err => console.error(err));
}

module.exports = {
    youTubeSearch,
}
