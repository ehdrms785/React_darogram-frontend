import { useEffect } from "react";

export default ({
  root = null,
  target,
  onIntersect,
  threshold = 1,
  rootMargin = "0px",
}) => {
  let observer = new IntersectionObserver(onIntersect, {
    root,
    rootMargin,
    threshold,
  });
  if (!target) {
    return;
  }
  // console.log("옵저브실행");
  observer.observe(target);
  return observer;
};
