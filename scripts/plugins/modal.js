const DEFAULT_WIDTH = 'fit-content';
function _createModal(options) {
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.insertAdjacentHTML('afterbegin', `
        <div class="modal-overlay" data-close="true">
            <div class="modal-window"  style="width: ${options.width}">
                <div class="modal-header">
                    <span class="modal-title">${options.title || 'Window'}</span>
                    ${options.closable ? '<span class="modal-close" data-close="true">&times;</span>' : ''}
                </div>
                <div class="modal-body">
                  ${options.content || ''}
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
  let destroyed = false;

  const methodsOfModal = {
    open() {
      if (destroyed) return;
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
    destroy() {
      $modal.parentNode.removeChild($modal);
      $modal.removeEventListener('click', listener);
      destroyed = true;
    },
  };
  const listener = (event) => {
    if (event.target.dataset.close) {
      methodsOfModal.close();
    }
  };

  $modal.addEventListener('click', listener);

  return methodsOfModal;
};
