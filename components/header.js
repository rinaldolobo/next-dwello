import Image from "next/image";
import styles from "@/styles/header.module.scss";

const Header = () => {
  return (
    <div className={styles.headerWrapper}>
      <Image
        alt={"header"}
        src={
          "https://storage.googleapis.com/cdn.dwello.in/assets/images/next-dwello/header-sm.png"
        }
        fill
      />
    </div>
  );
};

export default Header;
