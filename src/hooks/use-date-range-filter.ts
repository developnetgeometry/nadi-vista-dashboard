import { useState, useMemo } from "react"
import { DateRange } from "@/components/DateRangePicker"

export function useDateRangeFilter<T extends Record<string, any>>(
  data: T[],
  dateField: keyof T
) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>()

  const filteredData = useMemo(() => {
    if (!dateRange?.from || !data) return data

    return data.filter(item => {
      const itemDate = new Date(item[dateField])
      
      if (!dateRange.from) return true
      if (dateRange.from && !dateRange.to) {
        // Single date selected
        return itemDate.toDateString() === dateRange.from.toDateString()
      }
      if (dateRange.from && dateRange.to) {
        // Date range selected
        return itemDate >= dateRange.from && itemDate <= dateRange.to
      }
      return true
    })
  }, [data, dateRange, dateField])

  return {
    dateRange,
    setDateRange,
    filteredData
  }
}