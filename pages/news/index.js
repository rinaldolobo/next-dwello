import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "@/components/layout";
import styles from "@/styles/Home.module.scss";
import Image from "next/image";
import utilityStyles from "@/styles/utils.module.scss";
import HeaderKb from "@/components/headerKb";
import HomeArticleList from "@/components/homeArticleList";

export async function getServerSideProps(context) {
  const { query, resolvedUrl, res } = context;
  try {
    res.setHeader("Cache-Control", "max-age=5400");
    console.log("fetch for " + resolvedUrl + " started:", new Date().getTime());
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

    console.log("fetch for " + resolvedUrl + " ended:", new Date().getTime());

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

const News = ({ groupedCategories }) => {
  const router = useRouter();

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

        <div
          className={`${styles.newsHomeContainer} ${utilityStyles.containerFluid}`}
        >
          <div className={styles.newsHeadInitial}>
            <div className={styles.searcher}>
              <HeaderKb headerStyle={"unfixed"} />
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
                    <a
                      href={`/news/category/${subcategory.category}/${subcategory.sub_category_id}`}
                    >
                      <div className={styles.showMore}>SHOW MORE</div>
                    </a>
                    <div className={styles.parent}>
                      <HomeArticleList articles={subcategory.articles} />
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

export default News;
