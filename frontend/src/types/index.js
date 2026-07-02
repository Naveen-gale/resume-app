/**
 * @typedef {Object} Education
 * @property {string} id
 * @property {string} degree
 * @property {string} institution
 * @property {string} year
 */

/**
 * @typedef {Object} CompanyExperience
 * @property {string} id
 * @property {string} company
 * @property {string} role
 * @property {string} duration
 * @property {string} description
 */

/**
 * @typedef {Object} Profile
 * @property {string} id
 * @property {string} fullName
 * @property {string} email
 * @property {string} phone
 * @property {string} linkedin
 * @property {number} yearsOfExperience
 * @property {CompanyExperience[]} companyExperience
 * @property {Education[]} education
 * @property {string} createdAt
 */

/**
 * @typedef {Object} Resume
 * @property {string} id
 * @property {string} profileId
 * @property {string} profileName
 * @property {string} jobTitle
 * @property {string} company
 * @property {string} content
 * @property {string} createdAt
 */

/**
 * @typedef {Object} CoverLetter
 * @property {string} id
 * @property {string} profileId
 * @property {string} profileName
 * @property {string} jobTitle
 * @property {string} company
 * @property {string} content
 * @property {string} createdAt
 */

/**
 * @typedef {Object} Activity
 * @property {string} id
 * @property {string} type - 'profile' | 'resume' | 'cover-letter'
 * @property {string} action
 * @property {string} description
 * @property {string} timestamp
 */

/**
 * @typedef {Object} DashboardStats
 * @property {number} totalProfiles
 * @property {number} totalResumes
 * @property {number} totalCoverLetters
 */

export {};
