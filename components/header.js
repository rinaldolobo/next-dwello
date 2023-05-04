import styles from "@/styles/header.module.scss";
import utilityStyles from "@/styles/utils.module.scss";
import Image from "next/image";
import Link from "next/link";

const Header = ({ headerStyle }) => {
  return (
    <div
      className={
        headerStyle === "unfixed" ? styles.headerUnfixed : styles.headerFixed
      }
    >
      <div className={`${styles.wrapper} container-fluid`}>
        {headerStyle === "fixed" && (
          <div className={styles.leftPart}>
            <Link href={`/`}>
              <div className={styles.logo}></div>
            </Link>
          </div>
        )}

        <div className={styles.rightSearchPart}>
          <div className={styles.search}>
            <input
              className={styles.searchBox}
              type="text"
              placeholder="Enter a term to search"
            />
            <span
              className={`${utilityStyles.dwelloicfont} ${utilityStyles.dwelloicfont_search} ${styles.dwelloicfont}`}
            ></span>
          </div>
          <div className={styles.userProfile}>
            <Image
              src={
                "https://storage.googleapis.com/dwello_static_assets/images/new-mobile/dp_placeholder.jpg"
              }
              width={35}
              height={35}
              alt={"user"}
            />
          </div>
        </div>
        {/*<a class="logo" [href]="'/news'" routerLink="/news"></a>*/}
      </div>
    </div>
  );
};

export default Header;
