import axios from 'axios';
import {config} from '../config';

// Получим все активные ставки по лоту
export const getBids = () => {
  return async dispatch => {
    try {
      const token = localStorage.getItem('token')

      if (token !== null) {
        const response = await axios.get(`${config.API_URL}/api/v1/getBids`, {
          headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })

        if (response.status === 200 && response.data && response.data.length > 0) {
          // dispatch(showCreateButton())
          // dispatch(changeImageSize({
          //   imageWidth: response.data[0].width,
          //   imageHeight: response.data[0].height,
          // }))
          // dispatch(showDimensions())
          //dispatch(setBids(response.data))
        }
      }

    } catch (e) {
      console.log('возникла ошибка при запросе ставок на лот, недействительный токен либо проблема с сервером')
      console.log(e)
    }
  }
}

// Повысить ставку на лот (проверки на баланс и прочее - на бекенде)
export const takeBid = () => {
  return async => {
    try {
      console.log('take a bid action')

      const token = localStorage.getItem('token')

      if (token !== null) {
        const response = axios.get(`${config.API_URL}/api/v1/takeBid`, {
          headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        
        if (response.status === 200 && response.data && response.data.length > 0) {
          // dispatch(showCreateButton())
          // dispatch(changeImageSize({
          //   imageWidth: response.data[0].width,
          //   imageHeight: response.data[0].height,
          // }))
          // dispatch(showDimensions())
          //dispatch(setBids(response.data))
        }
      }

    } catch (e) {
      console.log('возникла ошибка при создании ставки на лот, недействительный токен либо проблема с сервером')
      console.log(e)
    }
  }
}
