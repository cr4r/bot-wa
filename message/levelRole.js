/**
 * Get user level from db.
 * @param {string} userId 
 * @param {object} _dir 
 * @returns {number}
 */

const { level } = require('../function')

// ROLE (Change to what you want, or add) and you can change the role sort based on XP.
exports.role = (userId, levell) => {
  const levelRole = level.getLevelingLevel(userId, levell)
  var hasil = 'Copper V'
  if (levelRole >= 5) {
    hasil = 'Copper IV'
  }
  if (levelRole >= 10) {
    hasil = 'Copper III'
  }
  if (levelRole >= 15) {
    hasil = 'Copper II'
  }
  if (levelRole >= 20) {
    hasil = 'Copper I'
  }
  if (levelRole >= 25) {
    hasil = 'Silver V'
  }
  if (levelRole >= 30) {
    hasil = 'Silver IV'
  }
  if (levelRole >= 35) {
    hasil = 'Silver III'
  }
  if (levelRole >= 40) {
    hasil = 'Silver II'
  }
  if (levelRole >= 45) {
    hasil = 'Silver I'
  }
  if (levelRole >= 50) {
    hasil = 'Gold V'
  }
  if (levelRole >= 55) {
    hasil = 'Gold IV'
  }
  if (levelRole >= 60) {
    hasil = 'Gold III'
  }
  if (levelRole >= 65) {
    hasil = 'Gold II'
  }
  if (levelRole >= 70) {
    hasil = 'Gold I'
  }
  if (levelRole >= 75) {
    hasil = 'Platinum V'
  }
  if (levelRole >= 80) {
    hasil = 'Platinum IV'
  }
  if (levelRole >= 85) {
    hasil = 'Platinum III'
  }
  if (levelRole >= 90) {
    hasil = 'Platinum II'
  }
  if (levelRole >= 95) {
    hasil = 'Platinum I'
  }
  if (levelRole >= 100) {
    hasil = 'Exterminator'
  }
  return hasil
}