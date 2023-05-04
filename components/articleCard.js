import styles from "@/styles/articleCard.module.scss";
import Image from "next/image";
import Link from "next/link";

const ArticleCard = ({ article }) => {
  return (
    <div className={styles.articleCardWrapper}>
      <Link href={`/${article.permalink}`}>
        <div className={styles.article}>
          <div className={styles.articleBanner}>
            <Image
              src={`${article.coverImage}`}
              fill
              sizes="(max-width: 768px) 100%,100%"
              alt={`${article["title"]}`}
            />
          </div>
          <div className={styles.articleTitle}>{article["title"]}</div>
          <div className={styles.articleSummary}>{article["summary"]}</div>
        </div>
      </Link>
    </div>
  );
};

export default ArticleCard;
