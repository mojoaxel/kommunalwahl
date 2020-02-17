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

async function getAllByFielsname(field) {
	let entries = [];
	for (let sheet of doc.sheetsByIndex) {
		if (sheet == doc.sheetsByIndex[0]) continue;
		const rows = await sheet.getRows();
		n = rows
			.map(r => r[field])
			.filter(f => f && f.length)
			.sort();
		entries.push(...n);
	}
	return entries;
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
			const name = `${title} ${surname} ${forename}`.trim();
			if (officialName != name) {
				problems.push({
					officialName,
					name,
					surname
				});
			}
		}
	}

	if (problems.length) {
		problems.forEach(p => {
			console.warn(`"${p.officialName}" != "${p.name} (${p.party})"`);
		});
	}

	return !!(problems.length);
}


(async () => {
	await loadSheet();
	await checkAllNames();
	
	const forenames = await getAllByFielsname('forename');
	const surname = await getAllByFielsname('surname');
	await fs.writeJSON('names.json', {
		forenames, 
		surname
	});

	const forenames = await getAllByFielsname('forename');
	const surname = await getAllByFielsname('surname');
	await fs.writeJSON('names.json', {
		forenames, 
		surname
	});
	
})();
