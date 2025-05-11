import { useInfiniteScrolling } from "../../hooks/useInfiniteScrolling";
import { getLiveCmdURL, replaceSpecialChars } from "../../util/helper";
import { getAllCategoriesChannel } from "../../services/apiIptv";
import { useParams } from "react-router-dom";
import { Heading } from "../../ui/Heading";
import { GridBox } from "../../ui/GridBox";
import { Footer } from "../../ui/Footer";
import { Box } from "../../ui/Box";
import { Fragment } from "react";

import MiniLoader from "../../ui/MiniLoader";
import Loader from "../../ui/Loader";

function LiveChannels() {
  const { categoryId } = useParams();
  const categoryIdFromURL = categoryId.split("-").pop();
  const { ref, data, isFetchingNextPage, status } = useInfiniteScrolling(
    "live",
    categoryIdFromURL,
    getAllCategoriesChannel
  );
  const categoryName =
    categoryId.slice(0, categoryId.lastIndexOf("-")).toUpperCase() +
    " LIVE CHANNELS";
  return (
    <>
      <div className="heading--secondary">
        <Heading as="h2" $type="secondary">
          {categoryName}
        </Heading>
      </div>
      {status !== "pending" && status !== "error" ? (
        <GridBox>
          {data.pages.map((group, i) => (
            <Fragment key={i}>
              {group.data.map((series) => (
                <Box
                  key={series.id}
                  to={`/live/play/${replaceSpecialChars(
                    series.name
                  )}-${getLiveCmdURL(series.cmd)}`}
                >
                  <img
                    src={`https://jiotv.be/stalker_portal/misc/logos/320/${series.id}.png`}
                    alt={series.name}
                    loading="lazy"
                  />
                  <p className="title">{series.name}</p>
                </Box>
              ))}
            </Fragment>
          ))}
          <Footer>
            <div ref={ref}>{isFetchingNextPage && <MiniLoader />}</div>
          </Footer>
        </GridBox>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default LiveChannels;
