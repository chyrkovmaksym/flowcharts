function _createModal(options) {
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.insertAdjacentHTML('afterbegin', `
        <div class="modal-overlay">
            <div class="modal-window">
                <div class="modal-header">
                    <span class="modal-title">Support</span>
                    <span class="modal-close">&times;</span>
                </div>
                <div class="modal-body">
                    <h2 class="contacts">Contact to us</h2>
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
                </div>
                </div>
                <div class="modal-footer">
                </div>
            </div>
        </div>
    `);
  document.body.appendChild(modal);
  return modal;
}

$.modal = function (options) {
  const ANIMATION_SPEED = 200;
  const $modal = _createModal(options);
  let closing = false;

  return {
    open() {
      !closing && $modal.classList.add('active');
    },
    close() {
      $modal.classList.remove('active');
      $modal.classList.add('hide');
      closing = true;
      setTimeout(() => {
        $modal.classList.remove('hide');
        closing = false;
      }, ANIMATION_SPEED);
    },
    destroy() {},
  };
};
