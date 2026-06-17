(function () {
  console.debug('[modal] script loaded');
  const yearNodes = document.querySelectorAll('[data-current-year]');
  yearNodes.forEach((node) => {
    node.textContent = new Date().getFullYear();
  });

  const modalTriggers = document.querySelectorAll('[data-modal-open]');
  const modalClosers = document.querySelectorAll('[data-modal-close]');
  const modalPanels = document.querySelectorAll('[data-modal-hidden]');
  console.debug('[modal] found', { triggers: modalTriggers.length, closers: modalClosers.length, panels: modalPanels.length });

  const openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (!modal) {
      console.warn('[modal] open requested but modal not found:', modalId);
      return;
    }
    console.debug('[modal] opening', modalId);
    modal.setAttribute('data-modal-hidden', 'false');
    document.body.classList.add('modal-open');
  };

  const closeModal = (modal) => {
    if (!modal) {
      console.warn('[modal] close requested but modal element missing');
      return;
    }
    const id = modal.id || '(unknown)';
    console.debug('[modal] closing', id);
    modal.setAttribute('data-modal-hidden', 'true');

    const anyModalOpen = Array.from(modalPanels).some((panel) => panel.getAttribute('data-modal-hidden') === 'false');
    if (!anyModalOpen) {
      document.body.classList.remove('modal-open');
    }
  };

  modalTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      const id = trigger.getAttribute('data-modal-open');
      console.debug('[modal] trigger click ->', id);
      openModal(id);
    });
  });

  modalClosers.forEach((closer) => {
    closer.addEventListener('click', (event) => {
      event.preventDefault();
      closeModal(closer.closest('[data-modal-hidden]'));
    });
  });

  modalPanels.forEach((modal) => {
    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        closeModal(modal);
      }
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') {
      return;
    }

    const openModalPanel = Array.from(modalPanels).find((panel) => panel.getAttribute('data-modal-hidden') === 'false');
    if (openModalPanel) {
      closeModal(openModalPanel);
    }
  });
})();
