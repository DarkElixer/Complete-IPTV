import { useInfiniteScrolling } from "../../hooks/useInfiniteScrolling";
import { getOrignalNmae, replaceSpecialChars } from "../../util/helper";
import { getAllCategoriesChannel } from "../../services/apiIptv";
import { useParams } from "react-router-dom";
import { GridBox } from "../../ui/GridBox";
import { Heading } from "../../ui/Heading";
import { Footer } from "../../ui/Footer";
import { Box } from "../../ui/Box";
import { Fragment } from "react";

import MiniLoader from "../../ui/MiniLoader";
import Loader from "../../ui/Loader";

function VodCategoriesItem() {
  const { categoryId } = useParams();
  const categoryIdFromURL = categoryId.split("-").pop();
  const { ref, data, isFetchingNextPage, status, hasNextPage } =
    useInfiniteScrolling("vod", categoryIdFromURL, getAllCategoriesChannel);
  return (
    <>
      <div className="heading--secondary">
        <Heading as="h2" $type="secondary">
          {getOrignalNmae(categoryId)}
        </Heading>
      </div>
      {status !== "pending" && status !== "error" ? (
        <GridBox>
          {data.pages.map((group, i) => (
            <Fragment key={i}>
              {group.data.map((series) => (
                <Box
                  key={series.id}
                  to={
                    series.is_series === "0"
                      ? `/movie/play/${replaceSpecialChars(series.name)}-${
                          series.id
                        }`
                      : `/series/${replaceSpecialChars(series.name)}-${
                          series.screenshots
                        }-${series.id}`
                  }
                >
                  <img
                    src={
                      series.screenshot_uri
                        ? `https://jiotv.be${series.screenshot_uri}`
                        : "https://cdn.pixabay.com/photo/2020/11/23/06/21/television-5768804_640.png"
                    }
                    alt={series.name}
                    loading="lazy"
                  />
                  <p className="title">{series.name}</p>
                </Box>
              ))}
            </Fragment>
          ))}
          {hasNextPage ? (
            <Footer>
              <div ref={ref}>{isFetchingNextPage && <MiniLoader />}</div>
            </Footer>
          ) : null}
        </GridBox>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default VodCategoriesItem;
