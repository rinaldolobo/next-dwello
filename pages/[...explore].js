import { useEffect } from "react";
import Header from "@/components/header";
import ProjectCard from "@/components/projectCard";
import styles from "@/styles/explore.module.scss";
import HeaderKb from "@/components/headerKb";
import { useRouter } from "next/router";
import { btoa } from "next/dist/compiled/@edge-runtime/primitives/encoding";

const getExploreData = (uri, filter) => {
  let finalUri = "";
  if (filter) {
    finalUri = "filter=" + atob(filter);
  } else {
    finalUri = "uri=" + uri;
  }
  console.log(finalUri);
  return fetch(
    "https://20230511-2-dot-reporting-dot-dwello-in.uc.r.appspot.com/search/produce?" +
      finalUri
  )
    .then((res) => res.json())
    .then((result) => {
      // console.log(result);
      return result;
    });
};

export const getServerSideProps = async (context) => {
  const { query, resolvedUrl, res } = context;
  // res.setHeader("Cache-Control", "max-age=5400");
  const {
    explore: [, uri = null],
  } = query || {};
  const { filter } = query || {};

  console.log("fetch for " + resolvedUrl + " started:", new Date().getTime());

  const exploreData = await getExploreData(resolvedUrl, filter);

  console.log("fetch for " + resolvedUrl + " ended:", new Date().getTime());

  // console.log(exploreData);

  return {
    props: { exploreData },
  };
};

const ExploreUri = ({ test, exploreData }) => {
  const router = useRouter();
  useEffect(() => {
    console.log(exploreData);
  }, [exploreData]);

  const applyFilter = (searchOn, option) => {
    console.log(searchOn, option);
    let filter = exploreData.filter;
    filter.criteria.push({
      searchOn: searchOn.dimension,
      options: [option.key],
      operator: "=",
    });
    console.log(filter);
    router.push("/projects?filter=" + btoa(JSON.stringify(filter)));
  };

  return (
    <div>
      <HeaderKb headerStyle={"fixed"} />
      <div className={styles.exploreContainer}>
        <div className={styles.exploreMetaContainer}>
          <div className={styles.exploreBreadCrumb}>
            Homes {">"} Properties in Mumbai {">"} Properties in Thane
          </div>
          <div className={styles.exploreTitleWrapper}>
            {exploreData?.structured_title?.parts?.map((part, index) => (
              <div
                className={
                  part["type"] === "text"
                    ? styles.titleFiller
                    : styles.titleConfig
                }
                key={part.part + "-" + index}
              >
                {part["part"]}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.exploreDataContainer}>
          <div className={styles.exploreDataLeft}>
            <div className={styles.exploreFilterSort}>
              <div className={styles.exploreFilters}>
                {exploreData?.filterOptions?.map((option) => (
                  <div
                    className={styles.exploreFilterPill}
                    key={option.dimension}
                  >
                    <div>{option.dimensionDisplayName}</div>
                    {option.options && (
                      <div className={styles.exploreFilterOptions}>
                        <div className={styles.explorePseudoWrapper}>
                          {option?.options?.map((opt) => (
                            <div
                              onClick={() => applyFilter(option, opt)}
                              className={styles.optionPill}
                              key={option.dimension + "-" + opt.key}
                            >
                              <div className={styles.pillName}>{opt.label}</div>
                              <div className={styles.pillCount}>
                                {opt.count} Projects
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className={styles.exploreFilterPill}>Sort</div>
            </div>
            <div className={styles.exploreResults}>
              {exploreData?.results.map((result, index) => (
                <ProjectCard
                  key={result.objectid + "-" + index}
                  project={result}
                  priority={index === 0}
                />
              ))}
            </div>
          </div>
          <div className={styles.exploreDataRight}>
            {exploreData?.insights?.map((insight, index) => (
              <div
                className={styles.exploreInsightWrapper}
                key={insight.readableName + "-" + index}
              >
                <div className={styles.exploreInsightsTitle}>
                  {insight.readableName}
                </div>
                <div className={styles.exploreInsightData}>
                  {insight?.buckets?.map((bucket, index) => (
                    <div key={bucket.key + "-" + index}>
                      {bucket.uri ? (
                        <a
                          href={`${bucket.uri}`}
                          className={styles.insightItemLink}
                        >
                          <div className={styles.insightLbl}>
                            {bucket.label}
                          </div>
                          {/*<div className={styles.insightCount}>{bucket.count}</div>*/}
                        </a>
                      ) : (
                        <div className={styles.insightItem}>
                          <div className={styles.insightLbl}>
                            {bucket.label}
                          </div>
                          {/*<div className={styles.insightCount}>{bucket.count}</div>*/}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreUri;
