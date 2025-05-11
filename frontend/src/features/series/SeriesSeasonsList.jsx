import { useInfiniteSeriesScrolling } from "./useInfiniteSeriesScrolling";
import { getOrignalNmae, preLen } from "../../util/helper";
import { getSeriesOrMovie } from "../../services/apiVod";
import { useParams } from "react-router-dom";
import { Heading } from "../../ui/Heading";
import { GridBox } from "../../ui/GridBox";
import { Footer } from "../../ui/Footer";
import { Box } from "../../ui/Box";
import { Fragment } from "react";

import MiniLoader from "../../ui/MiniLoader";
import Loader from "../../ui/Loader";

function SeriesSeasonsList() {
  const { seriesName } = useParams();
  const seriesArray = seriesName.split("-");
  const seriesIdFromURL = seriesArray[seriesArray.length - 1];
  const screenshotsId = seriesArray[seriesArray.length - 2];
  seriesArray.pop();
  const seriesNameAfter = seriesArray.join("-");
  const { ref, data, isFetchingNextPage, status, hasNextPage } =
    useInfiniteSeriesScrolling(
      "series",
      { movieId: seriesIdFromURL },
      getSeriesOrMovie
    );
  return (
    <>
      <div className="heading--secondary">
        <Heading as="h2" $type="secondary">
          {getOrignalNmae(seriesNameAfter)}
        </Heading>
      </div>
      {status !== "pending" && status !== "error" ? (
        <GridBox>
          {data.pages.map((group, i) => (
            <Fragment key={i}>
              {group.data.map((series) => (
                <Box
                  key={series.id}
                  to={`season-${series.season_number}-${series.id}`}
                >
                  <img
                    src={`https://jiotv.be/stalker_portal/screenshots/${preLen(
                      screenshotsId
                    )}`}
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

export default SeriesSeasonsList;
