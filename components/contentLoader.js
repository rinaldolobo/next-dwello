import styles from "@/styles/contentLoader.module.scss";
import Image from "next/image";

const ContentLoader = () => {
  return (
    <div className={styles.contentLoader}>
      <Image
        src="https://storage.googleapis.com/dwello_static_assets/images/loading.gif"
        alt=""
        fill
      />
    </div>
  );
};

export default ContentLoader;
