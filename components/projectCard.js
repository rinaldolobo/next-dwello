import styles from "@/styles/projectCard.module.scss";
import Image from "next/image";

const imageLoader = ({ src, width, quality }) => {
  return `https://lh3.googleusercontent.com/${src}=w${width * 2}-h${
    width * 2
  }-c-rw-v3`;
};

const ProjectCard = ({ project, priority }) => {
  const getImgSrc = (url) => {
    if (url && url.indexOf("/") !== -1) {
      let segments = url.split("/");
      return segments[segments.length - 1];
    } else {
      return "COCNtKZ-ANjSVuZ_9VSfCNBonXQLnPIZWph-xWCLe0GGzmwipid65I22b2OiAacOOgoYsVG-JudVdavPYDn9mmKql9zmv23ZPA";
    }
  };

  const keyStr =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

  const triplet = (e1, e2, e3) =>
    keyStr.charAt(e1 >> 2) +
    keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
    keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
    keyStr.charAt(e3 & 63);

  const rgbDataURL = (r, g, b) =>
    `data:image/gif;base64,R0lGODlhAQABAPAA${
      triplet(0, r, g) + triplet(b, 255, 255)
    }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

  return (
    <div className={styles.projectWrapper}>
      <div className={styles.projectIconWrapper}>
        <Image
          loader={imageLoader}
          alt={`${project.name}`}
          src={`${getImgSrc(project.icon)}`}
          plcaeholder="blur"
          blurDataURL={rgbDataURL(237, 181, 6)}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          quality={100}
        />
      </div>
      <div className={styles.projectDataWrapper}>
        <div className={styles.pdRow1}>
          <div className={styles.pdName}>{project.name}</div>
          <div className={styles.pdPrice}>₹ 75 Lacs*</div>
        </div>
        <div className={styles.pdRow2}>
          <div className={styles.pdData}>{project.localityName}</div>
          <div className={styles.pdData}>₹10000/sq.ft</div>
        </div>
        <div className={styles.pdCommonRow}>1, 2, 3, 4 BHK</div>
        <div className={styles.pdCommonRow}>500-1000 sqft</div>
      </div>
    </div>
  );
};

export default ProjectCard;
