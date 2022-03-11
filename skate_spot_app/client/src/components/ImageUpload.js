import React from "react"
import axios from 'axios'
import { Image, Center } from '@chakra-ui/react'

const uploadURL = process.env.REACT_APP_IMAGE_UPLOAD_URL
const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET

export const ImageUploadField = ({ handleImageUrl, value }) => {

    const handleUpload = async event => {
        const data = new FormData()
        data.append('file', event.target.files[0])
        data.append('upload_preset', uploadPreset)

        const res = await axios.post(uploadURL, data)

        handleImageUrl(res.data.url)
    }

    return (
        <>
            {value ?
                <div>
                    <Center>
                        <Image borderRadius={50} maxWidth="30%" src={value} alt="user upload" />
                    </Center>
                </div>
                :
                <>
                    <Center>
                        <input
                            className="input"
                            id="file-input"
                            type="file"
                            onChange={handleUpload}
                            class="hidden"
                        />
                        <label class="file-label" for="file-input">📸</label>
                    </Center>
                </>
            }
        </>
    )
}