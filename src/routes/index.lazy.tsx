import {createFileRoute} from '@tanstack/react-router'
import {closePaymentModal, useFlutterwave} from 'flutterwave-react-v3';
import {FlutterwaveConfig, FlutterWaveResponse} from "flutterwave-react-v3/dist/types";
import {BaseSyntheticEvent, useMemo, useState} from "react";
import {Button, IconButton, OutlinedInput, Stack, Typography} from "@mui/material";
import {
  AccountCircleOutlined, ArrowRightAltOutlined,
  CurrencyExchangeOutlined,
  EmailOutlined,
  PhoneOutlined
} from "@mui/icons-material";
import cryptoRandomString from "crypto-random-string";

export const Route = createFileRoute('/')({
  component: Index
})
interface Config extends FlutterwaveConfig{}
interface Data {
  name: string,
  email: string,
  amount: number,
  phone: string
}

function Index(){
  const ref = cryptoRandomString({length: 20, type: 'url-safe'});
  const [data, setData] = useState<Data>({
    name: '',
    email: '',
    phone: '',
    amount: 0
  });
  const config = useMemo<Config>(()=>({
    public_key: import.meta.env.FLW_PUBLIC_KEY,
    tx_ref: ref,
    amount: data.amount,
    redirect_url: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    currency: "NGN",
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: data.email,
      phone_number: data.phone,
      name: data.name,
    },
    customizations: {
      title: 'my Payment Title',
      description: 'Payment for items in cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  }),[data, ref]);

  const handleFlutterPayment = useFlutterwave(config);

  const getVal = ({target}:BaseSyntheticEvent)=>{
    setData(prevState => ({...prevState, [target.name]: target.value}));
    if (target.name === "amount"){
      target.setAttribute("min",'0');
    }
  }
  return(
      <Stack flexDirection={"column"} gap={3}
             mx={"auto"} p={3} maxWidth={400} width={"100%"}
             sx={{bgcolor: "common.white"}}
      >
        <Typography variant={"h6"} align={"center"}>Enter payment details</Typography>
         <OutlinedInput
             id={"name"}
             type={"text"}
             value={data.name}
             name={"name"}
             onInput={getVal}
             inputMode={"text"}
             required
             fullWidth
             placeholder={"Enter full name. e.g. John Doe"}
             endAdornment={<IconButton><AccountCircleOutlined sx={{color: "primary.main"}}/></IconButton>}
         />
         <OutlinedInput
             id={"email"}
             type={"email"}
             value={data.email}
             name={"email"}
             onInput={getVal}
             inputMode={"email"}
             required
             fullWidth
             placeholder={"name@email.com"}
             endAdornment={<IconButton><EmailOutlined sx={{color: "primary.main"}}/></IconButton>}
         />
         <OutlinedInput
             id={"phone"}
             type={"tel"}
             value={data.phone}
             name={"phone"}
             onInput={getVal}
             inputMode={"tel"}
             required
             fullWidth
             placeholder={"(+44)-4556-667"}
             endAdornment={<IconButton><PhoneOutlined sx={{color: "primary.main"}}/></IconButton>}
         />
          <OutlinedInput
            id={"amount"}
            type={"number"}
            value={data.amount}
            name={"amount"}
            onInput={getVal}
            inputMode={"numeric"}
            required
            fullWidth
            placeholder={"0.00"}
            endAdornment={<IconButton><CurrencyExchangeOutlined sx={{color: "primary.main"}}/></IconButton>}
        />
        <Button onClick={() => {
          handleFlutterPayment({
            callback: (response: FlutterWaveResponse) => {
              console.log(response);
              closePaymentModal() // this will close the modal programmatically
            },
            onClose: () => {},
          });
        }} endIcon={<ArrowRightAltOutlined/>} variant={"contained"} sx={{
          backgroundColor: 'primary.main',
          color: 'common.white',
          border: "none",
          p: 2
        }}>Proceed to make payment</Button>
      </Stack>
  );
}