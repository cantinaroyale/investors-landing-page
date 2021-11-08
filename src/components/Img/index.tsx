import { useEffect, useState } from "react";
import Spinner from "../Spinner";

interface Props {
  id?: string;
  src?: string;
  alt?: string;
}

function Img({ id, src = "", alt = "" }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!src) {
      setIsLoading(false);
    }
  }, [src]);
  return (
    <div className="img" id={id}>
      {isLoading && <Spinner />}
      {src && (
        <img
          style={{ opacity: isLoading ? 0 : 1 }}
          src={src}
          alt={alt}
          onLoad={() => setIsLoading(true)}
        />
      )}
    </div>
  );
}

export default Img;
