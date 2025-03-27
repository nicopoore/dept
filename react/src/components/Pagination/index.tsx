import { useMemo, Dispatch, SetStateAction } from 'react'
import { ReactComponent as ChevronLeftIcon } from 'assets/images/chevron-left.svg'
import './index.scss'

interface PaginationProps {
  itemsCount: number
  value: number
  onChange: Dispatch<SetStateAction<number>>
  itemsPerPage?: number
}

export const CARDS_PER_PAGE: number = 12

export const Pagination = ({
  itemsCount,
  value,
  onChange,
  itemsPerPage = CARDS_PER_PAGE,
}: PaginationProps) => {
  const totalPages = Math.ceil(itemsCount / itemsPerPage)

  const renderPages = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from(Array(totalPages).keys()).map((_, i) => (
        <div key={i} onClick={() => onChange(i + 1)} className={i + 1 === value ? 'active' : ''}>
          {i + 1}
        </div>
      ))
    }

    const pages = [
      <div key={0} onClick={() => onChange(1)} className={1 === value ? 'active' : ''}>
        1
      </div>,
    ]

    let startPage = Math.max(2, value - 1)
    let endPage = Math.min(value + 1, totalPages - 1)

    if (startPage > 2) {
      pages.push(
        <div key="ellipsis-start" className="ellipsis">
          ...
        </div>
      )
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <div key={i} onClick={() => onChange(i)} className={i === value ? 'active' : ''}>
          {i}
        </div>
      )
    }

    if (endPage < totalPages - 1) {
      pages.push(
        <div key="ellipsis-end" className="ellipsis">
          ...
        </div>
      )
    }

    pages.push(
      <div
        key={totalPages}
        onClick={() => onChange(totalPages)}
        className={totalPages === value ? 'active' : ''}
      >
        {totalPages}
      </div>
    )

    return pages
  }, [totalPages, value, onChange])

  return !!itemsCount ? (
    <div className="pagination">
      <ChevronLeftIcon
        className={`chevron-left ${value === 1 ? 'disabled' : ''}`}
        onClick={() => value > 1 && onChange(value - 1)}
      />
      {renderPages}
      <ChevronLeftIcon
        className={`chevron-right ${value === totalPages ? 'disabled' : ''}`}
        onClick={() => value < totalPages && onChange(value + 1)}
      />
    </div>
  ) : null
}
