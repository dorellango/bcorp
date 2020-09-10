const axios = require('axios')

const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET

const getToken = async () => {
  const { data } = await Axios.post('https://accounts.spotify.com/api/token', params,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`
      }
    })
  setToken(data.access_token)
}

const fetchAlbums = async (q) => {
  const { data } = await Axios.get('https://api.spotify.com/v1/search', {
    params: {
      q,
      type: 'album'
    },
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data.albums.items
}

const fetchArtists = async (q) => {
  const { data } = await Axios.get('https://api.spotify.com/v1/search', {
    params: {
      q,
      type: 'artist'
    },
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data.artists.items
}


module.exports = new AWS.DynamoDB.DocumentClient(config);