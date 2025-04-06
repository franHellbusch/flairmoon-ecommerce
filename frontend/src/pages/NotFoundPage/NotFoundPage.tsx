import { PublicRoutes } from "@/types/routes";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import NotFoundImage from "../../assets/NotFoundImage.png";

const NotFoundPage: React.FC = () => {
  const [count, setCount] = useState(20);
  const navigate = useNavigate();

  // Simulates a countdown
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Flex bg='bgTertiary' gap='5' direction='column' align='center' justify='center' minH='100vh'>
      <Image maxW='500px' src={NotFoundImage} alt='Not Found Image' />
      <Heading size='3xl' color='textPrimary' as='h2'>
        Página no encontrada.
      </Heading>
      <Text color='textSecondary'>Serás redirigido a la página principal en {count} segundos.</Text>
      <Button
        bg='primary'
        color='white'
        variant='solid'
        onClick={() => navigate(`${PublicRoutes.HOME}`)}>
        Volver a la página principal
      </Button>
      {count === 0 && <Navigate to={`${PublicRoutes.HOME}`} replace />}
    </Flex>
  );
};

export default NotFoundPage;
