type PaginationProps<T> = {
  totalPages: number;
  onPageClick: T;
};

export const Pagination = ({
  totalPages,
  onPageClick,
}: PaginationProps<(num: number) => void>) => {
  console.log(totalPages);
  return (
    <div className="max-w-5xl mx-auto mb-10 flex justify-center gap-2">
      {Array.from({ length: totalPages }).map((_, i) => (
        <div
          key={i}
          className="rounded-[5px] py-4 px-4 btn text-white bg-pink-500 hover:bg-pink-700"
          onClick={() => {
            onPageClick(i + 1);
          }}
        >
          {i + 1}
        </div>
      ))}
    </div>
  );
};
