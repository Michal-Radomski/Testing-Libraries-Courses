import "@exuanbo/file-icons-js/dist/css/file-icons.css";
import icons from "@exuanbo/file-icons-js/dist/js/file-icons";
import { SetStateAction, useEffect, useState } from "react";
import classNames from "classnames";

function FileIcon({ name, className }: { name: string; className?: string }): JSX.Element {
  const [klass, setKlass] = useState<string>("");

  useEffect(() => {
    icons
      .getClass(name)
      .then((k: SetStateAction<string>) => setKlass(k))
      .catch(() => null);
  }, [name]);

  if (!klass) {
    return null as any;
  }

  return <i role="img" aria-label={name} className={classNames(className, klass)}></i>;
}

export default FileIcon;
