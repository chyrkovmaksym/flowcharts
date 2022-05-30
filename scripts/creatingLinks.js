function loadJson(url) {
    return fetch(url)
        .then((response) => response.json());
  }
  
  function loadUser(name) {
    return fetch(`https://api.github.com/users/${name}`)
        .then((response) => response.json());
  }
  
  function getAvatar(user) {
    return new Promise(function(resolve, reject) {
      const img = document.getElementById('img_fot');
      img.src = user.avatar_url;
      resolve(user);
    });
  }
  
  function createLink(name) {
    return new Promise(function(resolve, reject) {
      const link = document.getElementById('link_fot');
      link.href = `https://github.com/${name}`;
      resolve(name);
    });
  }
  
  loadJson('https://api.github.com/repos/chyrkovmaksym/course_project/commits')
      .then((commits) => {
        return commits[0].author.login;
      })
      .then(createLink)
      .then((user) => loadUser(user))
      .then(getAvatar)
      .catch((e) => {
        throw new Error(e);
      });
  