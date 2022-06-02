const selectElement = (selector) => {
  const element = document.querySelector(selector);
  if (element) return element;
  throw new Error('Make sure that everything is correct!');
};

const dropbtnInst = selectElement('.dropbtn-inst');
const dropbtnGit = selectElement('.dropbtn-git');
const dropbtnTg = selectElement('.dropbtn-tg');
const supportBtn = selectElement('.support');
const termsOfServiceBtn = selectElement('.termsOfSupport');

dropbtnInst.addEventListener('click', () => {
  const dropdownInst = selectElement('.dropdown-inst');
  dropdownInst.classList.toggle('active');
});

dropbtnGit.addEventListener('click', () => {
  const dropdownGit = selectElement('.dropdown-git');
  dropdownGit.classList.toggle('active');
});

dropbtnTg.addEventListener('click', () => {
  const dropdownTg = selectElement('.dropdown-tg');
  dropdownTg.classList.toggle('active');
});

supportBtn.addEventListener('click', () => {
  modalSupport.open();
});

termsOfServiceBtn.addEventListener('click', () => {
  modalTermsOfService.open();
});
