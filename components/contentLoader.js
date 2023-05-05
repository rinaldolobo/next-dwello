import styles from "@/styles/contentLoader.module.scss";

const ContentLoader = () => {
  return (
    <div className={styles.contentLoader}>
      <img
        src="https://storage.googleapis.com/dwello_static_assets/images/loading.gif"
        alt=""
      />
    </div>
  );
};

export default ContentLoader;
