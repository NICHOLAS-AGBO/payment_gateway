import {createFileRoute} from '@tanstack/react-router'
import {closePaymentModal, useFlutterwave} from 'flutterwave-react-v3';
import {FlutterwaveConfig, FlutterWaveResponse} from "flutterwave-react-v3/dist/types";
import {BaseSyntheticEvent, FormEvent, useMemo, useState} from "react";
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select, SelectChangeEvent,
  Stack,
  Typography
} from "@mui/material";
import {
  AccountCircleOutlined, ArrowRightAltOutlined,
  EmailOutlined,
  PhoneOutlined
} from "@mui/icons-material";
import cryptoRandomString from "crypto-random-string";
import {Helmet} from "react-helmet";
import fav from "../assets/fav.png";


export const Route = createFileRoute('/')({
  component: Index
});

interface Config extends FlutterwaveConfig{}
interface Data {
  name: string,
  email: string,
  amount: number,
  phone: string,
  currency: string
}

function Index(){
  const ref = cryptoRandomString({length: 10, type: 'url-safe'});
  const [data, setData] = useState<Data>({
    name: '',
    email: '',
    phone: '',
    amount: 0,
    currency: 'USD'
  });
  const CURRENCY = ['AUD','BRL','CAD','CNY','EGP','ETB','EUR','GBP','GHS','INR','JPY','KES','MAD','MUR','MWK','MYR','NGN','RWF','TZS','UGX','USD','XAF','XOF','ZAR','ZMW'];
  const config = useMemo<Config>(()=>({
    public_key: import.meta.env.VITE_FLW_PUBLIC_KEY,
    tx_ref: ref,
    amount: data.amount,
    redirect_url: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    currency: data.currency,
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: data.email,
      phone_number: data.phone,
      name: data.name,
    },
    customizations: {
      title: 'Purchase of Goodies',
      description: 'Payment for items in cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  }),[data.amount, data.currency, data.email, data.name, data.phone, ref]);

  const handleFlutterPayment = useFlutterwave(config);
  const getVal = ({target}:BaseSyntheticEvent|SelectChangeEvent)=>{
    setData(prevState => ({...prevState, [target.name]: target.value}));
    if (target.name === "amount"){
      target.setAttribute("min",'1');
    }
  }

  return(
      <Stack flexDirection={"column"} component={"form"} gap={2}
             mx={"auto"} p={3} maxWidth={400} width={"100%"}
             sx={{backgroundColor: "common.white"}}
             onSubmit={(e:FormEvent<HTMLFormElement>)=>{
               e.preventDefault();
               handleFlutterPayment({
                 callback: (response: FlutterWaveResponse) => {
                   console.log(response);
                   closePaymentModal() // this will close the modal programmatically
                 },
                 onClose: () => {},
               });

             }}
      >
        <Helmet>
          <meta name={"author"} content={"NICHOLAS AGBO"}/>
          <style>{
            `.TanStackRouterDevtools{
            display: none;
            }`
          }
          </style>
        </Helmet>
        <Stack justifyContent={"center"} alignItems={"center"} flexDirection={"column"} my={2}>
          <img src={fav} alt={"shop_on_point_logo"} width={80}/>
          <Typography variant={"h4"} align={"center"} color={"primary"} fontWeight={700}>Flutter Payment</Typography>
          <Typography variant={"h6"} align={"center"}>Enter payment details</Typography>
        </Stack>
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
            endAdornment={
              <FormControl variant="standard" sx={{ mr: -1.5, ml: 1, width: 120 }}>
                <InputLabel id="currency">currency</InputLabel>
                <Select
                    labelId="currency"
                    id="currency"
                    value={data.currency}
                    label="currency"
                    name="currency"
                    onChange={getVal}
                    variant={"filled"}
                    required
                >
                  {CURRENCY.map((val, i)=>(
                      <MenuItem key={i} value={val}>{val}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            }
        />
        <Button type={"submit"} endIcon={<ArrowRightAltOutlined/>} variant={"contained"} sx={{
          backgroundColor: 'primary.main',
          color: 'common.white',
          border: "none",
          p: 2
        }}>Proceed to make payment</Button>
      </Stack>
  );
}