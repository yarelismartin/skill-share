import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAllOtherProfiles = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/profiles.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        const profiles = Object.values(data);
        const allProfilesButYours = profiles.filter((profile) => profile.uid !== uid);
        resolve(allProfilesButYours);
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

export default getAllOtherProfiles;
