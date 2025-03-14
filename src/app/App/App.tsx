import { MobileLayout } from '../../layouts/MobileLayout';
import { DesktopLayout } from '../../layouts/DesktopLayout/DesktopLayout';
import { useGame } from '../../game/hooks/useGame';

function App() {

  const { mediaQuery } = useGame();

  return(
    mediaQuery.matches ? <MobileLayout/> : <DesktopLayout/>
  )
}

export default App
