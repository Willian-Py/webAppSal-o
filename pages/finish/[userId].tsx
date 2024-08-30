import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import foto1 from '../../public/foto2.png'
import { useRouter } from 'next/router'
import { UnfoldLessRounded } from '@mui/icons-material'
import { Box } from '@mui/material'



interface IUser {
  success: boolean
  data: {
    id: string;
    name: string;
    authorId: string;
    messsage: string
  }
}

export default function index() {

  const router = useRouter()
  const userid = router.query.userid

  const [userData, setUserData] = useState<IUser | null>();
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(false);

  

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
         <h2>{userid}</h2>
    </Box>
    </>
  )
}
