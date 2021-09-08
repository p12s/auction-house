import axios from 'axios'; 
import {setUser} from "../reducers/userReducer";
import {config} from '../config';

// TODO здесь теневая регистрация, происходит по важному для нас действию пользователя
// для православной регистрации с логином/паролем нужно добавить форму на фронт и сделать отправку польз. данных
export const registerUser = () => {
  try {
    axios.post(`${config.API_URL}/api/registerUser`) 
    .then((response) => {
      
      if (response.status === 200) {
        setUser(response.data.token)
        localStorage.setItem('token', response.data.token)
        
      } else {
        console.log("возникла ошибка при получении токена нового пользователя")
        alert("возникла ошибка при получении токена нового пользователя")
      }
    })

  } catch (e) {
    alert('Возникла ошибка при получении токена для загрузки картинок')
    console.log(e)
  }
}
 