import {
  Avatar,
  Box,
  Circle,
  Container,
  Flex,
  Float,
  Icon,
  IconButton,
  Input,
  InputGroup,
  Menu,
  Portal,
  Text,
} from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { BsHandbag } from "react-icons/bs";
import { GoHome } from "react-icons/go";
import { GiLipstick } from "react-icons/gi";
import { MdFaceRetouchingNatural, MdKeyboardArrowDown } from "react-icons/md";
import { TbEyeSpark } from "react-icons/tb";
import {
  NavbarLogoContainer,
  NavbarLogoSecondaryText,
  NavbarLogoText,
} from "./components/ui/NavbarLogo";
import { NavbarLink, NavLinkRouter } from "./components/ui/NavbarLinks";
import { PublicRoutes } from "@/types/routes";
import { useDrawer } from "@/hooks/useDrawer";
import { DrawerContentType } from "@/context/ModalContext/drawerContext";

function Navbar() {
  const { showDrawer } = useDrawer();
  return (
    <>
      <Flex justify='center' bg='primary' p={2}>
        <Text fontSize='sm' color='white' fontWeight={500}>
          Oferta de ejemplo | Envios a todo el pais | Minimo para envios: 10.000
        </Text>
      </Flex>
      <Container h={70} display='flex' alignItems='center' justifyContent='space-between'>
        <Flex alignItems='center'>
          <NavbarLogoContainer>
            <NavbarLogoText>
              Flair
              <NavbarLogoSecondaryText>Moon</NavbarLogoSecondaryText>
            </NavbarLogoText>
          </NavbarLogoContainer>
          <Flex gap={2} marginStart={14} alignItems='center'>
            <NavLinkRouter to={PublicRoutes.HOME} size='sm' variant='ghost'>
              <GoHome /> Inicio
            </NavLinkRouter>
            <Menu.Root>
              <Menu.Trigger asChild>
                <NavbarLink size='sm' variant='ghost'>
                  Productos
                  <MdKeyboardArrowDown />
                </NavbarLink>
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item value='open-file' color='primary'>
                      Ver Todos
                    </Menu.Item>
                    <Menu.Item value='new-txt'>
                      <Icon size='sm' color='primary'>
                        <GiLipstick />
                      </Icon>
                      Labios
                    </Menu.Item>
                    <Menu.Item value='new-file'>
                      <Icon size='sm' color='primary'>
                        <MdFaceRetouchingNatural />
                      </Icon>
                      Rostro
                    </Menu.Item>
                    <Menu.Item value='new-win'>
                      <Icon size='sm' color='primary'>
                        <TbEyeSpark />
                      </Icon>
                      Ojos
                    </Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
            <NavLinkRouter to={PublicRoutes.BUYING_GUIDE} size='sm' variant='ghost'>
              ¿Como Comprar?
            </NavLinkRouter>
            <NavLinkRouter to={PublicRoutes.CONTACT} size='sm' variant='ghost'>
              Contacto
            </NavLinkRouter>
          </Flex>
        </Flex>
        <Flex gap={6} alignItems='center'>
          <InputGroup flex='1' startElement={<LuSearch />}>
            <Input
              bg='bgPrimary'
              border={0}
              outline={0}
              variant='subtle'
              placeholder='¿Que buscas?'
            />
          </InputGroup>
          <Avatar.Root variant='solid' bg='secondary'>
            <Avatar.Fallback />
            <Avatar.Image src='https://bit.ly/broken-link' />
          </Avatar.Root>
          <Box position='relative'>
            <Float>
              <Circle size='5' bg='primary' color='white' fontSize={13}>
                3
              </Circle>
            </Float>
            <IconButton
              onClick={() => showDrawer(DrawerContentType.CART)}
              size='xs'
              variant='plain'
              asChild>
              <Icon color='primary'>
                <BsHandbag />
              </Icon>
            </IconButton>
          </Box>
        </Flex>
      </Container>
    </>
  );
}

export default Navbar;
