import { Input } from "src/components/Input";
import { useEffect, useState } from "react";
import queryString from "query-string";

export const Filters = ({ onSearch }: any) => {
  const [hasGardens, setGardens] = useState(false);
  const [hasParking, setHasParking] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // onSearchでわたってくるPropertySearch側のhandleSearch関数に入力値を渡してやる
  const handleSearch = () => {
    onSearch({
      hasGardens,
      hasParking,
      minPrice,
      maxPrice,
    });
  };

  useEffect(() => {
    const {
      hasGardens: hasGardensInitial,
      hasParking: hasParkingInitial,
      minPrice: minPriceInitial,
      maxPrice: maxPriceInitial,
    } = queryString.parse(window.location.search);

    let mip = "";
    if (typeof minPriceInitial === "string") {
      mip = minPriceInitial;
    }

    let map = "";
    if (typeof maxPriceInitial === "string") {
      map = maxPriceInitial;
    }

    setGardens(hasGardensInitial === "true");
    setHasParking(hasParkingInitial === "true");
    setMinPrice(mip);
    setMaxPrice(map);
  }, []);

  return (
    <div className="max-w-5xl mx-auto my-5 flex gap-5 border-solid border-slate-400 border-2 p-5 rounded-md">
      <div className="flex-1">
        <div>
          <label className="cursor-pointer">
            <input
              type="checkbox"
              checked={hasParking}
              // 否定演算子。setHasParking(!hasParking)でよいと思う。
              onChange={() => setHasParking((value) => !value)}
            />
            <span className="pl-2">has parking</span>
          </label>
        </div>
        <div>
          <label className="cursor-pointer">
            <input
              type="checkbox"
              checked={hasGardens}
              onChange={() => setGardens((value) => !value)}
            />
            <span className="pl-2">has gardens</span>
          </label>
        </div>
      </div>
      <div className="flex-1">
        <span>Min price</span>
        <Input
          type="number"
          value={minPrice}
          onChange={(e: any) => setMinPrice(e.target.value)}
        />
      </div>
      <div className="flex-1">
        <span>Max price</span>
        <Input
          type="number"
          value={maxPrice}
          onChange={(e: any) => setMaxPrice(e.target.value)}
        />
      </div>
      <div className="flex justify-center items-center">
        <div className="btn rounded-[5px] py-2 px-2 btn text-white bg-pink-500 hover:bg-pink-700" onClick={handleSearch}>
          Search
        </div>
      </div>
    </div>
  );
};
