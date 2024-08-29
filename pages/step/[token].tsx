'use client'
import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import * as _ from 'lodash'
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import corte_cabelo from '../../public/corte_cabelo.png'
import cabelo_barba from '../../public/cabelo_barba.png'
import barba from '../../public/barba.png'
import navalha from '../../public/navalha.png'
import Image from 'next/image'
import moment, { months } from 'moment';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import { LoadingButton } from '@mui/lab';
import Modal from '@mui/material/Modal';
import DoneAllIcon from '@mui/icons-material/DoneAll';


// Define the user interface
interface IUser {
  success: boolean;
  data: {
    id: string;
    name: string;
    authorId: string;
    message: string;
  };
}

// Define the type for the step components map
type StepComponents = {
  [key: number]: React.ComponentType<any>;
};

// Props for FirstComponent
interface FirstComponentProps {
  dateCSS: number;
  handleColor: (value: number, date: string) => void;
  dateArray: DateObject[]
}

interface DateObject {
  day: number
  date: string
  dayName: string
  dayNumber: number
  month: string
}

// First component for selecting a date
const FirstComponent: React.FC<FirstComponentProps> = ({ dateCSS, handleColor }) => {

  function getNextThursFriSat() {
    // Definindo a data atual explicitamente como sexta-feira, 19 de julho de 2024
    //const today = moment('2024-07-17');
    const today = moment();
    const daysOfWeek = [4, 5, 6]; // 4: Thursday, 5: Friday, 6: Saturday
    const nextDays = [];

    // Array de nomes dos dias da semana em português
    const dayNames = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta', 'Sexta', 'Sábado'];

    // Adiciona dias até o final da semana (sábado)
    for (let i = 1; i <= 6 - today.day(); i++) {
      const nextDay = today.clone().add(i, 'days');
      const dayIndex = nextDay.day();

      if (daysOfWeek.includes(dayIndex)) {
        nextDays.push({
          day: dayIndex,
          date: nextDay.format('YYYY-MM-DD'),
          dayName: dayNames[dayIndex],
          dayNumber: +nextDay.format('DD'),
          month: nextDay.format('MMM').toUpperCase(),
        });
      }
    }
    setData(nextDays);
  }

  const [data, setData] = useState<DateObject[]>([]);


  useEffect(() => {
    getNextThursFriSat()

  }, [])

  return (
    <Box sx={{ flexDirection: 'row', gap: 0.3, display: 'flex' }} justifyContent={'space-evenly'} py={3}>
      {data.map((date) => (
        <Box key={date.day} sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
          <Stack>{date.dayName}</Stack>
          <Paper
            sx={{
              border: '1px solid #000',
              justifyContent: 'center',
              alignItems: 'center',
              width: '10vh',
              marginTop: 1,
              borderRadius: 2,
              display: 'flex',
              flexDirection: 'column',
              padding: '0.5rem 0',
              backgroundColor: dateCSS === date.day ? '#9f5746' : '#fff',
              color: dateCSS === date.day ? '#fff' : '#000',
            }}
            onClick={() => handleColor(date.day, date.date)}
            elevation={2}
          >
            <Stack fontSize={22}>{date.dayNumber}</Stack>
            <Stack fontSize={16}>{date.month}</Stack>
          </Paper>
        </Box>
      ))}
    </Box>
  );
};

// Props for SecondComponent
interface DataItem {
  id: string;
  value: string;
}

interface SecondComponentProps {
  handleServiceSelection: (value: string) => void;
  handleServiceIdSelection: (value: string) => void;
  serviceColor: string
}

