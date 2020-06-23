require('dotenv').config();
const Airtable = require('airtable');
Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
});
const base = Airtable.base(process.env.AIRTABLE_BASE);
const table = base.table(process.env.AIRTABLE_TABLE);

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
    const records = await table
      .select({
        sort: [{ field: 'Score', direction: 'desc' }],
      })
      .firstPage();
    const formattedRecords = records.map((record) => ({
      id: record.id,
      fields: record.fields,
    }));

    const lowestRecord = formattedRecords[9];
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
