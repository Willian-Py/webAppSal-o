import React from 'react'
import Image from 'next/image'
import foto1 from '../../public/foto2.png'
import { useRouter } from 'next/router'
import { UnfoldLessRounded } from '@mui/icons-material'
import { Box, Stack } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function Unauthorized() {

  const router = useRouter()
  const { userId } = router.query

  return (
    <>
    <Stack width={'100%'} justifyContent={'center'} alignItems={'center'} p={4}>
    <Image
        src={foto1}
        style={{
          width: 200
        }}
        height={200}
        alt="Picture of the author"
      /> 
    </Stack>
         <Box width={'100%'} justifyContent={'center'} alignItems={'center'}textAlign={'center'} p={4}>
          <ErrorOutlineIcon sx={{ fontSize: 160}} color='warning' />
         <h1 color='red' style={{ fontSize: 26}}>Seu Link expirou  ou já existe um agendamento para seu nome,</h1>
         <h3 color='red'>Favor contatar o seu cabelereiro..</h3>
    </Box>
    </>
  )
}
