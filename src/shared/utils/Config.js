import config from 'react-native-config';

function AppConfig() {
  const { BASE_URL, ENV } = config;
  return {
    BASE_URL: BASE_URL || 'https://backendglobal.herokuapp.com',
    Env: ENV || 'production',
  };
}
export default AppConfig;
