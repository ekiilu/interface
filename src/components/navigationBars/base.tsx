/* eslint-disable */
// @ts-nocheck
/* eslint-enable */
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from '@chakra-ui/core';
import React, { useState } from 'react';
import { AuthenticatedDropdown } from './authenticatedDropdown';
import { AuthenticationContext } from '@utils/authenticationContext';
import { Link } from '@components/link';
import { MdDehaze } from 'react-icons/md';
import { useIntl } from 'gatsby-plugin-intl';

export const BaseNavigationBar = ({
  links = [] as any[],
  menus = [] as any[],
  sideNavigationDrawer,
}) => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const intl = useIntl();

  const [loginButtonDisabled, disableLoginButton] = useState(false);

  return (
    <>
      <Flex
        position="fixed"
        bg="black"
        color="white"
        height="2em"
        width="full"
        zIndex={4}
        alignItems="center"
      >
        <Text flex="1" textAlign="center">
          Black Lives Matter
        </Text>
      </Flex>
      <Box
        as="header"
        top="2em"
        position="fixed"
        zIndex={4}
        bg="black"
        color="white"
        left="0"
        right="0"
        width="full"
        height="4em"
      >
        <Flex size="100%" px="6" align="center">
          <Box
            mr={5}
            as={Link}
            cursor="pointer"
            display="block"
            to="/"
            aria-label="Neon Law, Back to homepage"
            minWidth="3em"
          >
            <img src="/images/logo.svg" alt="Neon Law" />
          </Box>

          <Flex flexGrow={1} align="center" justify="flex-end">
            {links.map((link, i) => (
              <Box display={['none', 'none', 'flex']} key={i} mr="0.5em">
                <Box as={Link} cursor="pointer" margin="0 10px" to={link.route}>
                  {link.label}
                </Box>
              </Box>
            ))}
            {menus.map((menu, i) => (
              <Box display={['none', 'none', 'flex']} key={i} mr="0.5em">
                <Menu>
                  <MenuButton as={Button} rightIcon="chevron-down">
                    {menu.title}
                  </MenuButton>
                  <MenuList placement="bottom-end">
                    {menu.links.map((link, j) => (
                      <MenuItem key={j} as={Link} to={link.route}>
                        {link.label}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              </Box>
            ))}
            <AuthenticationContext.Consumer>
              {({ isLoading, isAuthenticated, login }) => {
                if (isLoading) {
                  return null;
                }
                if (isAuthenticated) {
                  return <AuthenticatedDropdown />;
                }
                return (
                  <Button
                    bg="transparent"
                    border="1px"
                    display={['none', 'none', 'flex']}
                    disabled={loginButtonDisabled}
                    onClick={() => {
                      disableLoginButton(true);
                      login();
                    }}
                  >
                    {intl.formatMessage({ id: 'auth.login' })}
                  </Button>
                );
              }}
            </AuthenticationContext.Consumer>
            <IconButton
              display={{ md: 'none', sm: 'inline-flex' }}
              aria-label="Navigation Menu"
              fontSize="20px"
              variant="ghost"
              icon={MdDehaze}
              onClick={onToggle}
            />
          </Flex>
        </Flex>
      </Box>
      <Drawer isOpen={isOpen} placement="left" size="xs" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody padding="0">{sideNavigationDrawer}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
