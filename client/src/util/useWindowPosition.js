import { useLayoutEffect, useState } from "react";

export default function useWindowPosition(id) {
  const [animation, setAnimation] = useState(false);

  useLayoutEffect(() => {
    function updatePosition() {
      const offetSetHeight = window.document.getElementById(id).offsetHeight;
      if (window.pageYOffset > offetSetHeight * 0.2) {
        setAnimation(true);
      } else if (window.pageYOffset < offetSetHeight) {
        setAnimation(false);
      }
    }
    window.addEventListener("scroll", updatePosition);
    updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  }, [id]);
  return animation;
}
