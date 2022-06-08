/**
 * @module 2-redis_op_async
 */
import { createClient, print } from 'redis';
import { promisify } from 'util';

// Instantiate a redis client object
const client = createClient();

// Capture an error event and log an error message to console
client.on('error', (err) => {
    console.log(`Redis client not connected to the server: ${err}`);
});

// Log connection succes to the console
console.log('Redis client connected to the server');

/**
 * @function setNewSchool
 * @summary Save a key value in a redis instance
 * @param {string} schoolName the key to store in
 * @param {string} value the value to store
 */
function setNewSchool(schoolName, value) {
    client.SET(schoolName, value, print);
}

// Promisify get method of redis client
const getAsync = promisify(client.GET).bind(client);

/**
 * @function displaySchoolValue
 * @summary Log value of passed key to the console
 * @param {string} schoolName the key to to get value from
 */
async function displaySchoolValue(schoolName) {
    const response = await getAsync(schoolName);
    console.log(response);
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
