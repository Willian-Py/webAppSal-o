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

            const response = await fetch('http://192.168.1.4:8000/jwt/verify', {
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
        width={300}
        height={300}
        alt="Picture of the author"
      /> 
      <h1>Bem Vindo (a),</h1>
      <h2>{userData?.data.name}</h2>
      <Button variant="contained"  sx={{backgroundColor:'red'}} onClick={() =>  router.push(`/step/${token}`)}>Agendar Agora </Button>
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
