let levitation = () => {
  const tlLevitation = gsap.timeline({ defaults: { duration: .7 }, repeat: -1, repetDelay: 0});
  tlLevitation.to(".block__voice--control--people", { x: -3});
  tlLevitation.to(".block__voice--control--people", { x: 3});
  tlLevitation.to(".block__voice--control--people", { x: 0});
  return tlLevitation;
}

const tl = gsap.timeline({ defaults: { duration: 3 }});
tl.to(".block__voice--control--hole", { scale: 1.5 });
tl.to(".block__voice--control--people", { y: -780, duration: 8});
tl.add(levitation);
tl.to(".block__voice--control--hole", { scale: 1.1 });
