import  { Dispatch, SetStateAction } from "react"
import { Button } from "../ui/button"

export interface IPaginationButton {
  currentPage: number
  totalPages: number
  setCurrentPage: Dispatch<SetStateAction<number>>
}

const PaginationButton = ({ setCurrentPage, totalPages, currentPage }: IPaginationButton) => {
  return (
    <>
      <Button
        size="sm"
        variant="outline"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((p) => p - 1)}
      >
        Previous
      </Button>
      <span className="text-sm">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        size="sm"
        variant="outline"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((p) => p + 1)}
      >
        Next
      </Button>
    </>
  )
}

export default PaginationButton
