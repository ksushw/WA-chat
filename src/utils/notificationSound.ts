export const createSoundPlayer = (src: string) => {
    if (typeof window === "undefined") return () => {}; // SSR-защита
  
    const audio = new Audio(src);
    audio.load(); // Предзагрузка
  console.log(audio)
    return () => {
      audio.currentTime = 0; // Перемотка в начало
      audio.play().catch((err) => console.warn("Ошибка при воспроизведении звука:", err));
    };
  };
  