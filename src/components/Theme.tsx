import {ReactNode} from "react";
import {createTheme, CssBaseline, Stack, ThemeProvider} from "@mui/material";

export default function Theme({children}:{children: ReactNode}) {
    const theme = createTheme({
        palette:{
            primary:{
                main: '#fb830a',
                dark: '#d18a05'
            }
        }
    });
    return(

        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Stack minHeight={"100vh"} sx={{px: 1.5}}
                   justifyContent={"center"} alignItems={"center"}>
                {children}
            </Stack>
        </ThemeProvider>
    )
}