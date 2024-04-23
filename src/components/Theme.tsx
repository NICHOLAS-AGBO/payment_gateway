import {ReactNode} from "react";
import {createTheme, CssBaseline, Stack, ThemeProvider} from "@mui/material";

export default function Theme({children}:{children: ReactNode}) {
    const theme = createTheme({
        palette:{
            primary:{
                main: '#21adec',
                dark: '#1f97cc'
            }
        }
    });
    return(

        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Stack minHeight={"100vh"} sx={{backgroundColor: "#222222", px: 1.5}}
                   justifyContent={"center"} alignItems={"center"}>
                {children}
            </Stack>
        </ThemeProvider>
    )
}