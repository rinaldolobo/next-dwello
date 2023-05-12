import Image from "next/image";
import styles from "../styles/Home.module.scss";
import utilityStyles from "../styles/utils.module.scss";
import Layout from "@/components/layout";
import { useEffect } from "react";
import HomeArticleList from "@/components/homeArticleList";
import Link from "next/link";
import HeaderKb from "@/components/headerKb";
import { useRouter } from "next/router";

// export async function getServerSideProps() {
//   try {
//     // Call the API to get the categories data
//     const categoriesResponse = await fetch(
//       "https://marketing.dwello.in/publishing/categories.json"
//     );
//     const categoriesData = await categoriesResponse.json();
//
//     // Get articles for each sub category and add them to the respective object
//     const subCategoriesWithArticles = await Promise.all(
//       Object.keys(categoriesData).map(async (category) => {
//         const subCategories = categoriesData[category];
//
//         // Get articles for each sub category and add them to the respective object
//         const subCategoriesWithArticles = await Promise.all(
//           subCategories.map(async (subCategory) => {
//             const { sub_category_id } = subCategory;
//             const articlesResponse = await fetch(
//               `https://marketing.dwello.in/publishing/articles.json?sub_category=${sub_category_id}&offset=0&limit=5`
//             );
//             const articlesData = await articlesResponse.json();
//             subCategory.articles = articlesData["results"];
//             return subCategory;
//           })
//         );
//         return { [category]: subCategoriesWithArticles };
//       })
//     );
//
//     // Combine all data and return as props
//     const groupedCategories = subCategoriesWithArticles.reduce((acc, cur) => {
//       const category = Object.keys(cur)[0];
//       acc[category] = cur[category];
//       return acc;
//     }, {});
//
//     return {
//       props: {
//         groupedCategories,
//       },
//     };
//   } catch (error) {
//     console.error(error);
//     return { props: {} };
//   }
// }

const Home = () => {
  return (
    <Layout>
      <div>Home</div>
      <a href={"news"}>News</a>
      <br />
      <a href={"explore"}>Explore</a>
    </Layout>
  );
};

export default Home;
