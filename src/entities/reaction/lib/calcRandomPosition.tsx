export const calcRandomPosition = () => {
  const bodyRect = document.body.getBoundingClientRect();

  const x = Math.random() * bodyRect.width;
  const y = Math.random() * bodyRect.height;

  return { x, y };
};
