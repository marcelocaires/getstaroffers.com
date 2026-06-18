const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
const modalClose = document.getElementById('modalClose');

function abrirModal(templateId) {
  const template = document.getElementById(templateId);

  if (!template) {
    console.error(`Template não encontrado: ${templateId}`);
    return;
  }

  modalContent.innerHTML = '';
  modalContent.appendChild(template.content.cloneNode(true));

  modal.showModal();
}

function fecharModal() {
  modal.close();
  modalContent.innerHTML = '';
}

document.querySelectorAll('[data-modal-template]').forEach((button) => {
  button.addEventListener('click', () => {
    const templateId = button.dataset.modalTemplate;
    abrirModal(templateId);
  });
});

modalClose.addEventListener('click', fecharModal);

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    fecharModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.open) {
    fecharModal();
  }
});