import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "@/components/header";
import styles from "@/styles/article.module.scss";
import utilityStyles from "@/styles/utils.module.scss";
import Image from "next/image";
import CustomDate from "@/components/date";
import DOMPurify from "isomorphic-dompurify";
import Link from "next/link";

export async function getServerSideProps({ params }) {
  const { article } = params;
  console.log(article);

  const articleRes = await fetch(
    "https://marketing.dwello.in/publishing/article.json?permalink=" + article
  );
  console.log(articleRes);
  let temp = await articleRes.json();
  let decodedContent = atob(temp.content);
  let cleanHtml = DOMPurify.sanitize(decodedContent);
  temp.content = cleanHtml;
  const articleData = temp;

  const categoriesRes = await fetch(
    "https://marketing.dwello.in/publishing/categories.json"
  );

  const categoriesData = await categoriesRes.json();

  // Return the data as props
  return {
    props: { articleData, categoriesData },
  };
}

const Article = ({ articleData, categoriesData }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  return (
    <div>
      <Header headerStyle={"fixed"} />
      {articleData && (
        <div className={styles.newsWrapper}>
          <div className={`${styles.newsPageContainer} container`}>
            <div className={styles.articleContainer}>
              <div className={styles.articleBanner}>
                <Image
                  alt={articleData.title}
                  src={articleData.icon}
                  fill
                  sizes="(max-width: 768px) 100%,100%"
                  style={{
                    objectFit:
                      articleData.subCategory == "developers_take"
                        ? "contain"
                        : "cover",
                  }}
                />
              </div>
              <div className={styles.dwelloBreadcrumbs}>
                <span className={styles.circle} />
                <span
                  className={`${utilityStyles.dwelloicfont} ${utilityStyles.dwelloicfont_angle_right} ${styles.angles}`}
                />
                <span>{articleData.category_name}</span>
                <span
                  className={`${utilityStyles.dwelloicfont} ${utilityStyles.dwelloicfont_angle_right} ${styles.angles}`}
                />
                <span
                  className={styles.subCatsDd}
                  style={{
                    cursor:
                      categoriesData &&
                      categoriesData[articleData.category].length > 0
                        ? "pointer"
                        : "default",
                  }}
                  onMouseOver={() => {
                    setShowDropdown(true);
                  }}
                  onMouseLeave={() => {
                    setShowDropdown(false);
                  }}
                >
                  {articleData.sub_category_name}
                  {categoriesData &&
                    categoriesData[articleData.category].length > 0 && (
                      <span
                        className={`${utilityStyles.dwelloicfont} ${utilityStyles.dwelloicfont_caret_down} ${styles.dwelloicfont_caret_down}`}
                        onMouseOver={() => {
                          setShowDropdown(true);
                        }}
                        onMouseLeave={() => {
                          setShowDropdown(false);
                        }}
                      />
                    )}
                  {showDropdown && (
                    <ul
                      className={styles.subCatDrodown}
                      onMouseOver={() => {
                        setShowDropdown(true);
                      }}
                      onMouseLeave={() => {
                        setShowDropdown(false);
                      }}
                    >
                      {categoriesData[articleData.category].map((cat) => (
                        <Link
                          key={cat.sub_category_name}
                          href={`/category/${articleData.category}/${cat.sub_category_id}`}
                        >
                          <li className={styles.subCatItem}>
                            {cat.sub_category_name}
                          </li>
                        </Link>
                      ))}
                    </ul>
                  )}

                  {/*    <ul class="sub-cat-drodown" *ngIf="showDropdown" (mouseover)="showDropdown=true"*/}
                  {/*(mouseleave)="showDropdown=false">*/}
                  {/*<li class="sub-cat-item" *ngFor="let cat of categories[articleData.category]"*/}
                  {/*  [routerLink]="['/news/category/',articleData.category,cat.sub_category_id]">{{*/}
                  {/*    cat.sub_category_name }}</li>*/}
                  {/*</ul>*/}
                </span>
              </div>
              <div className={styles.articleTitle}>{articleData.title}</div>
              <div className={styles.articleSummary}>{articleData.summary}</div>
              <div className={styles.articleAuthorContainer}>
                <div className={styles.articleAuthorWrapper}>
                  <div className={styles.authorDp}>
                    <Image
                      src={articleData.author_dp}
                      fill
                      sizes="(max-width: 768px) 100%,100%"
                      alt={articleData.author}
                    />
                  </div>
                  <div className={styles.details}>
                    <div className={styles.authorName}>
                      {articleData.author}
                    </div>
                    <div className={styles.published}>
                      <CustomDate dateString={articleData.created}></CustomDate>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={styles.articleContent}
                dangerouslySetInnerHTML={{
                  __html: `${articleData.content}`,
                }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Article;
