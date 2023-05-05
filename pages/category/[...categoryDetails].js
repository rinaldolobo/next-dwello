import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "@/components/header";
import styles from "../../styles/categoryDetails.module.scss";
import utilityStyles from "../../styles/utils.module.scss";
import ArticleCard from "@/components/articleCard";
import ContentLoader from "@/components/contentLoader";
import InfiniteScroll from "react-infinite-scroll-component";

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

  let list = await getArticles(0, 18, category, subCategory);
  console.log(list);
  articles = list["results"];
  // Return the data as props
  return {
    props: { articles, category, subCategory },
  };
}

const ArticlesByCategory = ({ articles, category, subCategory }) => {
  const [articleList, setArticleList] = useState(articles);
  const [getMore, setGetMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const router = useRouter();

  const getSearchTitle = () => {
    if (subCategory) {
      return subCategory.split("_").join(" ");
    } else {
      return category.split("_").join(" ");
    }
  };

  const loadMore = () => {
    console.log("more", getMore);
    if (getMore) {
      setOffset(offset + 18);
    }
  };

  const getMoreArticles = async () => {
    const list = await getArticles(offset, 18, category, subCategory);
    console.log(list);
    const arts = await list["results"];
    setGetMore(arts.length > 0);
    let loadedArticles = articleList.length > 0 ? articleList : articles;
    setArticleList([...loadedArticles, ...arts]);
  };

  useEffect(() => {
    if (offset > 0) {
      getMoreArticles();
    }
  }, [offset]);

  return (
    <div>
      <Header headerStyle={"fixed"} />
      <div className={styles.newsExploreWrapper}>
        <div className={styles.searchHead}>
          <div className={`${styles.searcher} ${utilityStyles.containerFluid}`}>
            <div
              className={`${utilityStyles.dwelloicfont} ${utilityStyles.dwelloicfont_arrowLeft} ${styles.dwelloicfont_arrowLeft}`}
              onClick={() => {
                window.history.back();
              }}
            />
            <div className={styles.filterBy}>{getSearchTitle()}</div>
          </div>
        </div>
        <div
          className={`${styles.newsExploreContainer} ${utilityStyles.containerFluid}`}
        >
          <div className={styles.resultItems}>
            {articleList && (
              <InfiniteScroll
                dataLength={articleList.length}
                next={loadMore}
                // style={{ display: "flex", flexDirection: "column-reverse" }} //To put endMessage and loader to the top.
                hasMore={getMore}
                loader={
                  <div className={styles.contentLoader}>
                    <ContentLoader />
                  </div>
                }
              >
                <>
                  {articleList.map((article) => (
                    <ArticleCard key={article.objectid} article={article} />
                  ))}
                </>
              </InfiniteScroll>
            )}
          </div>
          {/*{gettingData && (*/}
          {/*  <div className={styles.contentLoader}>*/}
          {/*    <ContentLoader />*/}
          {/*  </div>*/}
          {/*)}*/}
        </div>
      </div>
    </div>
  );
};

export default ArticlesByCategory;
