'use strict';

module.exports.hello = async (event, context, callback) => {

  console.log('[ℹ️] Event:', JSON.stringify(event))

  const body = JSON.parse(event.body)

  try {

    const { Items, Count } = await getMusicAndAlbums(sub)

    console.error(`[✅] Data successfully retrieved. Total ${Count}`)

    return response(Items)

  } catch (error) {

    console.error('[💥] Whoops!')
    console.error(JSON.stringify(error))

    return failedReponse({ message: 'Whoops! this is embarrising' })
  };

  return response(Items)
};

/**
 * Get music and albums
 * @param {string} query
 */
const getMusicAndAlbums = (query) => {

  return new Promise((resolve, reject) => {

    const params = {
      KeyConditionExpression: 'PK = :PK and begins_with(PK, :PK)',
      ExpressionAttributeValues: {
        ':PK': `${query}`, // ARTIST#{NAME}
        ':SK': 'ALBUM#',  // ALBUM#{NAME}#{SONG}
      },
      TableName: process.env.USER_SURVEYS_TABLE
    };

    db.query(params, function (err, data) {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

/**
 * Response 2XX API GATEWAY
 *
 * @param {*} body
 * @param {*} statusCode
 * @param {*} cors
 */
const response = (body, statusCode = 200, cors = true) => {

  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(body),
  };
}

/**
 * Response 5XX API GATEWAY
 *
 * @param {*} body
 * @param {*} statusCode
 * @param {*} cors
 */
const failedReponse = (body) => {

  return {
    statusCode: 500,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(body),
  };
}