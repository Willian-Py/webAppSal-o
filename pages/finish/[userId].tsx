import React from 'react'
import Image from 'next/image'
import foto1 from '../../public/foto2.png'
import { useRouter } from 'next/router'
import { UnfoldLessRounded } from '@mui/icons-material'
import { Box } from '@mui/material'

export default function index() {

  const router = useRouter()
  const { userId } = router.query

  return (
    <>
    <Image
        src={foto1}
        style={{
          width: '100%'
        }}
        height={360}
        alt="Picture of the author"
      /> 
         <Box width={'100%'} justifyContent={'center'} alignItems={'center'}textAlign={'center'}>
         <h1>Obrigado pela Preferência</h1>
         <h2>Aguardamos você ......</h2>
         <h2>{userId}</h2>
    </Box>
    </>
  )
}
