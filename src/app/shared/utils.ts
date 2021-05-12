
export function playAudio(dataUrl: string, url1: string, url2: string, url3: string): void {
  const audio1 = new Audio();
  const audio2 = new Audio();
  const audio3 = new Audio();
  audio1.src = `${dataUrl}/${url1}`;
  audio2.src = `${dataUrl}/${url2}`;
  audio3.src = `${dataUrl}/${url3}`;
  audio1.load();
  audio1.play();
  audio1.addEventListener('ended', function () {
    if (audio1.duration === audio1.currentTime) {
      audio2.play();
    }
  });
  audio2.addEventListener('ended', function () {
    if (audio2.duration === audio2.currentTime) {
      audio3.play();
    }
  });
}
