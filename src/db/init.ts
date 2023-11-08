import better from 'better-sqlite3'
// https://www.npmjs.com/package/better-sqlite3
const db = better('./foobar.db', {})

export default db
