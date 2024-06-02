import React from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  return (
    <div className="fixed bottom-4 right-6 flex items-center justify-center gap-4 py-4 lg:bottom-10 lg:right-32 lg:justify-end xl:right-44">
      <Button
        variant="secondary"
        className="rounded-full py-2"
        size="sm"
        onClick={handlePrevious}
        disabled={currentPage == 1}
      >
        <ArrowLeft />
      </Button>

      <p className="text-sm">
        Page <span className="font-bold">{currentPage}</span> of{' '}
        <span className="font-bold">{totalPages}</span>
      </p>

      <Button
        variant="secondary"
        className="rounded-full py-2"
        size="sm"
        onClick={handleNext}
        disabled={currentPage == totalPages}
      >
        <ArrowRight />
      </Button>
    </div>
  )
}

export default Pagination
