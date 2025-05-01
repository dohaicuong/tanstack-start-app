import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { DatePicker } from '~/components/ui/date-picker'
import { IconButton } from '~/components/ui/icon-button'

export const CalendarDayView = () => (
  <DatePicker.View view="day">
    <DatePicker.Context>
      {(api) => (
        <>
          <CalendarViewControl />
          <DatePicker.Table>
            <DatePicker.TableHead>
              <DatePicker.TableRow>
                {api.weekDays.map((weekDay, id) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey:
                  <DatePicker.TableHeader key={id}>
                    {weekDay.narrow}
                  </DatePicker.TableHeader>
                ))}
              </DatePicker.TableRow>
            </DatePicker.TableHead>
            <DatePicker.TableBody>
              {api.weeks.map((week, id) => (
                // biome-ignore lint/suspicious/noArrayIndexKey:
                <DatePicker.TableRow key={id}>
                  {week.map((day, id) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey:
                    <DatePicker.TableCell key={id} value={day}>
                      <DatePicker.TableCellTrigger asChild>
                        <IconButton variant="ghost">{day.day}</IconButton>
                      </DatePicker.TableCellTrigger>
                    </DatePicker.TableCell>
                  ))}
                </DatePicker.TableRow>
              ))}
            </DatePicker.TableBody>
          </DatePicker.Table>
        </>
      )}
    </DatePicker.Context>
  </DatePicker.View>
)

export const CalendarMonthView = () => (
  <DatePicker.View view="month">
    <DatePicker.Context>
      {(api) => (
        <>
          <CalendarViewControl />
          <DatePicker.Table>
            <DatePicker.TableBody>
              {api
                .getMonthsGrid({ columns: 4, format: 'short' })
                .map((months, id) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey:
                  <DatePicker.TableRow key={id}>
                    {months.map((month, id) => (
                      // biome-ignore lint/suspicious/noArrayIndexKey:
                      <DatePicker.TableCell key={id} value={month.value}>
                        <DatePicker.TableCellTrigger asChild>
                          <Button variant="ghost">{month.label}</Button>
                        </DatePicker.TableCellTrigger>
                      </DatePicker.TableCell>
                    ))}
                  </DatePicker.TableRow>
                ))}
            </DatePicker.TableBody>
          </DatePicker.Table>
        </>
      )}
    </DatePicker.Context>
  </DatePicker.View>
)

export const CalendarYearView = () => (
  <DatePicker.View view="year">
    <DatePicker.Context>
      {(api) => (
        <>
          <CalendarViewControl />
          <DatePicker.Table>
            <DatePicker.TableBody>
              {api.getYearsGrid({ columns: 4 }).map((years, id) => (
                // biome-ignore lint/suspicious/noArrayIndexKey:
                <DatePicker.TableRow key={id}>
                  {years.map((year, id) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey:
                    <DatePicker.TableCell key={id} value={year.value}>
                      <DatePicker.TableCellTrigger asChild>
                        <Button variant="ghost">{year.label}</Button>
                      </DatePicker.TableCellTrigger>
                    </DatePicker.TableCell>
                  ))}
                </DatePicker.TableRow>
              ))}
            </DatePicker.TableBody>
          </DatePicker.Table>
        </>
      )}
    </DatePicker.Context>
  </DatePicker.View>
)

const CalendarViewControl = () => (
  <DatePicker.ViewControl>
    <DatePicker.PrevTrigger asChild>
      <IconButton variant="ghost" size="sm">
        <ChevronLeftIcon />
      </IconButton>
    </DatePicker.PrevTrigger>

    <DatePicker.ViewTrigger asChild>
      <Button variant="ghost" size="sm">
        <DatePicker.RangeText />
      </Button>
    </DatePicker.ViewTrigger>

    <DatePicker.NextTrigger asChild>
      <IconButton variant="ghost" size="sm">
        <ChevronRightIcon />
      </IconButton>
    </DatePicker.NextTrigger>
  </DatePicker.ViewControl>
)
