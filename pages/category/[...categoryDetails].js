import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "@/components/header";
import styles from "../../styles/categoryDetails.module.scss";
import utilityStyles from "../../styles/utils.module.scss";
import ArticleCard from "@/components/articleCard";

const getArticles = (offset, limit, category, subcategory = null) => {
  return fetch(
    `https://marketing.dwello.in/publishing/articles.json?${
      subcategory ? "sub_category=" + subcategory : ""
    }&limit=${limit}&offset=${offset}&${category ? "category=" + category : ""}`
  )
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
};

export async function getServerSideProps({ params }) {
  const { categoryDetails } = params;
  console.log(categoryDetails);

  let articles;

  let category = categoryDetails[0];
  let subCategory = categoryDetails[1] ? categoryDetails[1] : null;
  console.log(category, subCategory);

  let list = await getArticles(0, 10, category, subCategory);
  console.log(list);
  articles = list["results"];
  // Return the data as props
  return {
    props: { articles, category, subCategory },
  };
}

const ArticlesByCategory = ({ articles, category, subCategory }) => {
  // const [articleList, setArticleList] = useState([]);
  const router = useRouter();

  // useEffect(() => {
  //   console.log(articles);
  //   setArticleList(articles);
  // }, [articles]);

  const getSearchTitle = () => {
    if (subCategory) {
      return subCategory.split("_").join(" ");
    } else {
      return category.split("_").join(" ");
    }
  };

  return (
    <div>
      <Header headerStyle={"fixed"} />
      <div className={styles.newsExploreWrapper}>
        <div className={styles.searchHead}>
          <div className={`${styles.searcher} ${utilityStyles.containerFluid}`}>
            <div
              className={`${utilityStyles.dwelloicfont} ${utilityStyles.dwelloicfont_arrowLeft} ${styles.dwelloicfont_arrowLeft}`}
              onClick={() => {
                router.back();
              }}
            />
            <div className={styles.filterBy}>{getSearchTitle()}</div>
          </div>
        </div>
        <div
          className={`${styles.newsExploreContainer} ${utilityStyles.containerFluid}`}
          style={{ marginTop: "150px" }}
        >
          <div className={styles.resultItems}>
            {articles &&
              articles.map((article) => (
                <ArticleCard key={article.objectid} article={article} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlesByCategory;
