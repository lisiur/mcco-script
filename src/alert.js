require('colors')
module.exports = {
  error(msg) {
    console.log(`\n❌ ${msg}`.red, '\n')
  },
  success(msg) {
    console.log(`\n✔️ ${msg}`.green, '\n')
  }
}