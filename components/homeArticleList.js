import styles from "@/styles/articleList.module.scss";
import { useEffect, useState } from "react";
import Image from "next/image";
import CustomDate from "@/components/date";
import Link from "next/link";

const HomeArticleList = ({ articles }) => {
  const getReadableTime = (timeinsecs) => {
    return Math.round(timeinsecs / 60) + " minute read";
  };

  return (
    <div className={styles.articlesWrapper}>
      {articles &&
        articles.map((article) => (
          <a key={article.objectid} href={`/news/${article.permalink}`}>
            <div className={styles.articleContainer}>
              <div className={styles.article}>
                <div className={styles.articleBanner}>
                  <Image
                    src={`${article.coverImage}`}
                    width={215}
                    height={110}
                    alt={`${article["title"]}`}
                  />
                </div>
                <div className={styles.articleTitle}>{article["title"]}</div>
                <div className={styles.articleSummary}>
                  {/*{article["created"] * 1000}*/}
                  <CustomDate dateString={article["created"] * 1000} />
                  <div className={styles.dot}> </div>
                  {getReadableTime(article["time_to_read"])}
                </div>
              </div>
            </div>
          </a>
        ))}
    </div>
  );
};

export default HomeArticleList;
