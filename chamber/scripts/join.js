document.addEventListener('DOMContentLoaded', function() {
    const now = new Date();
    document.getElementById('timestamp').value = now.toISOString();
    
    initModals();
    
    initMembershipSelection();
});

function initModals() {
    const modalButtons = document.querySelectorAll('.info-btn');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    modalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; 
            }
        });
    });
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = ''; 
            }
        });
    });
    
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            });
        }
    });
}

function initMembershipSelection() {
    const membershipCards = document.querySelectorAll('.membership-card');
    const radioInputs = document.querySelectorAll('input[name="membershipLevel"]');
    
    membershipCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('info-btn')) {
                const level = this.getAttribute('data-level');
                const radioInput = document.querySelector(`input[value="${level}"]`);
                if (radioInput) {
                    radioInput.checked = true;
                    
                    membershipCards.forEach(c => c.classList.remove('selected'));
                    this.classList.add('selected');
                }
            }
        });
    });
    
    radioInputs.forEach(input => {
        input.addEventListener('change', function() {
            membershipCards.forEach(card => card.classList.remove('selected'));
            const selectedCard = document.querySelector(`[data-level="${this.value}"]`);
            if (selectedCard) {
                selectedCard.classList.add('selected');
            }
        });
    });
}

document.getElementById('membership-form')?.addEventListener('submit', function(e) {
    console.log('Form submitted successfully');
});