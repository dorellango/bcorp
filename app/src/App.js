import React, { useEffect, useState } from 'react';
import Axios from 'axios'

const App = () => {

  const [results, setResults] = useState(false)
  const [token, setToken] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const clientId = '13a18c88c66b468e8d01405f6fc92c6d'
  const clientSecret = 'ac445e044c9845e98c7de64d2192285b'

  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');

  useEffect(() => {
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
    getToken()
  }, [])

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

  const search = async (e) => {

    e.preventDefault()
    e.persist()

    setError(false)
    setLoading(true)
    try {
      debugger
      const albums = await fetchAlbums(e.target.value)
      const artists = await fetchArtists(e.target.value)

      setLoading(false)
      setResults({ albums, artists })
    } catch (error) {
      setLoading(false)
      setError(true)
    }
  }

  return (
    <div className="bg-gray-200 min-h-screen">
      <header className="bg-green-600">
        <div className="container mx-auto text-xl text-green-100 py-6 px-4">
          <strong className="text-3xl">Spotify</strong> <span className="italic"> Finder! 👀</span>
        </div>
      </header>
      <div className="h-full container mx-auto p-6">
        <div className="h-full flex items-center justify-center flex-col">
          <div className="max-w-md w-full mb-6 pb-6 border-b-2 border-dashed border-gray-400">
            <div className="text-2xl">
              <p className="mb-4 font-bold tracking-wide">Just type something!</p>
            </div>
            <input
              className="py-4 px-6 border-4 border-gray-800 rounded w-full block text-gray-800 font-mono text-xl mb-2"
              type="text"
              onChange={(e) => search(e)}
              placeholder="Ej. Imperial March" />
            <p className="text-gray-600 tracking-wide font-bold">I want filter by <span className="underline text-green-600 font-bold">album</span> / <span>artist</span></p>
          </div>
          <div className="max-w-ld w-full">
            {results && results.albums.map(r => {
              return (
                <div className="bg-gray-900 rounded shadow-lg text-white py-4 px-6 mb-4">
                  tadaaaaaa
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