const SecondComponent: React.FC<SecondComponentProps> = ({ handleServiceSelection, handleServiceIdSelection, serviceColor }) => {
  const [data, setData] = useState<DataItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const response = await fetch('https://salaoapi.onrender.com/servico/todos');
      const result = await response.json();
      const formattedData = result.map((item: any) => ({
        id: item._id,
        value: item.title,
      }));
      setData(formattedData);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true)
    fetchData()
  }, []);

  return (
    <>
      {
        isLoading ?
          <Stack alignItems={'center'} justifyContent={'center'} display={'flex'} p={8}>
            <CircularProgress sx={{ color: '#9f5746' }} />
          </Stack>
          :
          <Box sx={{ width: '100%' }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} my={3}>
              {data.map((i: DataItem) => (
                <Grid item xs={6} key={i.id}>
                  <Paper
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      padding: '1rem 1rem',
                      textAlign: 'center',
                      backgroundColor: serviceColor === i.id ? '#9f5746' : 'transparent',
                      height: '4rem',
                      paddingX: '0.2rem',
                      paddingY: '0.2rem',
                    }}
                    onClick={() => [handleServiceIdSelection(i.id), handleServiceSelection(i.value)]}
                    elevation={2}
                  >
                    {
                      i.value === "Corte Cabelo" ? (
                        <Image src={corte_cabelo} alt={'corte_cabelo'} width={30} height={30} />
                      ) : i.value === "Barba" ? (
                        <Image src={barba} alt={'barba'} width={30} height={30} />
                      ) : i.value === "Sombrancelha" ? (
                        <Image src={navalha} alt={'navalha'} width={30} height={30} />
                      ) : (
                        <Image src={cabelo_barba} alt={'cabelo_barba'} width={30} height={30} />
                      )
                    }
                    <Typography fontSize={12}>{i.value}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
      }
    </>

  );
};

interface ThirdComponentProps {
  handleSelectHour: (value: string) => void;
  selectHour: string;
  dateApi: string;
  authorId: string
}

// Third component for selecting a time
const ThirdComponent: React.FC<ThirdComponentProps> = ({ selectHour, handleSelectHour, dateApi, authorId }) => {

  const [hours, setHours] = useState<string[]>([])
  const [marcado, setMarcados] = useState<string[]>([])
  const [reserva, setReserva] = useState<string[]>([])
  const [isLoading, setIsloading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
 
  const getOcupados = (date: string) => {
    console.log("authorId", `${authorId}`)
    setIsloading(true)
    setMessage('Buscando horários livres.......')

    const apiUrl = "https://salaoapi.onrender.com";

    fetch(`${apiUrl}/merge/horarios/ocupados`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "servicoId": "65105c30be495deea2647fbc",
        "authorId": `${authorId}`,
        "data": `${date}`
      })
    }).then(res => {

      return res.json()
    }).then(res => {
      console.log(res)
      if (res && res[0]) {
        setReserva(res[0].reservas || []);
        setMarcados(res[0].marcado || []);
        setHours(res[0].total || []);
        setTimeout(() => {
          setTimeout(() => {
            setMessage('Separando os horários para você.......')
            setTimeout(() => {
              setIsloading(false)
            }, 600)
          }, 600)
        }, 600)
      } else {
        setIsloading(false)
        console.error('Resposta da API não contém dados esperados.');
      }
    }).
      catch(err => {
        setIsloading(false)
        console.log(err)
      })
  }


  useEffect(() => {
    getOcupados(dateApi)
  }, [dateApi])

  const horariosLivres = hours.filter(hour => !marcado.includes(hour) && !reserva.includes(hour));

  return (
    <Box sx={{ width: '100%' }}>
      {
        isLoading ?
          <Stack alignItems={'center'} justifyContent={'center'} display={'flex'} p={8} flexDirection={'column'}>
            <CircularProgress sx={{ color: '#9f5746', marginBottom: 3 }} />
            <Typography>{message}</Typography>
          </Stack>
          :
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} my={3} columns={3}>
            {hours.map((i, index) => (
              <Grid item xs={1} key={index}>
                <Paper
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    padding: '1rem 1rem',
                    textAlign: 'center',
                    paddingX: '1rem',
                    paddingY: '0.4rem',
                    backgroundColor: selectHour === i ? '#9f5746' : (horariosLivres.includes(i) ? '#fff' : '#a9a9a9'),
                    color: !horariosLivres.includes(i) || !horariosLivres.includes(i) || selectHour === i ? '#fff' : '#000',
                  }}
                  onClick={() => {
                    if (horariosLivres.includes(i)) {
                      handleSelectHour(i);
                    }
                  }}
                  elevation={2}
                >
                  <Typography fontSize={13}>{i}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
      }
    </Box>
  );
};

