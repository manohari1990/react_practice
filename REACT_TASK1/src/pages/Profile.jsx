import { useContext, useEffect, useRef, useState } from "react"
import { uploadUserProfile } from "../services/userService"
import { useAuth } from "../hooks/useAuth"
import { HOST_URL, USER_STORAGE_KEY } from "../utils/Constants"
import ModalUI from "../components/ui/ModalUI"

function Profile() {
    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const fileUploadRef = useRef(null)
    const {user, updateUser} = useAuth()
    let userInformation = user ? JSON.parse(user) : {}
    
    const handleUploadButton = () => {
        if(fileUploadRef.current)
            fileUploadRef.current.click()
    }

    const handleFileChange = async(event) =>{
        setIsLoading(true)
        const fileObj = event.target.files && event.target.files[0]
        if(!fileObj){
            alert("Something went wrong. Try again!")
            return
        }
        const formData = new FormData();
        formData.append('profile_image',fileObj)
        try{
            const response = await uploadUserProfile(formData)
            if(response.success){
                updateUser(response.data)
                userInformation = response.data
                localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(response.data))
                alert("Image uploaded successfully!")
            }
        }catch(err){
            throw err
        }finally{
            setIsLoading(false)
        }
    }
    const editProfile = () =>{
        setIsOpen(true)
    }
    

    return (
        <>
            <div
                className="p-4 sm:p-6 w-full rounded-lg mx-auto mt-6 overflow-hidden dark:bg-neutral-800 dark:border-neutral-700">
                <div className="flex justify-around">
                    <div className="text-center mt-4">
                        <div className="edit-profile max-w-max relative text-center mx-auto">
                            <img src={userInformation ? `${HOST_URL}/${userInformation.profile_image}` : "https://readymadeui.com/team-1.webp"} className="w-24 h-24 rounded-full" alt="profile image"  />
                            <input
                                type="file"
                                ref={fileUploadRef}
                                onChange={handleFileChange}
                                style={{ display: 'none' }} // Keeps the input invisible
                                accept="image/*" //restrict to specific file types
                            />
                            <button 
                                className="absolute top-0 left-0 h-full w-full text-white opacity-0 hover:opacity-100 hover:bg-black/50 rounded-full" 
                                onClick={handleUploadButton}
                            >Edit</button>
                        </div>
                        <ul className="flex flex-wrap gap-6 mt-8">
                            <li>
                                <a href="#"
                                    className="flex items-center bg-slate-100 w-8 h-8 p-2 rounded-full hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:bg-neutral-700 dark:hover:bg-neutral-600"
                                    aria-label="Facebook">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="size-full fill-slate-600 dark:fill-slate-50"
                                        viewBox="0 0 155.139 155.139" aria-hidden="true">
                                        <path
                                            d="M89.584 155.139V84.378h23.742l3.562-27.585H89.584V39.184c0-7.984 2.208-13.425 13.67-13.425l14.595-.006V1.08C115.325.752 106.661 0 96.577 0 75.52 0 61.104 12.853 61.104 36.452v20.341H37.29v27.585h23.814v70.761z"
                                            data-original="#010002" />
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a href="#"
                                    className="flex items-center bg-slate-100 w-8 h-8 p-2 rounded-full hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:bg-neutral-700 dark:hover:bg-neutral-600"
                                    aria-label="LinkedIn">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="size-full fill-slate-600 dark:fill-slate-50"
                                        viewBox="0 0 24 24" aria-hidden="true">
                                        <path
                                            d="M23.994 24v-.001H24v-8.802c0-4.306-.927-7.623-5.961-7.623-2.42 0-4.044 1.328-4.707 2.587h-.07V7.976H8.489v16.023h4.97v-7.934c0-2.089.396-4.109 2.983-4.109 2.549 0 2.587 2.384 2.587 4.243V24zM.396 7.977h4.976V24H.396zM2.882 0C1.291 0 0 1.291 0 2.882s1.291 2.909 2.882 2.909 2.882-1.318 2.882-2.909A2.884 2.884 0 0 0 2.882 0"
                                            data-original="#000000" />
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a href="#"
                                    className="flex items-center bg-slate-100 w-8 h-8 p-2 rounded-full hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:bg-neutral-700 dark:hover:bg-neutral-600"
                                    aria-label="X">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="size-full fill-slate-600 dark:fill-slate-50"
                                        viewBox="0 0 1226.37 1226.37" aria-hidden="true">
                                        <path
                                            d="M727.348 519.284 1174.075 0h-105.86L680.322 450.887 370.513 0H13.185l468.492 681.821L13.185 1226.37h105.866l409.625-476.152 327.181 476.152h357.328L727.322 519.284zM582.35 687.828l-47.468-67.894-377.686-540.24H319.8l304.797 435.991 47.468 67.894 396.2 566.721H905.661L582.35 687.854z"
                                            data-original="#000000" />
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a href="#"
                                    className="flex items-center bg-slate-100 w-8 h-8 p-2 rounded-full hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:bg-neutral-700 dark:hover:bg-neutral-600"
                                    aria-label="Github">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="size-full fill-slate-600 dark:fill-slate-50"
                                        viewBox="0 0 438.549 438.549" aria-hidden="true">
                                        <path
                                            d="M409.132 114.573q-29.41-50.392-79.798-79.8C295.736 15.166 259.057 5.365 219.271 5.365c-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8Q0 164.966 0 224.63c0 47.78 13.94 90.745 41.827 128.906q41.827 57.245 108.063 79.227c5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562q0-.855-.144-15.417a2550 2550 0 0 1-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999q-10.28-1.848-19.13-8.559c-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559q-6.139-7.995-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429q-1.712-1.996-2.568-3.997-.86-2.002 1.427-3.289c1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851q8.42 5.71 13.846 14.842c4.38 7.806 9.657 13.754 15.846 17.847q9.277 6.138 18.699 6.136 9.42-.001 16.274-1.423 6.848-1.43 12.847-4.285 2.57-19.135 13.988-29.41c-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979q-5.852-18.56-5.852-42.826c0-23.035 7.52-42.637 22.557-58.817q-10.566-25.977 1.997-58.24c5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994s9.089 5.618 12.135 7.708q26.556-7.42 54.818-7.421c28.262-.001 37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979q-9.286 11.282-23.131 18.986c-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146q14.841 12.845 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995q66.244-21.98 108.068-79.226c27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049"
                                            data-original="#000000" />
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="flex w-[80%]">
                        <div className="text-left mt-4 w-[90%]">
                            <h3 className="text-slate-900 text-base font-semibold dark:text-slate-50">John Doe</h3>
                            <span className="mt-1 block text-xs text-slate-500 dark:text-slate-400">Marketing Coordinator</span>
                        </div>
                        <div>
                            <button onClick={editProfile}>Edit</button>
                        </div>
                    </div>
                    <ModalUI isOpen={isOpen} setIsOpen={setIsOpen}>
                        <div>
                            this is test
                        </div>
                    </ModalUI>
                </div>
            </div>

            {/* <div
                className="bg-white p-4 sm:p-6 border border-slate-200 shadow-sm w-full max-w-xs rounded-lg mx-auto mt-6 overflow-hidden dark:bg-neutral-800 dark:border-neutral-700">
                <div className="flex flex-col items-center">
                    <img src="https://readymadeui.com/team-1.webp" className="w-24 h-24 rounded-full" alt="profile image" />
                    <div className="text-center mt-4">
                        <h3 className="text-slate-900 text-base font-semibold dark:text-slate-50">John Doe</h3>
                        <span className="mt-1 block text-xs text-slate-500 dark:text-slate-400">Marketing Coordinator</span>
                    </div>

                    <ul className="flex flex-wrap gap-6 mt-8">
                        <li>
                            <a href="#"
                                className="flex items-center bg-slate-100 w-8 h-8 p-2 rounded-full hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:bg-neutral-700 dark:hover:bg-neutral-600"
                                aria-label="Facebook">
                                <svg xmlns="http://www.w3.org/2000/svg" className="size-full fill-slate-600 dark:fill-slate-50"
                                    viewBox="0 0 155.139 155.139" aria-hidden="true">
                                    <path
                                        d="M89.584 155.139V84.378h23.742l3.562-27.585H89.584V39.184c0-7.984 2.208-13.425 13.67-13.425l14.595-.006V1.08C115.325.752 106.661 0 96.577 0 75.52 0 61.104 12.853 61.104 36.452v20.341H37.29v27.585h23.814v70.761z"
                                        data-original="#010002" />
                                </svg>
                            </a>
                        </li>
                        <li>
                            <a href="#"
                                className="flex items-center bg-slate-100 w-8 h-8 p-2 rounded-full hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:bg-neutral-700 dark:hover:bg-neutral-600"
                                aria-label="LinkedIn">
                                <svg xmlns="http://www.w3.org/2000/svg" className="size-full fill-slate-600 dark:fill-slate-50"
                                    viewBox="0 0 24 24" aria-hidden="true">
                                    <path
                                        d="M23.994 24v-.001H24v-8.802c0-4.306-.927-7.623-5.961-7.623-2.42 0-4.044 1.328-4.707 2.587h-.07V7.976H8.489v16.023h4.97v-7.934c0-2.089.396-4.109 2.983-4.109 2.549 0 2.587 2.384 2.587 4.243V24zM.396 7.977h4.976V24H.396zM2.882 0C1.291 0 0 1.291 0 2.882s1.291 2.909 2.882 2.909 2.882-1.318 2.882-2.909A2.884 2.884 0 0 0 2.882 0"
                                        data-original="#000000" />
                                </svg>
                            </a>
                        </li>
                        <li>
                            <a href="#"
                                className="flex items-center bg-slate-100 w-8 h-8 p-2 rounded-full hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:bg-neutral-700 dark:hover:bg-neutral-600"
                                aria-label="X">
                                <svg xmlns="http://www.w3.org/2000/svg" className="size-full fill-slate-600 dark:fill-slate-50"
                                    viewBox="0 0 1226.37 1226.37" aria-hidden="true">
                                    <path
                                        d="M727.348 519.284 1174.075 0h-105.86L680.322 450.887 370.513 0H13.185l468.492 681.821L13.185 1226.37h105.866l409.625-476.152 327.181 476.152h357.328L727.322 519.284zM582.35 687.828l-47.468-67.894-377.686-540.24H319.8l304.797 435.991 47.468 67.894 396.2 566.721H905.661L582.35 687.854z"
                                        data-original="#000000" />
                                </svg>
                            </a>
                        </li>
                        <li>
                            <a href="#"
                                className="flex items-center bg-slate-100 w-8 h-8 p-2 rounded-full hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:bg-neutral-700 dark:hover:bg-neutral-600"
                                aria-label="Github">
                                <svg xmlns="http://www.w3.org/2000/svg" className="size-full fill-slate-600 dark:fill-slate-50"
                                    viewBox="0 0 438.549 438.549" aria-hidden="true">
                                    <path
                                        d="M409.132 114.573q-29.41-50.392-79.798-79.8C295.736 15.166 259.057 5.365 219.271 5.365c-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8Q0 164.966 0 224.63c0 47.78 13.94 90.745 41.827 128.906q41.827 57.245 108.063 79.227c5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562q0-.855-.144-15.417a2550 2550 0 0 1-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999q-10.28-1.848-19.13-8.559c-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559q-6.139-7.995-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429q-1.712-1.996-2.568-3.997-.86-2.002 1.427-3.289c1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851q8.42 5.71 13.846 14.842c4.38 7.806 9.657 13.754 15.846 17.847q9.277 6.138 18.699 6.136 9.42-.001 16.274-1.423 6.848-1.43 12.847-4.285 2.57-19.135 13.988-29.41c-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979q-5.852-18.56-5.852-42.826c0-23.035 7.52-42.637 22.557-58.817q-10.566-25.977 1.997-58.24c5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994s9.089 5.618 12.135 7.708q26.556-7.42 54.818-7.421c28.262-.001 37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979q-9.286 11.282-23.131 18.986c-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146q14.841 12.845 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995q66.244-21.98 108.068-79.226c27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049"
                                        data-original="#000000" />
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>
            </div> */}
        </>
    )

}

export default Profile