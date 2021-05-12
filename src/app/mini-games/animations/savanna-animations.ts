import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

export const moveTargetWord = trigger('moveTargetWord', [
  state('top', style({ top: '5%' })),
  state('bottom', style({ top: '70%' })),
  state('answered', style({ opacity: 0 })),
  transition('top => bottom', animate('6000ms 500ms')),
  transition('bottom => top', animate(1000)),
  transition(
    'answered => top',
    animate(1000, keyframes([style({ opacity: 0, offset: 0 }), style({ opacity: 0, offset: 0.99 }), style({ opacity: 1, offset: 1 })])),
  ),
]);

export const flyTopDown = trigger('flyTopDown', [
  state('top', style({ transform: 'translateY(0)' })),
  state('void', style({ marginTop: '100px' })),
  transition('void <=> top', [style({ marginTop: '0px' }), animate(1000)]),
]);
