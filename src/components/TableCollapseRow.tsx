import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined'
import { Box, Collapse, IconButton, TableCell, TableRow } from '@mui/material'
import { ReactNode, useState } from 'react'

import { TABLE_OVERVIEW_CELL_HEIGHT } from '@/const'
import { useI18n } from '@/locales/client'

const arrowIconStyleProps = {
  'aria-hidden': true,
  sx: {
    width: 20,
    height: 20,
    ml: 1,
  },
}

export default function TableCollapseRow({
  heading,
  children,
}: {
  heading: string
  children: ReactNode
}) {
  const [isOpened, setIsOpened] = useState(false)

  const t = useI18n()

  const handleToggle = () => {
    setIsOpened(!isOpened)
  }

  return (
    <>
      <TableRow>
        <TableCell
          variant='head'
          sx={{
            width: { xs: 200, sm: 300 },
            minWidth: { xs: 200, sm: 'auto' },
            p: 0,
            height: TABLE_OVERVIEW_CELL_HEIGHT,
          }}
          colSpan={2}
        >
          <IconButton
            aria-label={
              isOpened ? t('table-collapse-row.hide-lbl') : t('table-collapse-row.show-lbl')
            }
            size='small'
            onClick={handleToggle}
            sx={{
              p: 2,
              color: 'inherit',
              height: TABLE_OVERVIEW_CELL_HEIGHT,
              fontSize: 14,
              lineHeight: 1.42,
              fontWeight: 400,
              justifyContent: 'flex-start',
              minWidth: '100%',
            }}
          >
            {heading}
            {isOpened ? (
              <ArrowDropUpOutlinedIcon {...arrowIconStyleProps} />
            ) : (
              <ArrowDropDownIcon {...arrowIconStyleProps} />
            )}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          sx={{
            pb: 0,
            pt: 0,
          }}
          colSpan={2}
        >
          <Collapse in={isOpened} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>{children}</Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}
