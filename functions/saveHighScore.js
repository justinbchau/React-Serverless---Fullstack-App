const { table, getHighScores } = require('./utils/airtable');
exports.handler = async (event) => {
  console.log(event);
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ err: 'That method is not allowed' }),
    };
  }

  const { Score, Name } = JSON.parse(event.body);
  if (!Score || !Name) {
    return {
      statusCode: 400,
      body: JSON.stringify({ err: 'Bad Request' }),
    };
  }
  try {
    const records = await getHighScores(false);

    const lowestRecord = records[9];
    console.log(lowestRecord);
    if (Score > lowestRecord.fields.Score) {
      const updatedRecord = {
        id: lowestRecord.id,
        fields: { Name, Score },
      };
      await table.update([updatedRecord]);
      return {
        statusCode: 200,
        body: JSON.stringify(updatedRecord),
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify({}),
      };
    }
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        err: 'Failed to save score in Airtable',
      }),
    };
  }
};
