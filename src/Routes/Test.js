// let options = {
//     root: document.querySelector('#scrollArea'),
//     rootMargin: '0px',
//     threshold: 1.0
//   }
//   // 1. IntersectionObserver를 만든다
//   let observer = new IntersectionObserver(callback, options);
//   // 2. tar 만든다
//   let target = document.querySelector('#listItem');
//   observer.observe(target)

//     const [ref, setRef] = useState(null);

//     const checkIntersect = (
//       entry: IntersectionObserverEntry[],
//       observer: IntersectionObserver
//     ) => {
//       if (entry[0].isIntersecting) {
//         interSectAction();
//       }
//     };

//     useEffect(() => {
//       let observer: any;
//       if (ref) {
//         observer = new IntersectionObserver(checkIntersect, baseOption);
//         observer.observe(ref);
//       }
//       return () => observer && observer.disconnect();
//     }, [ref, option.root, option.threshold, option.rootMargin, checkIntersect]);
//     return [ref, setRef];
