import router, { NextRouter, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Pagination } from "./Pagination";
import { Results } from "./Results";
import queryString from "query-string";
import { Filters } from "./Filters";
import search from "src/pages/api/search";

type filtersProps = {
  minPrice: number;
};
type handleSearchProps = {
  hasGardens: boolean;
  hasParking: boolean;
  minPrice: number;
  maxPrice: number;
};

export const PropertySearch = () => {
  const [galleries, setGalleries] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const pageSize = 3;
  // joinのエラーが回避できないので、やむを得ずanyでオーバーライド
  const router: NextRouter | any = useRouter();

  const search = async () => {
    const { page, minPrice, maxPrice, hasParking, hasGardens } =
      queryString.parse(window.location.search);

    let mip = 0;
    if (minPrice) {
      mip = +minPrice;
    }
    let map = 0;
    if (maxPrice) {
      map = +maxPrice;
    }
    let pageCast = 0;
    if (page) {
      pageCast = +page;
    }

    const filters = {
      minPrice: 0,
      maxPrice: 0,
      hasParking: true,
      hasGardens: true,
    };
    if (minPrice) {
      filters.minPrice = mip;
    }
    if (maxPrice) {
      filters.maxPrice = map;
    }
    if (hasParking === "true") {
      filters.hasParking = true;
    }
    if (hasGardens === "true") {
      filters.hasGardens = true;
    }

    const response = await fetch(`/api/search`, {
      method: "POST",
      body: JSON.stringify({
        page: pageCast || 1,
        ...filters,
      }),
    });

    const data = await response.json();
    console.log("SEARCH DATA: ", data);
    setGalleries(data.galleries);
    setTotalResults(data.total);
  };

  const handlePageClick = async (pageNumber: number) => {
    const { hasGardens, hasParking, minPrice, maxPrice } = queryString.parse(
      window.location.search
    );

    await router.push(
      `${router.query.slug?.join(
        "/"
      )}??page=1&hasGardens=${!!hasGardens}&hasParking=${!!hasParking}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
      null,
      {
        shallow: true,
      }
    );
    search();
  };

  // まずここでsearch関数を実行する
  useEffect(() => {
    search();
  }, []);

  const handleSearch = async ({
    hasGardens,
    hasParking,
    minPrice,
    maxPrice,
  }: handleSearchProps) => {
    // update our browser url
    // search
    console.log("FILTERS: ", hasGardens, hasParking, minPrice, maxPrice);
    await router.push(
      `${router.query.slug.join(
        "/"
      )}?page=1&hasGardens=${!!hasGardens}&hasParking=${!!hasParking}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
      null,
      {
        shallow: true,
      }
    );
    search();
  };

  return (
    <div>
      <div className="mt-3 text-lg font-bold animate-tracking-in-expand-fwd">
        検索情報一覧はこちらです
      </div>
      <Filters onSearch={handleSearch} />
      <Results galleries={galleries} />
      <Pagination
        onPageClick={handlePageClick}
        totalPages={Math.ceil(totalResults / pageSize)}
      />
    </div>
  );
};
