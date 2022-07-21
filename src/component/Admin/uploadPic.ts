import axios from 'axios'

export const uploadFile = async (file:any) => {
  const CLOUDINARY_NAME = 'truongnqph14659'
  const CLOUDINARY_API = `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`
  const CLOUDINARY_PRESET = 'tvgpmy7n'

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', CLOUDINARY_PRESET)
  return axios({
    method: 'post',
    url: CLOUDINARY_API,
    data: formData,
  })
}
