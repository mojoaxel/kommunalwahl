const fs = require('fs-extra');
const { GoogleSpreadsheet } = require('google-spreadsheet');
require('dotenv').config();

var doc;

async function loadSheet() {
	// spreadsheet key is the long id in the sheets URL
	doc = new GoogleSpreadsheet('1XXZVVtrJVJbPiVGLCeNjvhJkF3DmGKDuWyUd6u0SiTs');

	// use service account creds
	await doc.useServiceAccountAuth({
		client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
		private_key: process.env.GOOGLE_PRIVATE_KEY,
	});

	 // loads document properties and worksheets
	await doc.loadInfo();
}

async function checkAllNames() {
	let problems = [];
	for (let sheet of doc.sheetsByIndex) {
		const rows = await sheet.getRows();
		if (sheet == doc.sheetsByIndex[0]) continue;
		const party = sheet.title;
		for (let row of rows) {
			const officialName = row.name;
			const title = row.titel ? row.titel.trim() : '';
			const forename = row.forename;
      const surname = row.surname;
      const nobel = row.nobel;
			const name = `${title} ${surname} ${nobel} ${forename}`.trim().replace('  ', ' ');
			if (officialName != name) {
				problems.push({
					officialName,
					name,
          party
				});
			}
		}
	}

	if (problems.length) {
		problems.forEach(p => {
			console.warn(`"${p.officialName}" != "${p.name}" (${p.party})`);
		});
	}

	return !!(problems.length);
}

async function getParties() {
  let parties = [];
  const sheet = doc.sheetsByIndex[0];
  const rows = await sheet.getRows();
  for (let row of rows) {
    parties.push({
      nummer: row.nummer,
      partei: createObjectFromRow(row, [
        'kurzform',
        'langform',
        'farbe',
        'homepage',
        'logo'
      ])
    });
  }
  return parties;
}

function createObjectFromRow(row, fields) {
  var obj = {};
  fields.forEach(f => {
    value = row[f];
    if (value && value.length) {
      obj[f] = value;
    }
  });
  return obj;
}

function processCandidate(candidate) {
  if (candidate) {
    if (candidate.position) {
      candidate.position = parseInt(candidate.position);
    }
    if (candidate.weight) {
      candidate.weight = parseInt(candidate.weight);
    }
    if (candidate.birthyear) {
      candidate.birthyear = parseInt(candidate.birthyear);
    }
    if (candidate.titel) {
      candidate.titels = candidate.titel.split(' ').map(t => t.trim());
      delete candidate.title;
    }
    if (candidate.job) {
      candidate.jobs = candidate.job.split(',').map(j => j.trim());
      delete candidate.job;
    }
  }
  return candidate;
}

(async () => {
	await loadSheet();
	//await checkAllNames();

  let parties;
  parties = await getParties();
  for (let i=0; i<parties.length; i++) {
    const sheet = doc.sheetsByIndex[parties[i].nummer];
    const rows = await sheet.getRows();
    parties[i].kandidaten = rows.map(r => {
      let candidate = createObjectFromRow(r, [
        'position',
        'weight',
        //'name',
        'titel',
        'forename',
        'surname',
        'nobel',
        'gender',
        'birthyear',
        'job',
        'district',
        'image',
        'webpage',
        'email',
        'facebook',
        'instagram',
        'twitter'
      ]);
      candidate = processCandidate(candidate);
      return candidate;
    });
  }
  await fs.writeJSON('parties.json', parties, { spaces: '\t' });
})();
