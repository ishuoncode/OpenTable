import {useState} from "react"
import axios from "axios"


export default function useAvailabilities(){

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState<{time: string; available: boolean}[] | null>(null)


    const fetchAvailabilities = async ({slug, partySize, day, time}: {slug: string; partySize: string; day: string; time: string;}) => {
        setLoading(true)
        
        
        try {
            const response = await axios.get(`/api/restaurant/${slug}/availability`, {
                params: {
                    day,
                    time,
                    partySize
                }
            });
            console.log(response)
            setLoading(false)
            setData(response.data)
        } catch (error: any) {
            
            setLoading(false)
            setError(error.message)
        }

    }

    return {loading, data, error, fetchAvailabilities}

}