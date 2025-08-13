import ProgressBar from 'progressbar.js';

const circle = document.querySelector<HTMLElement>('.time-circle');

const ring = new ProgressBar.Circle(circle, {
    strokeWidth: 4,
    trailWidth: 0,
    trailColor: 'transparent',
    color: '#fff',
    easing: 'linear',
    duration: 1000,                
    svgStyle: { position: 'absolute', width: '85%', height: '85%' },
    from: { color: '#D047FF' }, to: { color: '#fff' }
});

(ring as any).path.setAttribute('stroke-linecap', 'round');

export function updateRing(timeLeft: number, total: number) {
    ring.set(total ? timeLeft / total : 0);
}
