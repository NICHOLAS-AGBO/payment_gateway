import {ReactNode} from "react";
import {createTheme, CssBaseline, Stack, ThemeProvider} from "@mui/material";
import {orange} from "@mui/material/colors";

export default function Theme({children}:{children: ReactNode}) {
    const theme = createTheme({
        palette:{
            primary:{
                main: orange["600"],
                dark: orange['800']
            }
        }
    });
    return(

        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Stack minHeight={"100vh"} sx={{bgcolor: "#222222"}}
                   justifyContent={"center"} alignItems={"center"}>
                {children}
            </Stack>
        </ThemeProvider>
    )
}