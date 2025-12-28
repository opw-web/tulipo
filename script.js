document.addEventListener('DOMContentLoaded', function() {
    const envelope = document.getElementById('envelope');
    const instruction = document.getElementById('instruction');
    let isOpened = false;

    // Add click event to envelope
    envelope.addEventListener('click', function() {
        if (!isOpened) {
            envelope.classList.add('opened');
            instruction.classList.add('hidden');
            isOpened = true;
            
            // Add some sparkle effect
            createSparkles();
        }
    });

    // Add touch support for mobile
    envelope.addEventListener('touchstart', function(e) {
        e.preventDefault();
        if (!isOpened) {
            envelope.classList.add('opened');
            instruction.classList.add('hidden');
            isOpened = true;
            createSparkles();
        }
    });

    // Create sparkle animation
    function createSparkles() {
        const sparkleCount = 20;
        const container = document.querySelector('.envelope-container');
        
        for (let i = 0; i < sparkleCount; i++) {
            const sparkle = document.createElement('div');
            sparkle.style.position = 'absolute';
            sparkle.style.width = '4px';
            sparkle.style.height = '4px';
            sparkle.style.background = '#fff';
            sparkle.style.borderRadius = '50%';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '100';
            
            const angle = (Math.PI * 2 * i) / sparkleCount;
            const distance = 150;
            const startX = container.offsetWidth / 2;
            const startY = container.offsetHeight / 2;
            
            sparkle.style.left = startX + 'px';
            sparkle.style.top = startY + 'px';
            
            container.appendChild(sparkle);
            
            const endX = startX + Math.cos(angle) * distance;
            const endY = startY + Math.sin(angle) * distance;
            
            sparkle.animate([
                {
                    transform: 'translate(0, 0) scale(1)',
                    opacity: 1
                },
                {
                    transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: 1000,
                easing: 'ease-out',
                fill: 'forwards'
            }).onfinish = () => {
                sparkle.remove();
            };
        }
    }

    // Add keyboard support (Enter or Space to open)
    document.addEventListener('keydown', function(e) {
        if ((e.key === 'Enter' || e.key === ' ') && !isOpened) {
            e.preventDefault();
            envelope.click();
        }
    });
});
