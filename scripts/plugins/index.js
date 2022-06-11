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
    <p class="inf_pro">As part of the project life cycle, a significant amount of data and information in
                    various formats is collected, analyzed, transformed and disseminated to project team members and
                    other stakeholders. Project data is collected as a result of various execution processes, after
                    which it is provided to project team members. The collected data is analyzed in context, combined
                    and transformed into project information during various control processes. The information can then
                    be transmitted orally or stored and distributed in the form of reports presented in a variety of
                    formats.</p>`,
  width: '400px',
};

const configOfFAQ = {
  title: 'F.A.Q',
  closable: true,
  content: `
          <p class="inf_pro">As part of the project life cycle, a significant amount of data and information in
                          various formats is collected, analyzed, transformed and disseminated to project team members and
                          other stakeholders. Project data is collected as a result of various execution processes, after
                          which it is provided to project team members. The collected data is analyzed in context, combined
                          and transformed into project information during various control processes. The information can then
                          be transmitted orally or stored and distributed in the form of reports presented in a variety of
                          formats.</p>`,
  width: '400px',

};

const configOfWarning = {
  title: 'Warning',
  closable: true,
  content: `
          <p class="inf_pro">As part of the project life cycle, a significant amount of data and information in
                          various formats is collected, analyzed, transformed and disseminated to project team members and
                          other stakeholders. Project data is collected as a result of various execution processes, after
                          which it is provided to project team members. The collected data is analyzed in context, combined
                          and transformed into project information during various control processes. The information can then
                          be transmitted orally or stored and distributed in the form of reports presented in a variety of
                          formats.</p>`,
  width: '400px',
};

const modalFAQ = $.modal(configOfFAQ);

const modalTermsOfService = $.modal(configOfTermsOfService);

const modalSupport = $.modal(configOfSupport);

const modalWarning = $.modal(configOfWarning);
