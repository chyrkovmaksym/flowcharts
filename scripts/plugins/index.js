const configOfSupport = {
  title: 'Support',
  closable: true,
  content: ` <h2 class="contacts">Contact to us</h2>
    <div class="dropdown-inst">
        ${selectElement(configOfInst.parentClass).innerHTML}
    </div>
    <div class="dropdown-git">
        ${selectElement(configOfGit.parentClass).innerHTML}
    </div>
    <div class="dropdown-tg">
    ${selectElement(configOfTg.parentClass).innerHTML}
    </div>`,
  width: 'fit-content',
};

const configOfTermsOfService = {
  title: 'Terms Of Service',
  closable: true,
  content: `
    <p class="inf_pro">Our project is open, since all data and algorithms are on the public GitHub platform.
    Everyone can make changes, which, after review by our team, can be accepted!</p>`,
  width: '350px',
};

const configOfFAQ = {
  title: 'F.A.Q',
  closable: true,
  content: `
  <ul class="FAQ-list">
  <li>Why might my code not work well?</li>
  <li>- Our project is under development! Be patient.</li>
  <li>How do I remove the flowchart from the output window?</li>
  <li>- Click the "Clear" button</li>
</ul>`,
  width: '350px',

};

const configOfWarning = {
  title: 'Warning',
  closable: true,
  content: `
  <ol class="square">
  <li>Paste your code.</li>
  <li>Our service is only capable of processing the C programming language!</li>
  <li>Please add clean and working code.</li>
  <li>Please follow the syntax rules.</li>
  <li>Your code should contain only one function (main). Don't use external functions!</li>
  <li>Also press the clear button before uploading new code or editing.</li>
  </ol>`,
  width: '350px',
};

const modalFAQ = $.modal(configOfFAQ);

const modalTermsOfService = $.modal(configOfTermsOfService);

const modalSupport = $.modal(configOfSupport);

const modalWarning = $.modal(configOfWarning);
