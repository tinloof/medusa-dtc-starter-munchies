import {useEffect, useState} from "react";

const useIsHydrated = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => setIsHydrated(true), []);
  return isHydrated;
};

export default useIsHydrated;
