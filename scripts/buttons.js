const buttons = {
  dropbtnInst: selectElement('.dropbtn-inst'),
  dropbtnGit: selectElement('.dropbtn-git'),
  dropbtnTg: selectElement('.dropbtn-tg'),
  supportBtn: selectElement('.support'),
  termsOfServiceBtn: selectElement('.termsOfSupport'),
  FAQBtn: selectElement('.FAQ'),
};

const toggle = (button, type) => {
  button.addEventListener('click', () => {
    const dropdown = selectElement(`.dropdown-${type}`);
    dropdown.classList.toggle('active');
  });
};

toggle(buttons.dropbtnInst, 'inst');
toggle(buttons.dropbtnGit, 'git');
toggle(buttons.dropbtnTg, 'tg');

buttons.supportBtn.addEventListener('click', () => {
  modalSupport.open();
});

buttons.termsOfServiceBtn.addEventListener('click', () => {
  modalTermsOfService.open();
});

buttons.FAQBtn.addEventListener('click', () => {
  modalFAQ.open();
});
