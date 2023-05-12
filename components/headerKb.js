import styles from "@/styles/headerKb.module.scss";
import utilityStyles from "@/styles/utils.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const HeaderKb = ({ headerStyle }) => {
  const [searchTerm, setSearchTerm] = useState(""); // State variable to store the search input value
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(""); // State variable to store the debounced search term
  const [searchResults, setSearchResults] = useState([]); // State variable to store the fetched search results

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm); // Update the debounced search term after a delay
    }, 500); // Adjust the debounce delay (in milliseconds) as per your requirements

    return () => {
      clearTimeout(delayTimer); // Clear the timeout when the component unmounts or when the search term changes
    };
  }, [searchTerm]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        if (debouncedSearchTerm) {
          const response = await fetch(
            `https://search-dot-dwello-prod.el.r.appspot.com/search/portal/suggestions?query=${debouncedSearchTerm}`
          ); // Fetch search results from the provided API endpoint with the debounced search term
          const data = await response.json(); // Parse the response as JSON
          console.log(data);
          setSearchResults(data.suggestions); // Update the search results with the fetched data
        } else {
          setSearchResults([]); // Clear the search results if the debounced search term is empty
        }
      } catch (error) {
        console.error("Error fetching search results:", error); // Log any errors that occur during the API request
      }
    };

    fetchSearchResults(); // Call the fetchSearchResults function whenever the debounced search term changes
  }, [debouncedSearchTerm]);

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value); // Update the search term as the user types in the input field
  };

  return (
    <div
      className={
        headerStyle === "unfixed" ? styles.headerUnfixed : styles.headerFixed
      }
    >
      <div className={`${styles.wrapper} container-fluid`}>
        {headerStyle === "fixed" && (
          <div className={styles.leftPart}>
            <a href={`/`}>
              <div className={styles.logo}></div>
            </a>
          </div>
        )}

        <div className={styles.rightSearchPart}>
          <div className={styles.search}>
            <input
              className={styles.searchBox}
              type="text"
              placeholder="Enter a term to search"
              value={searchTerm}
              onChange={handleSearchInput}
            />
            <span
              className={`${utilityStyles.dwelloicfont} ${utilityStyles.dwelloicfont_search} ${styles.dwelloicfont}`}
            ></span>
            {searchResults.length > 0 && (
              <div className={styles.searchResults}>
                {searchResults.map((result) => (
                  <a
                    className={styles.searchItem}
                    href={result["uri"]}
                    key={result["uri"]}
                  >
                    {result["name"]}
                  </a>
                ))}
              </div>
            )}
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

export default HeaderKb;
