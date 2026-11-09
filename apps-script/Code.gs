/**
 * RSVP -> Google Sheet   (Aadithya & Amulya engagement invitation)
 * Setup: see README.md
 */
const SHEET_NAME = 'RSVP';

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const data = JSON.parse(e.postData.contents);
    const name = clean_(data.name);
    const attendance = clean_(data.attendance);
    const guests = Number(data.guests) || 0;

    if (!name || !['Will Attend', 'Unable to Attend'].includes(attendance) || guests < 1 || guests > 10) {
      return json_({ result: 'error', message: 'Invalid RSVP' });
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp (IST)', 'Name', 'Attendance', 'Guests', 'Message']);
      sheet.setFrozenRows(1);
      sheet.getRange('A1:E1').setFontWeight('bold');
    }
    sheet.appendRow([
      Utilities.formatDate(new Date(), 'Asia/Kolkata', 'dd MMM yyyy, hh:mm:ss a'),
      name, attendance, guests, clean_(data.message)
    ]);
    return json_({ result: 'success' });
  } catch (err) {
    return json_({ result: 'error', message: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Opening the /exec URL in a browser should show this — handy for testing the deployment.
function doGet() { return json_({ result: 'ok', message: 'RSVP endpoint is live' }); }

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// Trim, cap length, and neutralise spreadsheet formulas (=, +, -, @) typed by guests.
function clean_(v) {
  v = String(v == null ? '' : v).trim().slice(0, 1000);
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}
