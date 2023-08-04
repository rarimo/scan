import { Stack, useTheme } from '@mui/material'

export const HeaderMenuList = () => {
  const theme = useTheme()
  return (
    <Stack
      flexDirection='row'
      justifyContent='space-between'
      alignItems='start'
      sx={{
        width: '100%',
        ml: theme.spacing(3),
        display: { xs: 'none', md: 'flex' },
      }}
    >
      {/*<Select*/}
      {/*  sx={{*/}
      {/*    '.MuiOutlinedInput-notchedOutline': { border: 0 },*/}
      {/*    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {*/}
      {/*      borderColor: 'transparent',*/}
      {/*      borderWidth: 0,*/}
      {/*    },*/}
      {/*    minWidth: 140,*/}
      {/*  }}*/}
      {/*  open={open}*/}
      {/*  onMouseEnter={handleOpen}*/}
      {/*  onClose={handleClose}*/}
      {/*  MenuProps={{*/}
      {/*    PaperProps: {*/}
      {/*      onMouseLeave: handleClose,*/}
      {/*    },*/}
      {/*  }}*/}
      {/*  displayEmpty={true}*/}
      {/*  renderValue={() => <>{t('header-page-dropdown.blockchain')}</>}*/}
      {/*>*/}
      {/*  {menuItemList.map((page, idx) => (*/}
      {/*    <MenuItem*/}
      {/*      component={page.href ? 'a' : NavLink}*/}
      {/*      {...(page.href*/}
      {/*        ? { href: page.href, target: '_blank', rel: 'noopener' }*/}
      {/*        : { to: page.path })}*/}
      {/*      sx={{*/}
      {/*        '&.Mui-focusVisible ': {*/}
      {/*          backgroundColor: 'transparent',*/}
      {/*        },*/}
      {/*        '&.Mui-selected': {*/}
      {/*          backgroundColor: 'transparent',*/}
      {/*        },*/}
      {/*        color: theme.palette.secondary.light,*/}
      {/*        '&.active': {*/}
      {/*          color: theme.palette.text.primary,*/}
      {/*        },*/}
      {/*        '&:hover': {*/}
      {/*          color: theme.palette.primary.main,*/}
      {/*        },*/}
      {/*      }}*/}
      {/*      key={idx}*/}
      {/*      aria-label={page.name}*/}
      {/*      onClick={handleClose}*/}
      {/*    >*/}
      {/*      {page.name}*/}
      {/*    </MenuItem>*/}
      {/*  ))}*/}
      {/*</Select>*/}
    </Stack>
  )
}
