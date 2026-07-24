// Dynamic Font Size Scaling on Pinch (Mobile Text Reflow)
// Replaces native browser zoom with custom text-only zoom via root font-size.
(function initPinchToTextZoom() {
    // Only run on touch devices
    if (!('ontouchstart' in window)) return;

    // Inject CSS to disable transitions while pinching
    const style = document.createElement('style');
    style.innerHTML = '.is-pinching, .is-pinching * { transition: none !important; animation: none !important; }';
    document.head.appendChild(style);

    let initialDistance = 0;
    let initialFontSize = 10;
    let isPinching = false;
    let rafId = null;
    let pendingSize = null;

    // Disable native pinch-zoom via CSS touch-action on <html>
    document.documentElement.style.touchAction = 'pan-x pan-y';

    function getDistance(t1, t2) {
        const dx = t1.clientX - t2.clientX;
        const dy = t1.clientY - t2.clientY;
        return Math.sqrt(dx * dx + dy * dy);
    }

    function applySize() {
        if (pendingSize !== null) {
            document.documentElement.style.fontSize = pendingSize + 'px';
        }
        rafId = null;
    }

    function scheduleUpdate(size) {
        pendingSize = size;
        if (rafId === null) {
            rafId = requestAnimationFrame(applySize);
        }
    }

    function startPinch() {
        document.body.classList.add('is-pinching');
    }

    function endPinch() {
        document.body.classList.remove('is-pinching');
    }

    // --- Touch events (Android Chrome, most browsers) ---

    document.addEventListener('touchstart', function (e) {
        if (e.touches.length === 2) {
            isPinching = true;
            startPinch();
            initialDistance = getDistance(e.touches[0], e.touches[1]);
            initialFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 10;
        }
    }, { passive: false });

    document.addEventListener('touchmove', function (e) {
        if (isPinching && e.touches.length === 2) {
            // Block native zoom
            e.preventDefault();

            const dist = getDistance(e.touches[0], e.touches[1]);
            const scale = dist / initialDistance;
            const newSize = Math.max(8, Math.min(initialFontSize * scale, 18));
            scheduleUpdate(newSize);
        }
    }, { passive: false }); 

    document.addEventListener('touchend', function (e) {
        if (e.touches.length < 2) {
            isPinching = false;
            endPinch();
        }
    }, { passive: true });

    document.addEventListener('touchcancel', function () {
        isPinching = false;
        endPinch();
    }, { passive: true });

    // --- Gesture events (iOS Safari) ---

    document.addEventListener('gesturestart', function (e) {
        e.preventDefault();
        startPinch();
        initialFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 10;
    }, { passive: false });

    document.addEventListener('gesturechange', function (e) {
        e.preventDefault();
        const newSize = Math.max(8, Math.min(initialFontSize * e.scale, 18));
        scheduleUpdate(newSize);
    }, { passive: false });

    document.addEventListener('gestureend', function (e) {
        e.preventDefault();
        endPinch();
    }, { passive: false });
})();
