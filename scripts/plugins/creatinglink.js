const BASE_URL = 'https://api.github.com/users/';

const COMMITS_URL = 'https://api.github.com/repos/chyrkovmaksym/course_project/commits';

const loadJson = (url) => fetch(url).then((response) => response.json());

const loadUser = (name) => loadJson(BASE_URL + name);

const getAvatar = (user) => new Promise((resolve) => {
  const img = document.getElementById('img_fot');
  img.src = user.avatar_url;
  resolve(user);
});

const createLink = (name) => new Promise((resolve) => {
  const link = document.getElementById('link_fot');
  link.href = `https://github.com/${name}`;
  resolve(name);
});

loadJson(COMMITS_URL)
  .then((commits) => commits[0].author.login)
  .then(createLink)
  .then(loadUser)
  .then(getAvatar)
  .catch((e) => {
    throw new Error(e);
  });
