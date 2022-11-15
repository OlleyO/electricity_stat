import Link from "next/link";

import styles from "./styles.module.scss";

const View404 = () => {
  return (
    <div className={styles.page}>
      <h1>404</h1>
      <p>Page not found</p>
      <Link href="/">Go to website</Link>
    </div>
  );
};

export default View404;
