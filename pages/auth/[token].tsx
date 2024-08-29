'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios';
import Image from 'next/image'
import foto1 from '../../public/foto2.png'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { redirect } from 'next/navigation';
import * as _ from 'lodash'
import { Box } from '@mui/material';

interface IUser {
  success: boolean
  data: {
    id: string;
    name: string;
    authorId: string;
    messsage: string
  }
}

export default function HomePage() {

  const router = useRouter()
  const token = router.query.token

  const [userData, setUserData] = useState<IUser | null>();
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(false);


  useEffect(() => {
    const verifyToken = async () => {
        setStatus(false);
        try {
            if (!token) {
                throw new Error('Token não fornecido');
            }

            const response = await fetch('https://salaoapi.onrender.com/jwt/verify', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erro na verificação do token');
            }

            const data = await response.json();

            console.log(data)
            
            if (data.success === false) {
                setUserData(null);
                setStatus(true)
                router.push('/unauthorized');
            } else {
                setUserData(data);
                setStatus(true);
            }
        } catch (error: any) {
            setError(error.message);
        }
    };

    verifyToken();
}, [token]);


  return (
    <div className='bg-black'>
      {
        status ? 

        <>
        {
          userData !== null ? 

          <>
    <Image
        src={foto1}
        style={{
          width: '100%'
        }}
        height={400}
        alt="Picture of the author"
      /> 
       <Box width={'100%'} justifyContent={'center'} alignItems={'center'}textAlign={'center'}>
      <h1>Bem Vindo (a),</h1>
      <h2>{userData?.data.name}</h2>
      <Button variant="contained"  sx={{backgroundColor:'#9f5746'}} onClick={() =>  router.push(`/step/${token}`)}>Agendar Agora </Button>
      </Box>
          </>
          :
          <></>
        }
        
        </>
        :
        <><div>Analisando......</div></> 
      }
    </div>
  )
}
