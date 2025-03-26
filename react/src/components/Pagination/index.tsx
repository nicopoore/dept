import { useMemo, Dispatch, SetStateAction } from "react";
import { ReactComponent as ChevronLeftIcon } from "assets/images/chevron-left.svg";
import "./index.scss";

interface PaginationProps {
  itemsCount: number;
  value: number;
  onChange: Dispatch<SetStateAction<number>>;
}

export const CARDS_PER_PAGE: number = 10;

export const Pagination = ({
  itemsCount,
  value,
  onChange
}: PaginationProps) => {
  const renderPages = useMemo(
    () =>
      Array.from(Array(Math.ceil(itemsCount / CARDS_PER_PAGE)).keys()).map(
        (_, i) => (
          <div
            key={i}
            onClick={() => onChange(i + 1)}
            className={i + 1 === value ? "active" : ""}
          >
            {i + 1}
          </div>
        )
      ),
    [itemsCount, value, onChange]
  );

  return !!itemsCount ? (
    <div className="pagination">
      <ChevronLeftIcon
        className={`chevron-left ${value === 1 ? "disabled" : ""}`}
        onClick={() => value > 1 && onChange(value - 1)}
      />
      {renderPages}
      <ChevronLeftIcon
        className={`chevron-right ${value === Math.ceil(itemsCount / CARDS_PER_PAGE) ? "disabled" : ""
          }`}
        onClick={() => value < Math.ceil(itemsCount / CARDS_PER_PAGE) && onChange(value + 1)}
      />
    </div>
  ) : null;
};
