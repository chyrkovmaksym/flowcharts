const configOfSupport = {
  title: 'Support',
  closable: true,
  content: ` <h2 class="contacts">Contact to us</h2>
    <div class="dropdown-inst">
        <button class="dropbtn-inst">Instagram</button>
        <div class="dropdown-inst-content">
          <a href="#iii">Vlad</a>
          <a href="#">Oleg</a>
          <a href="#">Vita</a>
        </div>
    </div>
    <div class="dropdown-git">
        <button class="dropbtn-git">GitHub</button>
        <div class="dropdown-git-content">
          <a href="#">Vlad</a>
          <a href="#">Oleg</a>
          <a href="#">Vita</a>
        </div>
    </div>
    <div class="dropdown-tg">
        <button class="dropbtn-tg">Telegram</button>
        <div class="dropdown-tg-content">
          <a href="#tg">Vlad</a>
          <a href="#">Oleg</a>
          <a href="#">Vita</a>
        </div>
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

const modalTermsOfService = $.modal(configOfTermsOfService);

const modalSupport = $.modal(configOfSupport);
