require('dotenv').config();
const axios = require('axios');


module.exports = async (url, opt) => {
	var id

	if (match = url.match(/[&?]list=([\w-]+)/))
		id = match[1];
	else if (match = url.match(/youtu(?:be\.com\/(?:watch\?v=|embed\/)|\.be\/)([\w-]{11})/))
		id = match[1];
	else {
		await axios({
			method: 'get',
			url: `https://customsearch.googleapis.com/customsearch/v1`,
			params: {
				cx: process.env.programmableSearchEngine,
				q: url,
				num: 1,
				key: process.env.googleApiKey,
			}
		}).then(res => {
			id = res.data.items[0].link.match(/youtu(?:be\.com\/(?:watch\?v=|embed\/)|\.be\/)([\w-]{11})/)[1];
		});
	}

	var items = [];

	var nextPage = true;
	var pageToken = "";
	while (nextPage) {
		await axios({
			method: 'get',
			url: `https://www.googleapis.com/youtube/v3/${url.includes('list=') ? 'playlistItems' : 'videos'}`,
			params: {
				part: 'snippet',
				maxResults: 50,
				[!url.includes('list=') ? 'id' : 'playlistId']: id,
				key: process.env.googleApiKey,
				pageToken: pageToken
			}
		}).then(response => {
			items = items.concat(response.data.items);

			if (!response.data.nextPageToken)
				nextPage = false
			else
				pageToken = response.data.nextPageToken;
		});
	}

	return items.map(e => {
		const val = {
			title: `${e.snippet.title}`,
			id: `${e.snippet.resourceId ? e.snippet.resourceId.videoId : e.id}`,
			url: `https://youtu.be/${e.snippet.resourceId ? e.snippet.resourceId.videoId : e.id}`,
		};

		return opt.reduce((obj, holder) => {
			obj[holder] = val[holder];
			return obj;
		}, {});
	});
};