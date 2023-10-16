import React from 'react'
import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';


function Header() {
  return (
    <Sheet
    sx={{
      width: 300,
      mx: 'auto', // margin left & right
      my: 4, // margin top & bottom
      py: 3, // padding top & bottom
      px: 2, // padding left & right
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      borderRadius: 'sm',
      boxShadow: 'md',
    }}
  >
    Welcome!
  </Sheet>
  )
}

export default Header