export default function index() {

  const router = useRouter();
  const { token } = router.query;

  const [userData, setUserData] = useState<IUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState(false);

  const [activeStep, setActiveStep] = useState(0);
  const [step, setStep] = useState(0);
  const [dateCSS, setDateCSS] = useState<number>(0);
  const [dateFormat, setDateFormat] = useState<string>('');
  const [serviceId, setServiceId] = useState<string>('');
  const [serviceSelect, setServiceSelect] = useState<string>('')
  const [selectHour, setSelectHour] = useState<string>('');
  const [isLoading, setIsloading] = useState<boolean>(false)
  const [openModal, setOpenModal] =useState<boolean>(true)

  console.log(userData)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setStep((step) => step + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setStep((step) => step - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setStep(0);
    setDateCSS(0);
    setDateFormat('');
    setSelectHour("")
  };

  const handleColor = (value: number, date: string) => {
    setDateCSS(value);
    setDateFormat(date)
  };

  const handleServiceId = (value: string) => {
    setServiceId(value);
  };

  const handleServiceSelection = (value: string) => {
    setServiceSelect(value);
  };

  const handleSelectHour = (value: string) => {
    setSelectHour(value)
  };


  const handleConsole = () => {

    let dataDoCorte = moment(dateFormat).format('DD/MM/YYYY')
    let dataDoCorteDate = moment(dateFormat).format('YYYY-MM-DD')

    console.log(
      {
        //"clientId": `${clienteId}`,
        "clientId": "65d94185f40c7d5c096290ee",
        //"authorId": `${authorId}`,
        "authorId": "6510831fbf17b844b1e4c555",
        "servicoId": `${serviceId}`,
        "dataDoCorte": `${dataDoCorte}`,
        "dataDoCorteDate": `${dataDoCorteDate}T${selectHour}:00.866Z`,
        "horaDoCorte": `${selectHour}`
      }
    )

    console.log(step, activeStep)
  }

  const componentsMap: StepComponents = {
    0: FirstComponent,
    1: SecondComponent,
    2: ThirdComponent
  };

  const CurrentComponent = componentsMap[step];

  const steps = [
    { label: 'Escolha uma Data', component: 'FirstComponent' },
    { label: 'Escolha um serviço', component: 'SecondComponent' },
    { label: 'Escolha seu Horário', component: 'ThirdComponent' }
  ];





  useEffect(() => {
    const verifyToken = async () => {
      setStatus(false);
      try {
        if (!token) {
          throw new Error('Token não fornecido');
        }

        const response = await fetch('http://192.168.1.4:8000/jwt/verify/', {
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

        //console.log(data)

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

  // "servicoId":"64fa3ec12b34f1bb0a49a842",
  // "dataDoCorte":"17/02/2024",
  // "dataDoCorteDate": "2024-02-17T10:00:00.866Z",
  // "horaDoCorte":"10:00"
  const submitForm = () => {

    let dataDoCorte = moment(dateFormat).format('DD/MM/YYYY')
    let dataDoCorteDate = moment(dateFormat).format('YYYY-MM-DD')

    // const apiUrl = "https://salaoapi.onrender.com";

    
    const apiUrl = "http://192.168.1.4:8000";

    fetch(`${apiUrl}/agendamento/web`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        //"clientId": `${clienteId}`,
        "clientId": `${userData?.data.id}`,
        "authorId": `${userData?.data.authorId}`,
        "servicoId": `${serviceId}`,
        "dataDoCorte": `${dataDoCorte}`,
        "dataDoCorteDate": `${dataDoCorteDate}T${selectHour}:00.866Z`,
        "horaDoCorte": `${selectHour}`
      })
    }).then(res => {
      return res.json()
    }).then(res => {
      if (res.success === true) {
          router.push(`/success/${userData?.data.id}`)
          setOpenModal(true)
      } else {
        router.push(`/error`)
        console.log(res)
      }
    }).catch(err => {
      console.log(err)
    })

  }


  const handleClose = () => setOpenModal(false);

  return (
    <>
    <Modal
  open={openModal}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
  sx={{
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex'
  }}
  // closeAfterTransition
  // disableBackdropClick
  // disableEscapeKeyDown
  disableEscapeKeyDown
  hideBackdrop
>
  <Box
    sx={{
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      backgroundColor: 'rgba(0, 0, 0, 0.43)',
      width: '100%',
      height: '100%',
      border: '2px solid #808080',
      position: 'relative'
    }}
    >
       <Box  sx={{
      // position: 'absolute' as 'absolute',
      // top: '40%',
      // left: '40%',
      // transform: 'translate(-50%, -50%)',
      bgcolor: 'background.paper',
      border: '2px solid #808080',
      boxShadow: 24,
      p: 3,
      m: 3

  }}
  >

    <Stack width={'100%'} justifyItems={'center'} alignItems={'center'}>
      <DoneAllIcon color='success' sx={{fontSize: 80}}/>
    </Stack>
    <Stack textAlign={'center'} width={'100%'} py={1}>
    <Typography id="modal-modal-description" sx={{ mt: 2, fontSize: 16 }}>
      Seu horário foi reservado com Sucesso !!
    </Typography>
    </Stack>
    <Box sx={{ width: '100%'}}>
    <Button
    variant="outlined"
    onClick={() =>  router.push(`/finish/${userData?.data.name}`)}
    sx={{borderColor: '#9f5746', marginTop: 3, color: '#9f5746', width: '100%'}}
    >Sair</Button>
    </Box>
  </Box>

  </Box>
</Modal>
      <Box textAlign={'center'} fontSize={30} fontWeight={'700'} py={8} sx={{ backgroundColor: '#9f5746', borderRadius: '0 0 2rem 2rem' }} mb={5}>
        Agendamento
      </Box>
      <Box sx={{ maxWidth: 400 }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}
              sx={{
                '& .MuiStepLabel-root .Mui-active': {
                  color: '#9f5746', // circle color (ACTIVE)
                },
                '& .MuiStepLabel-root .Mui-completed': {
                  color: '#9f5746', // circle color (COMPLETED)
                },
              }}
            >
              <StepLabel
                // optional={
                //   index === 2 ? (
                //     <Typography variant="caption">Quase Terminando !</Typography>
                //   ) : null
                // }
                sx={{
                  color: '#000'
                }}
              >
                {step.label}
              </StepLabel>
              <StepContent>
                {CurrentComponent && (
                  <CurrentComponent
                    dateCSS={dateCSS}
                    handleColor={handleColor}
                    handleServiceIdSelection={handleServiceId}
                    serviceColor={serviceId}
                    handleServiceSelection={handleServiceSelection}
                    handleSelectHour={handleSelectHour}
                    authorId={userData?.data.authorId}
                    selectHour={selectHour}
                    dateApi={moment(dateFormat).format('YYYY-MM-DD')}
                  />
                )}
                <Box sx={{ mb: 2 }}>
                  <div style={{ justifyContent: 'space-evenly', display: 'flex', width: '80%' }}>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 2, backgroundColor: '#9f5746' }}
                      disabled={index === 0 && dateCSS === 0}
                    >
                      {index === steps.length - 1 ? 'Finalizar' : 'Próximo'}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      variant='outlined'
                      sx={{ mt: 1, mr: 1, color: index === 0 ? '#cecece' : '#9f5746', borderColor: index === 0 ? '' : '#9f5746' }}
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
         {activeStep === steps.length && ( 
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Stack>
              <Typography mb={3}>Confira suas opções:</Typography>
              <Stack flexDirection={'row'} gap={1}><ArrowForwardIosOutlinedIcon fontSize='small'/>Data: {moment(dateFormat).format('DD/MM/YYYY')}</Stack>
              <Stack flexDirection={'row'} gap={1}><ArrowForwardIosOutlinedIcon fontSize='small'/>Serviço: {`${serviceSelect}`}</Stack>
              <Stack flexDirection={'row'} gap={1}><ArrowForwardIosOutlinedIcon fontSize='small'/>Hora: {`${selectHour}`}</Stack>
            </Stack>
            <Box>
              {
                dateCSS === 0 || serviceId === "" || selectHour === '' ?
                    <Stack my={3} color={'red'} fontSize={15}>Ainda Falta preencher alguns campos !!</Stack>
                  : false
              }
            </Box>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1, color: '#9f5746', borderColor: '#9f5746' }}>
              Resetar
            </Button>
            <LoadingButton
              variant="contained"
              onClick={submitForm}
              sx={{ mt: 3, mr: 2, backgroundColor: '#9f5746' }}
              disabled={
                dateCSS === 0 || serviceId === "" || selectHour === '' ? true : false
              }
              loading={isLoading}
            >
              Finalizar
            </LoadingButton>
          </Paper>
         )} 
      </Box>
      </>
  )
}




// sx={{
//   '& .MuiStepLabel-root .Mui-completed': {
//     color: 'secondary.dark', // circle color (COMPLETED)
//   },
//   '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel':
//     {
//       color: 'grey.500', // Just text label (COMPLETED)
//     },
//   '& .MuiStepLabel-root .Mui-active': {
//     color: 'secondary.main', // circle color (ACTIVE)
//   },
//   '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel':
//     {
//       color: 'common.white', // Just text label (ACTIVE)
//     },
//   '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
//     fill: 'black', // circle's number (ACTIVE)
//   },
// }}>