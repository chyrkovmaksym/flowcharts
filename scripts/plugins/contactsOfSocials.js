const selectElement = (selector) => {
    const element = document.querySelector(selector);
    if (element) return element;
    throw new Error('Make sure that everything is correct!');
  };

const configOfInst = {
    parentClass: '.dropdown-inst',
    class: '.dropdown-inst-content',
    content: {
        Oleg: '_olegoofy_',
        Maks: 'chirkov_maxim_13124',
        Vlad: 'o.g_vlad',
        Vita: 'vita_andrukhiv',
        Ivan: 'ivan_anenko',
    },
    link: 'https://instagram.com/',
}

const configOfGit = {
    parentClass: '.dropdown-git',
    class: '.dropdown-git-content',
    content: {
        Oleg: 'olegoofy',
        Maks: 'chyrkovmaksym',
        Vlad: 'AidXylelele',
        Vita: 'vita133',
        Ivan: 'LikerFeed',
    },
    link: 'https://github.com/',
}

const configOfTg = {
    parentClass: '.dropdown-tg',
    class: '.dropdown-tg-content',
    content: {
        Oleg: 'olegoofy',
        Maks: 'maxchyrkov',
        Vlad: 'o_g_vlad',
        Vita: 'vita_andrukhiv',
        Ivan: 'ivan_anenko',
    },
    link: 'https://t.me/',
}

const createContent = (options) => {
    const element = selectElement(options.class);
    for (const key in options.content) {
        const link = options.link + options.content[key];
        element.insertAdjacentHTML('afterbegin', `<a target="_blank" href="${link}">${key}</a>`);
    }
}

createContent(configOfInst);
createContent(configOfGit);
createContent(configOfTg);