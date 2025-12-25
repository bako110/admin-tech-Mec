const ENV = {
  development: {
    API_URL: 'http://localhost:5000/api',
  },
  production: {
    API_URL: 'https://backen-tech-zz81.onrender.com/api',
  }
}

const currentEnv = 'production'

export const config = ENV[currentEnv]
