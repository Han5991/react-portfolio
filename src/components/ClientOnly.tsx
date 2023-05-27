import React, {useState, useEffect, ReactNode} from 'react';

interface ClientOnlyProps {
  children: ReactNode;
}

const ClientOnly = ({children}: ClientOnlyProps) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return hasMounted ? <>{children}</> : null;
};

export default ClientOnly;
