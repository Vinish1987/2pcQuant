import { Button, VStack, Text, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const KiteLogin = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const toast = useToast();

  const handleLogin = () => {
    setIsConnecting(true);
    const apiKey = import.meta.env.VITE_KITE_API_KEY;
    
    // For debugging - remove in production
    console.log('API Key:', apiKey);
    console.log('Current URL:', window.location.origin);
    
    if (!apiKey) {
      toast({
        title: 'Configuration Error',
        description: 'Kite API key is not configured',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setIsConnecting(false);
      return;
    }

    try {
      // Use the current origin for local development or Vercel URL
      const baseUrl = window.location.origin;
      const redirectUrl = `${baseUrl}/kite/callback`;
      
      console.log('Redirect URL:', redirectUrl); // For debugging
      
      const loginUrl = `https://kite.zerodha.com/connect/login?api_key=${apiKey}&redirect_url=${encodeURIComponent(redirectUrl)}`;
      console.log('Login URL:', loginUrl); // For debugging
      
      window.location.href = loginUrl;
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'Connection Error',
        description: 'Failed to connect to Kite. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setIsConnecting(false);
    }
  };

  return (
    <VStack spacing={4} align="stretch" p={4}>
      <Text fontSize="2xl" fontWeight="bold">Connect to Kite</Text>
      <Button
        colorScheme="teal"
        size="lg"
        onClick={handleLogin}
        isLoading={isConnecting}
        loadingText="Connecting..."
      >
        Connect to Zerodha
      </Button>
    </VStack>
  );
};

export default KiteLogin; 