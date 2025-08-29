
import { StyledEngineProvider } from "@mui/material/styles";
import { CssBaseline, ThemeProvider } from "@mui/material";

import AppRouter from "./routes/AppRouter";

import "./App.css";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      
        <CssBaseline />
        <AppRouter />
      
    </StyledEngineProvider>
  );
}

export default App;

