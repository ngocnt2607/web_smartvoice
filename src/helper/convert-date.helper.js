import dayjs from "dayjs"

export const convertDateByFormat = (currentDate, format) => {
  const date = dayjs(currentDate)

  return date.isValid() ? date.format(format) : ''
}
