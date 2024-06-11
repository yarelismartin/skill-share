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

const allProfiles = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/profiles.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const createProfile = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/profiles.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateProfile = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/profiles/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleProfile = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/profiles.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      //  : Since we know there is only one profile, we can directly access the first (and only) element in this array using [0]. Hence, Object.values(data)[0] will give you the profile object
      const profile = data ? Object.values(data)[0] : null;
      resolve(profile);
    })
    .catch(reject);
});

export {
  getAllOtherProfiles, createProfile, updateProfile, allProfiles, getSingleProfile,
};
