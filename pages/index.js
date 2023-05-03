import Image from "next/image";
import styles from "../styles/Home.module.scss";
import utilityStyles from "../styles/utils.module.scss";
import Layout from "@/components/layout";
import { useEffect } from "react";
import ArticleList from "@/components/articleList";

const groupBy = (data, key) => {
  return data.reduce((acc, item) => {
    (acc[item[key]] = acc[item[key]] || []).push(item);
    return acc;
  }, {});
};

export async function getServerSideProps() {
  try {
    // Call the API to get the categories data
    const categoriesResponse = await fetch(
      "https://marketing.dwello.in/publishing/categories.json"
    );
    const categoriesData = await categoriesResponse.json();

    // Get articles for each sub category and add them to the respective object
    const subCategoriesWithArticles = await Promise.all(
      Object.keys(categoriesData).map(async (category) => {
        const subCategories = categoriesData[category];

        // Get articles for each sub category and add them to the respective object
        const subCategoriesWithArticles = await Promise.all(
          subCategories.map(async (subCategory) => {
            const { sub_category_id } = subCategory;
            const articlesResponse = await fetch(
              `https://marketing.dwello.in/publishing/articles.json?sub_category=${sub_category_id}&offset=0&limit=5`
            );
            const articlesData = await articlesResponse.json();
            subCategory.articles = articlesData["results"];
            return subCategory;
          })
        );
        return { [category]: subCategoriesWithArticles };
      })
    );

    // Combine all data and return as props
    const groupedCategories = subCategoriesWithArticles.reduce((acc, cur) => {
      const category = Object.keys(cur)[0];
      acc[category] = cur[category];
      return acc;
    }, {});

    return {
      props: {
        groupedCategories,
      },
    };
  } catch (error) {
    console.error(error);
    return { props: {} };
  }
}

const Home = ({ groupedCategories }) => {
  useEffect(() => {
    console.log(groupedCategories);
  }, [groupedCategories]);

  return (
    <Layout>
      <div className={styles.newsHomeWrapper} id="newswrapper">
        <div className={styles.background}>
          <div className={styles.dwelloKbLogo}>
            <Image
              src="https://storage.googleapis.com/dwello_static_assets/images/Dwello%20KB%20Logo.svg"
              width={200}
              height={61}
              alt={"logo"}
            />
          </div>
          <div className={styles.dwelloKbImg}>
            <Image
              width={190}
              height={248}
              src="https://storage.googleapis.com/dwello_static_assets/images/kb-redirector.png"
              alt={"illustration"}
              priority
            />
          </div>
        </div>

        <div className={`${styles.newsHomeContainer} ${styles.containerFluid}`}>
          <div className={styles.newsHeadInitial}>
            <div className={styles.searcher}>
              <div className={styles.headerUnfixed}>
                <div className={`${styles.wrapper} ${styles.containerFluid}`}>
                  {/*<div className={styles.leftPart}></div>*/}
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
            </div>
          </div>
          {groupedCategories &&
            Object.keys(groupedCategories).map((category, index) => (
              <div key={category + "-" + index} className={styles.categories}>
                <div className={styles.categoryText}>{category}</div>
                {groupedCategories[category].map((subcategory, i) => (
                  <div
                    key={
                      category + "-" + subcategory.sub_category_name + "-" + i
                    }
                    className={styles.subCategories}
                  >
                    <div className={styles.backBlock}></div>
                    <div className={styles.subCategory}>
                      {subcategory.sub_category_name}
                    </div>
                    {/*<div (click)="gotoNextPage('/news/category',subcats.category,subcats.sub_category_id)" class="show-more">SHOW*/}
                    {/*MORE</div>*/}
                    <div className={styles.showMore}>SHOW MORE</div>
                    <div className={styles.parent}>
                      <ArticleList articles={subcategory.articles} />
                    </div>
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
